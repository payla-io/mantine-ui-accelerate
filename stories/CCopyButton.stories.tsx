import type { Meta, StoryObj } from "@storybook/react";
import { CCopyButton } from "../src/ui/CCopyButton";

const meta: Meta<typeof CCopyButton> = {
  component: CCopyButton,
};

export default meta;
type Story = StoryObj<typeof CCopyButton>;

export const Default: Story = {
  args: {
    copiedText: "Copied",
    copyText: "Copy to clipboard",
    value: "Hello, World!",
  },
};

export const WithColor: Story = {
  args: {
    copiedText: "Copied",
    copyText: "Copy to clipboard",
    value: "Hello, World!",
    color: "red",
  },
};
