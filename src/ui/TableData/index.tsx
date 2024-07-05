import {
  ActionIcon,
  Box,
  Flex,
  Pagination,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { DataSort } from "./DataSort";
import { DataFilter } from "./DataFilter";
import React, { useEffect, useState } from "react";
import {
  CDataFilterProps,
  IKeyValue,
  IOrderBy,
  CTableDataColumn,
  CTableDataProps,
} from "./types";
import { SkeletonRow } from "./SkeletonRow";
import { IconDots, IconEye } from "@tabler/icons-react";
import { CPopoverOptions } from "../CPopoverOptions";
import { CItem } from "../CItem";
import { useUniqueOptions } from "../../hooks/useUniqueOptions";
import { IOption } from "../CForm/types";

const renderValue = (item: IKeyValue, fieldName?: string) => {
  return (
    <Text fw={400} fz={14}>
      {fieldName ? item[fieldName] : ""}
    </Text>
  );
};

export const TableData = ({
  columns,
  data,
  searchTerm,
  paginationSize,
  getFilterValue,
  onRowClick,
  tableProps,
  flagSelectedRow,
  selectedRow,
  labelProps,
  loading,
  noRecordText,
  dataCount,
  enablePageJump,
  enableColumnVisibility,
  onPaginationChange,
  defaultOrderBy,
}: CTableDataProps) => {
  const [selectedFilter, setSelectedFilter] = useState<any>({});
  const [page, setPage] = useState(1);
  const [skeletonCount, setSkeletonCount] = useState(5);
  const [orderBy, setOrderBy] = useState<IOrderBy>(
    defaultOrderBy || { column: columns[0], direction: "asc" }
  );
  const unique = useUniqueOptions({ data });
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [selectedColumns, setSelectedColumns] = useState<CTableDataColumn[]>(
    columns.filter((col) => !col.hidden)
  );

  useEffect(() => {
    setSelectedIndex(selectedRow);
  }, [selectedRow]);

  const getFilterProps = (filter: CDataFilterProps, fieldName: string) => {
    if (filter) {
      const { valueField, labelField, ...rest } = filter;
      if (!rest.options) {
        if (rest.getValue && rest.getLabel) {
          rest.options = unique.getUniqueOptionsByMethod(
            rest.getValue,
            rest.getLabel
          );
        } else {
          rest.options = unique.getUniqueOptions(
            valueField,
            labelField,
            getFilterValue
          );
        }
      }
      rest.onChange = (options) => handleOnFilterChange(fieldName, options);
      if (rest.selectedOptions && !selectedFilter[fieldName]) {
        handleOnFilterChange(fieldName, rest.selectedOptions);
      }
      return rest;
    }
    return null;
  };

  const handleOnFilterChange = (filterName: string, options: any) => {
    setPage(1);
    setSelectedFilter({ ...selectedFilter, [filterName]: options });
  };

  const handleOnSortChange = (column: CTableDataColumn, direction: string) => {
    setOrderBy({ column, direction });
  };

  const sortStringMethod = (a: any, b: any): number => {
    if (!orderBy) return 0;
    const { column, direction } = orderBy;
    if (column.fieldName && !column.getValue)
      return (
        a[column.fieldName].localeCompare(b[column.fieldName]) *
        (direction === "asc" ? 1 : -1)
      );
    if (column.getValue)
      return (
        column.getValue(a).localeCompare(column.getValue(b)) *
        (direction === "asc" ? 1 : -1)
      );
    return 0;
  };

  const sortNumberMethod = (a: any, b: any): number => {
    if (!orderBy) return 0;
    const { column, direction } = orderBy;
    let aValue = column.fieldName ? a[column.fieldName] : "";
    let bValue = column.fieldName ? b[column.fieldName] : "";
    if (column.getValue) {
      aValue = column.getValue(a);
      bValue = column.getValue(b);
    }

    if (direction === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  };

  const getContentPaddingLeft = (column: CTableDataColumn) => {
    return column.filter ? 32 : 40;
  };

  const filterData = () => {
    let result = data.filter((item: any) => {
      const validities: boolean[] = [];
      Object.keys(selectedFilter).forEach((filterName) => {
        const filterOptions = selectedFilter[filterName];
        if (filterOptions?.length > 0) {
          let itemValue = item[filterName];
          if (!itemValue && getFilterValue) {
            itemValue = getFilterValue(item, filterName);
          }
          validities.push(
            !!filterOptions.some(
              (option: IOption) => option.value === itemValue
            )
          );
        }
      });
      return validities.every((v) => !!v);
    });
    if (searchTerm) {
      result = result.filter((item) => {
        return columns.some((col) => {
          let fieldValue = col.fieldName ? item[col.fieldName] : "";
          if (!fieldValue && col.getValue) {
            fieldValue = col.getValue(item);
          }
          if (!fieldValue && getFilterValue) {
            fieldValue = getFilterValue(item, col.fieldName ?? "");
          }
          if (!fieldValue && col.renderValue) {
            fieldValue = col.renderValue(item);
          }
          return (
            typeof fieldValue === "string" &&
            fieldValue.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });
      });
    }
    if (orderBy) {
      const { column } = orderBy;
      result = result.sort(
        column.sorting === "string" ? sortStringMethod : sortNumberMethod
      );
    }

    return result;
  };
  const filtered = filterData();

  const paginateFilteredData = () => {
    if (paginationSize && !onPaginationChange) {
      const start = (page - 1) * paginationSize;
      const end = start + paginationSize;
      return filtered.slice(start, end);
    }
    if (filtered.length > skeletonCount) {
      setSkeletonCount(filtered.length);
    }
    return filtered;
  };

  const paginatedData = paginateFilteredData();

  useEffect(() => {
    setPage(1);
  }, [data]);

  return (
    <>
      <Table {...tableProps}>
        <Table.Thead>
          <Table.Tr data-cy="table-headers">
            {columns.map((column, i) => {
              if (!selectedColumns.some((col) => col.label === column.label))
                return null;
              return (
                <Table.Th key={i}>
                  <Flex align={"center"} gap={5}>
                    {column.sorting && (
                      <DataSort
                        orderBy={orderBy}
                        column={column}
                        onChange={handleOnSortChange}
                      />
                    )}
                    {column.filter && (
                      <DataFilter
                        {...getFilterProps(
                          column.filter,
                          column.fieldName as string
                        )}
                      />
                    )}
                    <Text fw={400} fz={16} opacity={0.4} {...labelProps}>
                      {column.label}
                    </Text>
                  </Flex>
                </Table.Th>
              );
            })}
            {enableColumnVisibility && (
              <Table.Th>
                <CPopoverOptions
                  trigger={
                    <ActionIcon
                      variant="subtle"
                      data-cy="table-data-column-settings"
                    >
                      <IconDots />
                    </ActionIcon>
                  }
                  options={columns}
                  selectedOptions={selectedColumns}
                  getValue={(option) => option.label}
                  getLabel={(option) => option.label}
                  onChange={(selected) => {
                    setSelectedColumns(selected);
                  }}
                  renderItem={(option, onSelect, isSelected) => {
                    return (
                      <CItem
                        key={option.label}
                        label={option.label}
                        containerProps={{
                          justify: "space-between",
                        }}
                        reverse
                        icon={
                          <ActionIcon
                            variant="subtle"
                            onClick={() => {
                              onSelect(option);
                            }}
                            data-cy={`table-data-column-settings-${option.label}`}
                          >
                            <IconEye
                              size="1.5rem"
                              opacity={isSelected ? 1 : 0.4}
                            />
                          </ActionIcon>
                        }
                      />
                    );
                  }}
                />
              </Table.Th>
            )}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody data-cy="table-content">
          {paginatedData.map((item, i) => (
            <Table.Tr
              key={i}
              style={{
                borderStyle: "hidden",
                cursor: onRowClick ? "pointer" : "auto",
                backgroundColor:
                  selectedIndex === i && flagSelectedRow
                    ? "var(--table-selected-row-color)"
                    : undefined,
              }}
              onClick={() => {
                if (onRowClick) {
                  onRowClick(item);
                }
                setSelectedIndex(i);
              }}
            >
              {columns.map((column, i) => {
                if (!selectedColumns.some((col) => col.label === column.label))
                  return null;
                return (
                  <Table.Td
                    key={i}
                    style={{
                      paddingLeft:
                        column.filter || column.sorting
                          ? getContentPaddingLeft(column)
                          : 10,
                      borderBottom: 0,
                    }}
                  >
                    {column.renderValue
                      ? column.renderValue(item)
                      : renderValue(item, column.fieldName)}
                  </Table.Td>
                );
              })}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      {paginatedData.length === 0 && !loading && noRecordText && (
        <Text my="sm" c="dimmed">
          {noRecordText}
        </Text>
      )}
      {loading && <SkeletonRow count={skeletonCount} />}
      {paginationSize && (
        <Flex justify={"center"} style={{ width: "100%" }} mt="md">
          {Math.ceil((dataCount ?? filtered.length) / paginationSize) > 1 && (
            <Flex gap="xl" align={"center"} wrap={"wrap"}>
              <Pagination
                total={Math.ceil(
                  (dataCount ?? filtered.length) / paginationSize
                )}
                value={page}
                onChange={(page: number) => {
                  setPage(page);
                  if (onPaginationChange) {
                    onPaginationChange(page);
                  }
                }}
              />
              {enablePageJump && (
                <Box>
                  <Flex gap="xs" align="center">
                    <Text fz={14}>Jump to page</Text>
                    <TextInput
                      w={50}
                      value={page}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (
                          value >
                          Math.ceil(
                            (dataCount ?? filtered.length) / paginationSize
                          )
                        ) {
                          return;
                        }
                        setPage(value);
                        if (onPaginationChange) {
                          onPaginationChange(value);
                        }
                      }}
                    />
                  </Flex>
                </Box>
              )}
            </Flex>
          )}
        </Flex>
      )}
    </>
  );
};
