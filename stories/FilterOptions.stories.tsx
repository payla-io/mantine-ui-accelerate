import type { Meta, StoryObj } from "@storybook/react";
import FilterOptions from "../src/ui/FilterOptions";
import React from "react";
import { Button, Text } from "@mantine/core";

const meta: Meta<typeof FilterOptions> = {
  component: FilterOptions,
};

export default meta;
type Story = StoryObj<typeof FilterOptions>;

export const Basic: Story = {
  args: {
    label: "Hello, World!",
    items: [
      {
        label: "Option 1",
        onClose: () => alert("Closed"),
        color: "red",
      },
      {
        label: "Option 2",
        onClose: () => alert("Closed"),
        color: "blue",
      },
    ],
  },
};
