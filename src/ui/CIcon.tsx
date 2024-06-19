import { Image, ImageProps } from "@mantine/core";

interface CIconProps {
  src: string;
  size?: number;
  imageProps?: ImageProps;
}
export default function CIcon(props: Readonly<CIconProps>) {
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
