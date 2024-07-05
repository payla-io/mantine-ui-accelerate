import { ActionIcon, Badge, Flex, Text } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import React from "react";

export interface ClosableBadgeProps {
  color?: string;
  label: string;
  onClose?: () => void;
}
export function ClosableBadge(props: Readonly<ClosableBadgeProps>) {
  return (
    <Badge color={props.color}>
      <Flex gap="xs" align="center">
        <Text size="sm" tt="none">
          {props.label}
        </Text>
        <ActionIcon
          onClick={props.onClose}
          radius={"xl"}
          size="xs"
          variant="subtle"
        >
          <IconX size="1.2rem" color="white" />
        </ActionIcon>
      </Flex>
    </Badge>
  );
}
