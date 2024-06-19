import { Flex, useMantineTheme } from "@mantine/core";
import { IconArrowNarrowDown, IconArrowNarrowUp } from "@tabler/icons-react";
import { DataSortingProps } from "./types";
import { useState } from "react";

export default function DataSort({ column, orderBy, onChange }: Readonly<DataSortingProps>) {
  const theme = useMantineTheme();
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  if (!column.fieldName && !column.getValue) return null;

  return (
    <Flex
      style={{ cursor: "pointer" }}
      onClick={() => {
        const newDirection = direction === "asc" ? "desc" : "asc";
        setDirection(newDirection);
        if (onChange) onChange(column, newDirection);
      }}
    >
      <IconArrowNarrowUp
        size={"1rem"}
        color={
          direction === "asc" && orderBy?.column?.fieldName === column.fieldName
            ? theme.colors.dark[5]
            : theme.colors.dark[0]
        }
      />
      <IconArrowNarrowDown
        size={"1rem"}
        color={
          direction === "desc" &&
          orderBy?.column?.fieldName === column.fieldName
            ? theme.colors.dark[5]
            : theme.colors.dark[0]
        }
        style={{ marginLeft: -8 }}
      />
    </Flex>
  );
}
