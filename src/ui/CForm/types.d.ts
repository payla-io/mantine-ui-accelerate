import { GridColProps } from "@mantine/core";
import { CFieldInputProps } from "./CFieldInput";

export interface IScreenSize {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    base?: number;

}

export interface IOption {
    label: string;
    value: string | number;
}

export interface ICFormField extends CFieldInputProps {
    initialValue?: sting | number | string[] | number[] | Date | Date[] | undefined | IOption | IOption[] | null;
    span?: GridColProps["span"];
    validate?: (value: unknown, values: Record<string, unknown>) => any;
}