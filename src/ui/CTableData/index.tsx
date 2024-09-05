import {
  ActionIcon,
  Box,
  Flex,
  Pagination,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { CDataSort, IOrderBy } from "../CDataSort";
import { CDataFilter } from "../CDataFilter";
import React, { useEffect, useState } from "react";
import {
  CTableDataFilterProps,
  CIKeyValue,
  CTableDataColumn,
  CTableDataProps,
} from "./types";
import { CSkeletonRow } from "../CSkeletonRow";
import { IconDots, IconEye } from "@tabler/icons-react";
import { CPopoverOptions } from "../CPopoverOptions";
import { CItem } from "../CItem";
import { useUniqueOptions } from "../../hooks/useUniqueOptions";
import { IOption } from "../CForm/types";
import CChevronToggle from "../CChevronToggle";

const renderValue = (item: CIKeyValue, fieldName?: string) => {
  return (
    <Text fw={400} fz={14}>
      {fieldName ? item[fieldName] : ""}
    </Text>
  );
};

export const CTableData = (props: CTableDataProps) => {
  const [selectedFilter, setSelectedFilter] = useState<any>({});
  const [toggledRow, setToggledRow] = useState<any>({});
  const [page, setPage] = useState(props.currentPage ?? 1);
  const [skeletonCount, setSkeletonCount] = useState(5);
  const [orderBy, setOrderBy] = useState<IOrderBy>(
    props.defaultOrderBy || { column: props.columns[0], direction: "asc" }
  );
  const unique = useUniqueOptions({ data: props.data });
  const [selectedItem, setSelectedItem] = useState<any>();
  const [selectedColumns, setSelectedColumns] = useState<CTableDataColumn[]>(
    props.columns.filter((col) => !col.hidden)
  );

  const getFilterProps = (filter: CTableDataFilterProps, fieldName: string) => {
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
            props.getFilterValue
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
    if (!props.currentPage) setPage(1);
    setSelectedFilter({ ...selectedFilter, [filterName]: options });
  };

  const handleOnSortChange = (column: CTableDataColumn, direction: string) => {
    setOrderBy({ column, direction });
    if (props.handleSortChange) {
      props.handleSortChange(column, direction);
    }
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
    let result = props.data.filter((item: any) => {
      const validities: boolean[] = [];
      Object.keys(selectedFilter).forEach((filterName) => {
        const filterOptions = selectedFilter[filterName];
        if (filterOptions?.length > 0) {
          let itemValue = item[filterName];
          if (!itemValue && props.getFilterValue) {
            itemValue = props.getFilterValue(item, filterName);
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
    if (props.searchTerm) {
      result = result.filter((item) => {
        return props.columns.some((col) => {
          let fieldValue = col.fieldName ? item[col.fieldName] : "";
          if (!fieldValue && col.getValue) {
            fieldValue = col.getValue(item);
          }
          if (!fieldValue && props.getFilterValue) {
            fieldValue = props.getFilterValue(item, col.fieldName ?? "");
          }
          if (!fieldValue && col.renderValue) {
            fieldValue = col.renderValue(item);
          }
          return (
            typeof fieldValue === "string" &&
            props.searchTerm &&
            fieldValue.toLowerCase().includes(props.searchTerm.toLowerCase())
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
    if (props.paginationSize && !props.onPaginationChange) {
      const start = (page - 1) * props.paginationSize;
      const end = start + props.paginationSize;
      return filtered.slice(start, end);
    }
    if (filtered.length > skeletonCount) {
      setSkeletonCount(filtered.length);
    }
    return filtered;
  };

  const paginatedData = paginateFilteredData();

  useEffect(() => {
    if (!props.currentPage) setPage(1);
  }, [props.data, paginatedData]);

  useEffect(() => {
    if (props.currentPage && props.currentPage !== page)
      setPage(props.currentPage);
  }, [props.currentPage]);

  return (
    <>
      <Table {...props.tableProps}>
        <Table.Thead>
          <Table.Tr data-cy="table-headers">
            {props.columns.map((column, i) => {
              if (
                typeof column.label === "string" &&
                !selectedColumns.some((col) => col.label === column.label)
              )
                return null;
              return (
                <Table.Th key={i}>
                  <Flex align={"center"} gap={5}>
                    {column.sorting && (
                      <CDataSort
                        orderBy={orderBy}
                        column={column}
                        onChange={handleOnSortChange}
                        ascIndicator={props.ascSortIndicator}
                        descIndicator={props.decSortIndicator}
                      />
                    )}
                    {column.filter && (
                      <CDataFilter
                        {...getFilterProps(
                          column.filter,
                          column.fieldName as string
                        )}
                      />
                    )}
                    <Text fw={400} fz={16} opacity={0.4} {...props.labelProps}>
                      {column.label}
                    </Text>
                  </Flex>
                </Table.Th>
              );
            })}
            {props.enableColumnVisibility && (
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
                  options={props.columns}
                  selectedOptions={selectedColumns}
                  getValue={(option) => option.label}
                  getLabel={(option) => option.label}
                  onChange={(selected) => {
                    setSelectedColumns(selected);
                  }}
                  renderItem={(option, onSelect, isSelected) => {
                    if (typeof option.label !== "string") return null;
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
          {paginatedData.map((item, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <Table.Tr
                style={{
                  borderStyle: "hidden",
                  cursor:
                    props.onRowClick ||
                    props.getCollapsibleContent ||
                    props.enableRowPointer
                      ? "pointer"
                      : "auto",
                  backgroundColor:
                    props.flagSelectedRow &&
                    props.isItemSelected &&
                    props.isItemSelected(item, selectedItem)
                      ? props.selectedRowColor ??
                        "var(--mantine-primary-color-2)"
                      : undefined,
                }}
                onClick={(e) => {
                  if (props.onRowClick) {
                    props.onRowClick(item, e);
                  }
                  setSelectedItem(item);
                  if (props.singleRowToggle) {
                    setToggledRow({
                      [rowIndex]: !toggledRow[rowIndex],
                    });
                  } else {
                    setToggledRow({
                      ...toggledRow,
                      [rowIndex]: !toggledRow[rowIndex],
                    });
                  }
                }}
              >
                {props.columns.map((column, i) => {
                  if (
                    typeof column.label === "string" &&
                    !selectedColumns.some((col) => col.label === column.label)
                  )
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
                      pl={
                        props.getCollapsibleContent && i === 0 ? 0 : undefined
                      }
                    >
                      <Flex align={"center"} gap={"sm"}>
                        {props.getCollapsibleContent && i === 0 && (
                          <CChevronToggle active={!!toggledRow[rowIndex]} />
                        )}
                        {column.renderValue
                          ? column.renderValue(item)
                          : renderValue(item, column.fieldName)}
                      </Flex>
                    </Table.Td>
                  );
                })}
              </Table.Tr>
              {props.getCollapsibleContent && !!toggledRow[rowIndex] && (
                <Table.Tr>
                  <Table.Td colSpan={props.columns.length} p="0">
                    <Box bg="gray.0" p="sm">
                      {props.getCollapsibleContent(item)}
                    </Box>
                  </Table.Td>
                </Table.Tr>
              )}
            </React.Fragment>
          ))}
        </Table.Tbody>
      </Table>
      {paginatedData.length === 0 && !props.loading && props.noRecordText && (
        <Text my="sm" c="dimmed">
          {props.noRecordText}
        </Text>
      )}
      {props.loading && <CSkeletonRow count={skeletonCount} />}
      {props.paginationSize && (
        <Flex justify={"center"} style={{ width: "100%" }} mt="md">
          {Math.ceil(
            (props.dataCount ?? filtered.length) / props.paginationSize
          ) > 1 && (
            <Flex gap="xl" align={"center"} wrap={"wrap"}>
              <Pagination
                total={Math.ceil(
                  (props.dataCount ?? filtered.length) / props.paginationSize
                )}
                value={page}
                onChange={(page: number) => {
                  setPage(page);
                  if (props.onPaginationChange) {
                    props.onPaginationChange(page);
                  }
                }}
              />
              {props.enablePageJump && (
                <Box>
                  <Flex gap="xs" align="center">
                    <Text fz={14}>
                      {props.jumpToPageLabel ?? "Jump to page"}
                    </Text>
                    <TextInput
                      w={50}
                      value={page}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (
                          value >
                          Math.ceil(
                            (props.dataCount ?? filtered.length) /
                              (props.paginationSize || 1)
                          )
                        ) {
                          return;
                        }
                        setPage(value);
                        if (props.onPaginationChange) {
                          props.onPaginationChange(value);
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
