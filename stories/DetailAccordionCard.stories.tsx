import type { Meta, StoryObj } from "@storybook/react";
import { CDetailAccordionCard } from "../src/ui/CDetailAccordionCard";
import React from "react";
import { Button, Text } from "@mantine/core";

const meta: Meta<typeof CDetailAccordionCard> = {
  component: CDetailAccordionCard,
};

export default meta;
type Story = StoryObj<typeof CDetailAccordionCard>;

export const Basic: Story = {
  args: {
    title: "Hello, World!",
    children: <Text>Hello, World!</Text>,
  },
};

export const WithHeaderRight: Story = {
  args: {
    title: "Hello, World!",
    closeByDefault: true,
    headerRight: <Button>Right</Button>,
    children: <Text>Hello, World!</Text>,
    cardProps: {
      radius: "md",
      shadow: "sm",
    },
  },
};
