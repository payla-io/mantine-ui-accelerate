import { Flex } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

interface Item {
  label: string;
  to: string;
  style?: React.CSSProperties;
}
interface CLinkListProps {
  items: Item[];
  style?: React.CSSProperties;
}

export default function CLinkList(props: Readonly<CLinkListProps>) {
  return (
    <Flex justify="center" gap={"md"} direction={{ base: "column", sm: "row" }}>
      {props.items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          style={{ ...props.style, ...item.style }}
        >
          {item.label}
        </Link>
      ))}
    </Flex>
  );
}
