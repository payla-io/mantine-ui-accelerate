import type { Meta, StoryObj } from "@storybook/react";
import { CFilterOptions } from "../src/ui/CFilterOptions";
import React from "react";
import { Button, Text } from "@mantine/core";

const meta: Meta<typeof CFilterOptions> = {
  component: CFilterOptions,
};

export default meta;
type Story = StoryObj<typeof CFilterOptions>;

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
