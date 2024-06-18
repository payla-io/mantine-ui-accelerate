// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from '@storybook/react';

import { CButton } from '../ui/Button';

const meta: Meta<typeof CButton> = {
  component: CButton,
};

export default meta;
type Story = StoryObj<typeof CButton>;

//👇 Throws a type error it the args don't match the component props
export const Primary: Story = {
  args: {
    label: "Primary",
  },
};