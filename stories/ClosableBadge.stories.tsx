import type { Meta, StoryObj } from "@storybook/react";
import { ClosableBadge } from "../src/ui/ClosableBadge";

const meta: Meta<typeof ClosableBadge> = {
  component: ClosableBadge,
};

export default meta;
type Story = StoryObj<typeof ClosableBadge>;

export const Default: Story = {
  args: {
    label: "Hello, World!",
  },
};

export const OnCloseWithColor: Story = {
  args: {
    label: "Hello, World!",
    onClose: () => alert("Closed"),
    color: "red",
  },
};
