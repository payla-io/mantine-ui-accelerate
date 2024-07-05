import type { Meta, StoryObj } from "@storybook/react";
import { CMenu } from "../src/ui/CMenu";
import { ActionIcon, Button } from "@mantine/core";
import React from "react";
import { IconDotsVertical } from "@tabler/icons-react";

const meta: Meta<typeof CMenu> = {
  component: CMenu,
};

export default meta;
type Story = StoryObj<typeof CMenu>;

export const Basic: Story = {
  args: {
    target: <Button>Click me</Button>,
    data: [
      {
        label: "Options",
        items: [
          {
            label: "Option 1",
            onClick: (item) => alert(`Clicked ${item.label}`),
          },
          {
            label: "Option 2",
            onClick: (item) => alert(`Clicked ${item.label}`),
          },
        ],
      },
      {
        label: "Section 2",
        items: [
          {
            label: "Option 1",
            onClick: (item) => alert(`Clicked ${item.label}`),
          },
          {
            label: "Option 2",
            onClick: (item) => alert(`Clicked ${item.label}`),
          },
        ],
      },
    ],
  },
};

export const UseGetTarget: Story = {
  args: {
    getTarget: () => (
      <ActionIcon>
        <IconDotsVertical />
      </ActionIcon>
    ),
    data: [
      {
        items: [
          {
            label: "Option 1",
            onClick: (item) => alert(`Clicked ${item.label}`),
          },
          {
            label: "Option 2",
            onClick: (item) => alert(`Clicked ${item.label}`),
          },
        ],
      },
    ],
  },
};
