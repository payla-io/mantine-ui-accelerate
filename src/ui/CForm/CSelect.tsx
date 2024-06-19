import { Select, SelectProps } from "@mantine/core";

interface CSelectProps extends SelectProps {
  form: any;
  name: string;
}
export default function CSelect(props: Readonly<CSelectProps>) {
  const option = props.form.values[props.name];
  return <Select {...props} 
    onChange={(_, option) => {
      if (props.form && props.name) {
        props.form.setFieldValue(props.name, option);
      }
    }}
    value={option?.value}
    error={props.form.errors[props.name]}
    />;
}
