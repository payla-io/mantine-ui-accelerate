import { Checkbox, Stack } from "@mantine/core";
import { IOption } from "./types";

interface CheckboxInputProps {
  name: string;
  data: IOption[];
}

export function CheckboxInput(props: Readonly<CheckboxInputProps>) {
  return (
    <Checkbox.Group {...props}>
      <Stack gap={"sm"}>
        {props.data.map((option) => {
          return (
            <Checkbox
              name={props.name}
              key={option.value}
              value={option.value}
              label={option.label}
              size="xs"
            />
          );
        })}
      </Stack>
    </Checkbox.Group>
  );
}
