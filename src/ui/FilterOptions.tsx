import { Box, Flex, Text, TextInputProps } from "@mantine/core";
import ClosableBadge, { ClosableBadgeProps } from "./ClosableBadge";
import React from "react";

export interface FilterOptionsProps {
  label: TextInputProps["label"];
  items: ClosableBadgeProps[];
}
export default function FilterOptions(props: Readonly<FilterOptionsProps>) {
  return (
    <Box style={{ border: "1px dotted gray", borderRadius: "8px" }} p="xs">
      <Flex gap="xs" align={"center"}>
        <Text fw={600} tt="capitalize">
          {(props.label as string)?.replace("_", " ")}:
        </Text>
        <Flex gap="xs">
          {props.items.map((item, index) => (
            <ClosableBadge key={index} {...item} />
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}
