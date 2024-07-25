import { Flex, FlexProps } from "@mantine/core";
import { CItem, CItemProps } from "./CItem";

export interface CItemListProps {
  items: CItemProps[];
  defaultItemProps?: Partial<CItemProps>;
  gap?: string;
  align?: string;
  justify?: string;
  wrap?: FlexProps["wrap"];
  horizontal?: boolean;
  reverse?: boolean;
}

export function CItemList(props: Readonly<CItemListProps>) {
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
        <CItem key={item.label} {...props.defaultItemProps} {...item} />
      ))}
    </Flex>
  );
}
