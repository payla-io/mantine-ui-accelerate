import type { Meta, StoryObj } from "@storybook/react";
import DetailAccordionCard from "../src/ui/DetailAccordionCard";
import React from "react";
import { Button, Text } from "@mantine/core";

const meta: Meta<typeof DetailAccordionCard> = {
  component: DetailAccordionCard,
};

export default meta;
type Story = StoryObj<typeof DetailAccordionCard>;

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
