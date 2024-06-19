import { ActionIcon, TextInput, TextInputProps } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onClick?: () => void;
  inputProps?: TextInputProps;
}
export default function SearchInput(props: Readonly<SearchInputProps>) {
  return (
    <TextInput
      flex={1}
      w={"100%"}
      onChange={(event) => {
        if (props.onChange) {
          props.onChange(event.currentTarget.value);
        }
      }}
      value={props.value}
      rightSection={
        <ActionIcon variant="subtle" onClick={props.onClick}>
          <IconSearch />
        </ActionIcon>
      }
      radius={"xl"}
      {...props.inputProps}
    />
  );
}
