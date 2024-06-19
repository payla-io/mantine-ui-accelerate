import {
  Box,
  BoxProps,
  Card,
  CardProps,
  Title,
  TitleProps,
} from "@mantine/core";
import ItemList, { ItemListProps } from "./ItemList";

interface ItemListSectionProps {
  title?: string;
  titleProps?: TitleProps;
  cardProps?: CardProps;
  itemListProps: ItemListProps;
  boxProps?: BoxProps;
}

export default function ItemListSection(props: Readonly<ItemListSectionProps>) {
  return (
    <Box {...props.boxProps}>
      {props.title && (
        <Title size="xs" my="sm" {...props.titleProps}>
          {props.title}
        </Title>
      )}
      <Card radius={0} {...props.cardProps}>
        <ItemList {...props.itemListProps} />
      </Card>
    </Box>
  );
}
