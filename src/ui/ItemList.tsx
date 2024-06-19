import { Flex, FlexProps } from "@mantine/core";
import Item, { ItemProps } from "./Item";

export interface ItemListProps {
  items: ItemProps[];
  defaultItemProps?: Partial<ItemProps>;
  gap?: string;
  align?: string;
  justify?: string;
  wrap?: FlexProps["wrap"];
  horizontal?: boolean;
  reverse?: boolean;
}

export default function ItemList(props: Readonly<ItemListProps>) {
  const direction = props.horizontal ? "row" : "column";
  const reverseDirection: FlexProps["direction"] = props.reverse
    ? `${direction}-reverse`
    : direction;
  return (
    <Flex
      wrap={props.wrap ?? "wrap"}
      gap={props.gap ?? "sm"}
      align={props.align}
      direction={props.reverse ? reverseDirection : direction}
      justify={props.justify}
    >
      {props.items.map((item) => (
        <Item key={item.label} {...props.defaultItemProps} {...item} />
      ))}
    </Flex>
  );
}
