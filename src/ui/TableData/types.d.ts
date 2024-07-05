import React from "react";
import { TableProps, TextProps } from "@mantine/core";

export interface DataFilterProps {
  valueField?: string;
  labelField?: string;
  getLabel?: (option: IOption) => string;
  getValue?: (option: IOption) => string;
  options?: IOption[];
  selectedOptions?: IOption[];
  onChange?: (options: IOption[]) => void;
  renderLabel?: (option: IOption) => React.ReactNode;
}

export interface ITableDColumn {
  fieldName?: string;
  label: string | React.ReactNode;
  renderValue?: (item: object) => React.ReactNode | string | number;
  getValue?: (item: object) => string;
  filter?: DataFilterProps;
  sorting?: string;
}

export interface IOrderBy {
  column: ITableDColumn;
  direction: string;
}

export interface DataSortingProps {
  onChange?: (column: ITableDColumn, direction: string) => void;
  column: ITableDColumn;
  orderBy: IOrderBy | undefined;
}

export interface IKeyValue {
  [key: string]: string;
}

export interface ITableDataColumn {
  fieldName?: string;
  label: string | React.ReactNode;
  renderValue?: (item: any) => React.ReactNode | string | number;
  getValue?: (item: any) => string;
  filter?: DataFilterProps;
  sorting?: string;
  hidden?: boolean;
}

export interface TableDataProps {
  data: any[];
  searchTerm?: string;
  columns: ITableDataColumn[];
  paginationSize?: number;
  dataCount?: number;
  getFilterValue?: (item: any, filterName: string) => string;
  onRowClick?: (item: any) => void;
  tableProps?: TableProps;
  labelProps?: TextProps;
  flagSelectedRow?: boolean;
  selectedRow?: number;
  loading?: boolean;
  noRecordText?: string;
  enablePageJump?: boolean;
  enableColumnVisibility?: boolean;
  onPaginationChange?: (page: number) => void;
  defaultOrderBy?: IOrderBy;
}
