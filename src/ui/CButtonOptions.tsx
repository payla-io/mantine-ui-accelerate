import {
  Button,
  ButtonGroup,
  ButtonProps,
  Text,
  TextProps,
} from "@mantine/core";

interface Option {
  label: string;
  value: string | number;
}

interface CButtonOptionsProps {
  options: Option[];
  value?: string | number;
  label?: string;
  onChange?: (value: string | number) => void;
  direction?: "horizontal" | "vertical";
  buttonProps?: ButtonProps;
  labelProps?: TextProps;
}

export function CButtonOptions({
  options,
  value,
  label,
  onChange,
  direction = "horizontal",
  buttonProps,
  labelProps,
}: Readonly<CButtonOptionsProps>) {
  return (
    <>
      {label && <Text {...labelProps}>{label}</Text>}
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
    </>
  );
}
