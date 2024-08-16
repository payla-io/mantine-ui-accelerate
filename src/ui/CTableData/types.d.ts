import React from "react";
import { TableProps, TextProps } from "@mantine/core";
import { IOption } from "../CForm/types";

export interface CTableDataFilterProps {
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
  filter?: CTableDataFilterProps;
  sorting?: string;
  hidden?: boolean;
}

export interface CIKeyValue {
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
  selectedRowColor?: string;
  isItemSelected?: (item: any, selectedItem: any) => boolean;
  loading?: boolean;
  noRecordText?: string;
  enablePageJump?: boolean;
  enableColumnVisibility?: boolean;
  defaultOrderBy?: IOrderBy;
  jumpToPageLabel?: string;
  enableRowPointer?: boolean;
  singleRowToggle?: boolean;
  getCollapsibleContent?: (item: any) => React.ReactNode;
}
