import { Anchor, AnchorProps, Drawer, DrawerProps } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

interface CDrawerProps {
  anchorProps?: AnchorProps;
  anchorLabel: string | React.ReactNode;
  drawerProps?: Partial<DrawerProps>;
  bg?: string;
  title?: DrawerProps["title"];
  children: React.ReactNode;
  getHeader?: (close: () => void) => React.ReactNode;
}

export default function CDrawer(props: Readonly<CDrawerProps>) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        title={props.title}
        overlayProps={{ backgroundOpacity: 0.5 }}
        styles={{
          body: { height: "96%", marginTop: 0 },
          content: { backgroundColor: props.bg },
          header: { backgroundColor: props.bg },
        }}
        data-cy="cdrawer"
        {...props.drawerProps}
      >
        {props.getHeader && props.getHeader(close)}
        {props.children}
      </Drawer>
      <Anchor
        px="xl"
        {...props.anchorProps}
        onClick={() => {
          open();
        }}
      >
        {props.anchorLabel}
      </Anchor>
    </>
  );
}
