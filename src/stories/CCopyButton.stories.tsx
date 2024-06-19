// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from '@storybook/react';
import CCopyButton from '../ui/CCopyButton';


const meta: Meta<typeof CCopyButton> = {
  component: CCopyButton,
};

export default meta;
type Story = StoryObj<typeof CCopyButton>;

//👇 Throws a type error it the args don't match the component props
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