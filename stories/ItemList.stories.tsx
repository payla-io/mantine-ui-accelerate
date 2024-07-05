import type { Meta, StoryObj } from "@storybook/react";
import { CItemList } from "../src/ui/CItemList";
import React from "react";
import { Box, Text } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";

const meta: Meta<typeof CItemList> = {
  component: CItemList,
};

export default meta;
type Story = StoryObj<typeof CItemList>;

export const Basic: Story = {
  args: {
    defaultItemProps: {
      divider: true,
    },
    items: [
      {
        label: "label",
        value: <Text>value</Text>,
        vertical: true,
        reverse: true,
        icon: <IconStar />,
      },
      {
        label: "label",
        value: <Text>value 2</Text>,
      },
    ],
  },
};

const CustomComponent = (props: any) => {
  return (
    <Box bg="red" p="xl" c="white">
      {props.label}
      {props.value}
    </Box>
  );
};
export const WithCustomComponent: Story = {
  args: {
    defaultItemProps: {
      itemComponent: CustomComponent,
    },
    items: [
      {
        data: {
          label: "label",
          value: <Text>value</Text>,
        },
        divider: true,
      },
      {
        data: {
          label: "label",
          value: <Text>value 2</Text>,
        },
      },
    ],
  },
};
