import { Box, Flex, useMantineTheme } from "@mantine/core";
import { IconArrowNarrowDown, IconArrowNarrowUp } from "@tabler/icons-react";
import { useState } from "react";
import { CTableDataColumn } from "./CTableData/types";

export interface IOrderBy {
  column: CTableDataColumn;
  direction: string;
}

export interface CDataSortingProps {
  onChange?: (column: CTableDataColumn, direction: string) => void;
  column: CTableDataColumn;
  orderBy: IOrderBy | undefined;
  descIndicator?: React.ReactNode;
  ascIndicator?: React.ReactNode;
}

export function CDataSort(props: Readonly<CDataSortingProps>) {
  const theme = useMantineTheme();
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  if (!props.column.fieldName && !props.column.getValue) return null;

  return (
    <Flex
      style={{ cursor: "pointer" }}
      onClick={() => {
        const newDirection = direction === "asc" ? "desc" : "asc";
        setDirection(newDirection);
        if (props.onChange) props.onChange(props.column, newDirection);
      }}
    >
      {props.ascIndicator ? (
        <Box
          style={{
            opacity:
              direction === "asc" &&
              props.orderBy?.column?.fieldName === props.column.fieldName
                ? 1
                : 0.4,
          }}
        >
          {props.ascIndicator}
        </Box>
      ) : (
        <IconArrowNarrowUp
          size={"1rem"}
          color={
            direction === "asc" &&
            props.orderBy?.column?.fieldName === props.column.fieldName
              ? theme.colors.dark[5]
              : theme.colors.dark[0]
          }
        />
      )}
      {props.descIndicator ? (
        <Box
          style={{
            opacity:
              direction === "desc" &&
              props.orderBy?.column?.fieldName === props.column.fieldName
                ? 1
                : 0.4,
          }}
        >
          {props.descIndicator}
        </Box>
      ) : (
        <IconArrowNarrowDown
          size={"1rem"}
          color={
            direction === "desc" &&
            props.orderBy?.column?.fieldName === props.column.fieldName
              ? theme.colors.dark[5]
              : theme.colors.dark[0]
          }
          style={{ marginLeft: -8 }}
        />
      )}
    </Flex>
  );
}
