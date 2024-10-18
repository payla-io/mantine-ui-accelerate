import { Button, ButtonGroup, ButtonProps } from "@mantine/core";

interface Option {
  label: string;
  value: string | number;
}

interface CButtonOptionsProps {
  options: Option[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  direction?: "horizontal" | "vertical";
  buttonProps?: ButtonProps;
}

export function CButtonOptions({
  options,
  value,
  onChange,
  direction = "horizontal",
  buttonProps,
}: Readonly<CButtonOptionsProps>) {
  return (
    <ButtonGroup orientation={direction}>
      {options?.map((option) => (
        <Button
          key={option.value}
          variant={value === option.value ? "filled" : "light"}
          onClick={() => onChange?.(option.value)}
          {...buttonProps}
        >
          {option.label}
        </Button>
      ))}
    </ButtonGroup>
  );
}
