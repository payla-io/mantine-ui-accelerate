import type { Meta, StoryObj } from "@storybook/react";
import { CItemListSection } from "../src/ui/CItemListSection";
import React from "react";
import { Box, Text } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";

const meta: Meta<typeof CItemListSection> = {
  component: CItemListSection,
};

export default meta;
type Story = StoryObj<typeof CItemListSection>;

export const Basic: Story = {
  args: {
    title: "Title",
    itemListProps: {
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
    cardProps: {
      radius: "md",
      shadow: "sm",
    },
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
    title: "Title",
    itemListProps: {
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
  },
};
