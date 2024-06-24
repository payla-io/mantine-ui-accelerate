import type { Meta, StoryObj } from "@storybook/react";
import { CNavLink } from "../src/ui/CNavLink";
import { IconStar } from "@tabler/icons-react";
import React from "react";

const meta: Meta<typeof CNavLink> = {
  component: CNavLink,
};

export default meta;
type Story = StoryObj<typeof CNavLink>;

export const Basic: Story = {
  args: {
    href: "/",
    label: "Hello, World!",
  },
};

export const WithIcon: Story = {
  args: {
    href: "/",
    label: "Hello, World!",
    leftSection: <IconStar />,
    minimised: true,
    disableTooltip: true,
  },
};
