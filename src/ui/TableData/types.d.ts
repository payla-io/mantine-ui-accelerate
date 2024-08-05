import React from "react";
import { TableProps, TextProps } from "@mantine/core";
import { IOption } from "../CForm/types";

export interface CDataFilterProps {
  valueField?: string;
  labelField?: string;
  getLabel?: (option: IOption) => string;
  getValue?: (option: IOption) => string;
  options?: IOption[];
  selectedOptions?: IOption[];
  onChange?: (options: IOption[]) => void;
  renderLabel?: (option: IOption) => React.ReactNode;
}

export interface CTableDataColumn {
  fieldName?: string;
  label: string | React.ReactNode;
  renderValue?: (item: any) => React.ReactNode | string | number;
  getValue?: (item: any) => string;
  filter?: CDataFilterProps;
  sorting?: string;
  hidden?: boolean;
}

export interface IOrderBy {
  column: CTableDataColumn;
  direction: string;
}

export interface CDataSortingProps {
  onChange?: (column: CTableDataColumn, direction: string) => void;
  column: CTableDataColumn;
  orderBy: IOrderBy | undefined;
}

export interface IKeyValue {
  [key: string]: string;
}

export interface CTableDataProps {
  data: any[];
  searchTerm?: string;
  columns: CTableDataColumn[];
  paginationSize?: number;
  dataCount?: number;
  currentPage?: number;
  onPaginationChange?: (page: number) => void;
  getFilterValue?: (item: any, filterName: string) => string;
  onRowClick?: (
    item: any,
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => void;
  tableProps?: TableProps;
  labelProps?: TextProps;
  flagSelectedRow?: boolean;
  selectedRow?: number;
  loading?: boolean;
  noRecordText?: string;
  enablePageJump?: boolean;
  enableColumnVisibility?: boolean;
  defaultOrderBy?: IOrderBy;
}
