import { Table, TableProps } from "@mantine/core";
import React from "react";

interface CDetailTableRow {
  fieldName?: string;
  label: string;
  renderValue?: (data: never) => React.ReactNode | string | number | undefined;
}

interface CDetailTableProps {
  tableProps?: TableProps;
  rows: CDetailTableRow[];
  data: never;
  renderValue?: (data: never) => React.ReactNode | string | number | undefined;
}

const CDetailTable = (props: CDetailTableProps) => {
  const getContent = (item: CDetailTableRow) => {
    if (item.fieldName) return props.data[item.fieldName];
    if (item.renderValue) return item.renderValue(props.data);
    if (props.renderValue) return props.renderValue(props.data);
    return "";
  };

  return (
    <Table horizontalSpacing="sm" fz="md" {...props.tableProps}>
      <Table.Tbody>
        {props.rows.map((item, i) => {
          return (
            <Table.Tr key={i}>
              <Table.Td>{item.label}</Table.Td>
              <Table.Td>{getContent(item)}</Table.Td>
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </Table>
  );
};
export default CDetailTable;
