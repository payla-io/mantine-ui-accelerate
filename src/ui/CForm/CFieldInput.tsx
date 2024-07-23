import {
  Text,
  MultiSelect,
  PasswordInput,
  Stack,
  Box,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { CRangeSlider } from "./CRangeSlider";
import { CTextArea } from "./CTextArea";
import { CFileUpload } from "./CFileUpload";
import { CPhoneInput } from "./CPhoneInput";
import { CheckboxInput } from "./CheckboxInput";
import { CLocationInput } from "./CLocationInput";
import { CSelect } from "./CSelect";
import { ICondition } from "../../utils/conditions";
import { CTextInput } from "./CTextInput";
import { CDateInputPicker } from "./CDateInputPicker";
import { DatePickerInput } from "@mantine/dates";
import React from "react";

export interface CFieldInputProps {
  name: string;
  align?: string;
  helpText?: string;
  label?: string;
  description?: string;
  inputType: string;
  inputProps?: any;
  hidden?: boolean;
  visibilityConditions?: ICondition[];
  valueConditions?: ICondition[];
  formInstance?: UseFormReturnType<
    Record<string, unknown>,
    (values: Record<string, unknown>) => Record<string, unknown>
  >;
}

const componentMap: Record<string, any> = {
  text: CTextInput,
  textarea: CTextArea,
  email: TextInput,
  number: NumberInput,
  image: CFileUpload,
  file: CFileUpload,
  phone: CPhoneInput,
  password: PasswordInput,
  date_mask: CDateInputPicker,
  date: DatePickerInput,
  select: CSelect,
  multi_select: MultiSelect,
  range: CRangeSlider,
  checkbox: CheckboxInput,
  location: CLocationInput,
};

export function CFieldInput(props: Readonly<CFieldInputProps>) {
  const FieldComponent = componentMap[props.inputType];
  return (
    <Stack align={props.align}>
      {props.label && <Text size="md">{props.label}</Text>}
      {props.description && (
        <Text size="xs" c="dimmed">
          {props.description}
        </Text>
      )}
      <Box>
        <FieldComponent
          name={props.name}
          form={props.formInstance}
          {...props.formInstance?.getInputProps(props.name)}
          {...props.inputProps}
        />

        {props.helpText && (
          <Text size="xs" c="dimmed" m="0">
            {props.helpText}
          </Text>
        )}
      </Box>
    </Stack>
  );
}
