import { Image, ImageProps } from "@mantine/core";
import React from "react";

export interface CIconProps {
  src: string;
  size?: number;
  imageProps?: ImageProps;
}
export function CIcon(props: Readonly<CIconProps>) {
  return (
    <Image
      src={props.src}
      alt="icon"
      height={props.size ?? 24}
      width={props.size ?? 24}
      {...props.imageProps}
    />
  );
}
