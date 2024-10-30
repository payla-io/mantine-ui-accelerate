import type { Meta, StoryObj } from "@storybook/react";
import { CButtonOptions } from "../src/ui/CButtonOptions";

const meta = {
  title: "Components/CButtonOptions",
  component: CButtonOptions,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CButtonOptions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    options: [
      { label: "Option 1", value: "1" },
      { label: "Option 2", value: "2" },
      { label: "Option 3", value: "3" },
    ],
    direction: "horizontal",
    value: "1",
    label: "Horizontal",
  },
};

export const Vertical: Story = {
  args: {
    options: [
      { label: "Option 1", value: "1" },
      { label: "Option 2", value: "2" },
      { label: "Option 3", value: "3" },
    ],
    direction: "vertical",
    value: "2",
    label: "Vertical",
  },
};

export const WithNumbers: Story = {
  args: {
    options: [
      { label: "One", value: 1 },
      { label: "Two", value: 2 },
      { label: "Three", value: 3 },
    ],
    value: 1,
    label: "With numbers",
  },
};
