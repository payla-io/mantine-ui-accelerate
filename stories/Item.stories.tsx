import type { Meta, StoryObj } from "@storybook/react";
import { CItem } from "../src/ui/CItem";
import React from "react";
import { Box, Flex, Text } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";

const meta: Meta<typeof CItem> = {
  component: CItem,
};

export default meta;
type Story = StoryObj<typeof CItem>;

export const Basic: Story = {
  args: {
    label: "label",
    value: <Text>value</Text>,
  },
};

export const WithMoreControl: Story = {
  args: {
    label: "label",
    value: <Text>value</Text>,
    vertical: true,
    reverse: true,
    icon: <IconStar />,
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
    data: {
      label: "label",
      value: <Text>value</Text>,
    },
    itemComponent: CustomComponent,
  },
};
