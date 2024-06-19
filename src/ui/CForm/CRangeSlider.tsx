import { Stack, RangeSlider, Text, RangeSliderProps } from "@mantine/core";

export interface CRangeSliderProps extends RangeSliderProps {
  label?: string;
  description?: string;
  labelProps?: React.ComponentProps<typeof Text>;
  descriptionProps?: React.ComponentProps<typeof Text>;
}
export default function CRangeSlider(props: Readonly<CRangeSliderProps>) {
  const { label, description, labelProps, descriptionProps, ...rest } = props;
  return (
    <Stack>
      {label && (
        <Text size="sm" {...labelProps}>
          {label}
        </Text>
      )}
      {description && (
        <Text size="sm" {...descriptionProps}>
          {description}
        </Text>
      )}
      <RangeSlider
        value={props.value}
        onChange={(value) => {
          if (props.onChange) props.onChange(value);
        }}
        onChangeEnd={(value) => {
          if (props.onChange) props.onChange(value);
        }}
        {...rest}
      />
    </Stack>
  );
}
