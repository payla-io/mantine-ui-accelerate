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
import { useEffect, useState } from "react";

interface CDateInputPickerProps extends TextInputProps {
  mask?: string;
  pickerProps?: DatePickerProps<DatePickerType>;
  form: any;
  name: string;
  maskSeparator?: string;
  formatDate?: (date: string) => string;
}

export const parseMaskedDate = (dateString: string, partSplit: string) => {
  if (!dateString || dateString.includes("_")) return new Date();
  const parts = dateString.split(partSplit);
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Month is zero-based in JS Date
  const year = parseInt(parts[2], 10);
  return new Date(year, month, day);
};

export function CDateInputPicker(props: Readonly<CDateInputPickerProps>) {
  const { pickerProps, formatDate, maskSeparator, ...rest } = props;
  const value = props.form.values[props.name];
  const [dateValue, setDateValue] = useState<Date | undefined>();

  useEffect(() => {
    if (value) {
      setDateValue(parseMaskedDate(value, maskSeparator ?? "/"));
    }
  }, [value]);

  return (
    <Box>
      <TextInput
        component={InputMask}
        rightSection={
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
        }
        {...rest}
      />
    </Box>
  );
}
