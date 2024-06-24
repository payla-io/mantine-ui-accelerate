import type { Meta, StoryObj } from "@storybook/react";
import ItemList from "../src/ui/ItemList";
import React from "react";
import { Box, Text } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";

const meta: Meta<typeof ItemList> = {
  component: ItemList,
};

export default meta;
type Story = StoryObj<typeof ItemList>;

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
