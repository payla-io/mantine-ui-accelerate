import {
  Box,
  BoxProps,
  Card,
  CardProps,
  Title,
  TitleProps,
} from "@mantine/core";
import { CItemList, CItemListProps } from "./CItemList";
import React from "react";

export interface CItemListSectionProps {
  title?: string;
  titleProps?: TitleProps;
  cardProps?: CardProps;
  itemListProps: CItemListProps;
  containerProps?: BoxProps;
}

export function CItemListSection(props: Readonly<CItemListSectionProps>) {
  return (
    <Box {...props.containerProps}>
      {props.title && (
        <Title size="xs" my="sm" {...props.titleProps}>
          {props.title}
        </Title>
      )}
      <Card radius={0} {...props.cardProps}>
        <CItemList {...props.itemListProps} />
      </Card>
    </Box>
  );
}
