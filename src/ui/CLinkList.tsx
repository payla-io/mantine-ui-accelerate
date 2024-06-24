import { Anchor, Flex } from "@mantine/core";
import React from "react";

interface Item {
  label: string;
  href?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}
interface CLinkListProps {
  items: Item[];
  style?: React.CSSProperties;
  containerProps?: React.ComponentProps<typeof Flex>;
}

export default function CLinkList(props: Readonly<CLinkListProps>) {
  return (
    <Flex justify="center" gap={"md"} direction={{ base: "column", sm: "row" }} {...props.containerProps}>
      {props.items.map((item) => (
        <Anchor
          key={item.href}
          href={item.href}
          style={{ ...props.style, ...item.style }}
          onClick={item.onClick}
        >
          {item.label}
        </Anchor>
      ))}
    </Flex>
  );
}
