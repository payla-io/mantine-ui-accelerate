import {
  Divider,
  DividerProps,
  Flex,
  FlexProps,
  Image,
  ImageProps,
  Text,
  TextProps,
} from "@mantine/core";
import React from "react";

export interface ItemProps {
  imageSrc?: string;
  imageAlt?: string;
  imageProps?: ImageProps;
  label?: string;
  labelProps?: TextProps;
  icon?: React.ReactNode;
  vertical?: boolean;
  reverse?: boolean;
  gap?: string;
  align?: string;
  justify?: string;
  divider?: boolean;
  dividerProps?: DividerProps;
  itemComponent?: React.ElementType;
  data?: any;
  value?: string | React.ReactNode;
  valueProps?: TextProps;
  containerProps?: FlexProps;
  onClick?: (item: ItemProps) => void;
  renderItem?: (item?: ItemProps) => React.ReactNode;
}

export default function Item(props: Readonly<ItemProps>) {
  const direction = props.vertical ? "column" : "row";
  const reverseDirection: FlexProps["direction"] = props.reverse
    ? `${direction}-reverse`
    : direction;

  const ItemComponent = props.itemComponent;

  return (
    <>
      <Flex
        px="2px"
        py="2px"
        gap={props.gap ?? "sm"}
        align={props.align}
        justify={props.justify}
        flex={1}
        direction={props.reverse ? reverseDirection : direction}
        onClick={() => {
          if (props.onClick) props.onClick(props);
        }}
        style={{ cursor: props.onClick ? "pointer" : undefined }}
        {...props.containerProps}
      >
        {ItemComponent ? (
          <ItemComponent {...props.data} />
        ) : (
          <>
            {props.renderItem ? (
              props.renderItem(props)
            ) : (
              <>
                {props.imageSrc && (
                  <Image
                    src={props.imageSrc}
                    alt={props.imageAlt ?? "item image"}
                    {...props.imageProps}
                  />
                )}
                {!props.imageSrc && props.icon && props.icon}
                <Text {...props.labelProps}>{props.label}</Text>
                {props.value && (
                  <Text {...props.valueProps}>{props.value}</Text>
                )}
              </>
            )}
          </>
        )}
      </Flex>
      {props.divider && <Divider my="sm" {...props.dividerProps} />}
    </>
  );
}
