import { Select, SelectProps } from "@mantine/core";

export interface CSelectProps extends SelectProps {
  form: any;
  name: string;
}
export function CSelect(props: Readonly<CSelectProps>) {
  const option = props.form.values[props.name];
  return (
    <Select
      {...props}
      onChange={(_, option) => {
        if (props.form && props.name) {
          props.form.setFieldValue(props.name, option);
        }
      }}
      value={option?.value}
      error={props.form.errors[props.name]}
    />
  );
}
