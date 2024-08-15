import { Group, GroupProps } from "@mantine/core";
import { CCopyButton, CCopyButtonProps } from "./CCopyButton";

export interface CCopyValueProps {
  containerProps?: GroupProps;
  copyProps: CCopyButtonProps;
  children: React.ReactNode;
}

export const CCopyValue = (props: CCopyValueProps) => {
  return (
    <Group justify="space-between" wrap="nowrap" {...props.containerProps}>
      {props.children}
      <CCopyButton {...props.copyProps} />
    </Group>
  );
};
