import { Button, ButtonProps } from "@mantine/core";

interface CButtonProps extends ButtonProps {
  inputProps: any;
  label: string;
}

export function CButton(props: Readonly<CButtonProps>) {
  const { label, ...rest } = props;

  return <Button {...rest}>{label}</Button>;
}
