import {
  ActionIcon,
  Box,
  Popover,
  TextInput,
  TextInputProps,
} from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import { DatePicker, DatePickerProps, DatePickerType } from "@mantine/dates";
import InputMask from "react-input-mask";
import React, { useEffect, useState } from "react";

interface CDateInputPickerProps extends TextInputProps {
  mask?: string;
  pickerProps?: DatePickerProps<DatePickerType>;
  form: any;
  name: string;
  getDateInstance?: (date: string) => Date;
  formatDate?: (date: string) => string;
}

export function CDateInputPicker(props: Readonly<CDateInputPickerProps>) {
  const { pickerProps, getDateInstance, formatDate, ...rest } = props;
  const value = props.form.values[props.name];
  const [dateValue, setDateValue] = useState<Date | undefined>();

  useEffect(() => {
    if (value && getDateInstance) {
      setDateValue(getDateInstance(value));
    }
  }, [value]);

  return (
    <Box>
      <TextInput
        component={InputMask}
        rightSection={
          getDateInstance ? (
            <Popover width={200} position="bottom" withArrow shadow="md">
              <Popover.Target>
                <ActionIcon variant="subtle">
                  <IconCalendar />
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown w={"290px"}>
                <DatePicker
                  {...pickerProps}
                  value={dateValue}
                  date={dateValue}
                  onDateChange={setDateValue}
                  onChange={(v) => {
                    setDateValue(v as Date);
                    if (props.form && props.name) {
                      props.form.setFieldValue(
                        props.name,
                        formatDate
                          ? formatDate(v?.toString() as string)
                          : (v?.toString() as string)
                      );
                    }
                  }}
                />
              </Popover.Dropdown>
            </Popover>
          ) : undefined
        }
        {...rest}
      />
    </Box>
  );
}
