import type { Meta, StoryObj } from "@storybook/react";
import { CPopoverOptions } from "../src/ui/CPopoverOptions";
import React from "react";
import { IconStar } from "@tabler/icons-react";
import { Box } from "@mantine/core";

const meta: Meta<typeof CPopoverOptions> = {
  component: CPopoverOptions,
};

export default meta;
type Story = StoryObj<typeof CPopoverOptions>;

export const Basic: Story = {
  args: {
    title: "Title",
    options: [
      {
        label: "label",
        value: "value",
      },
      {
        label: "label",
        value: "value 2",
      },
    ],
  },
};

export const MoreCustomization: Story = {
  args: {
    title: "Customized Title",
    trigger: <IconStar style={{ cursor: "pointer" }} />,
    renderItem: (option, onSelect, isSelected) => {
      return (
        <Box
          style={{
            padding: "10px",
            backgroundColor: isSelected ? "lightblue" : "white",
            cursor: "pointer",
          }}
          onClick={() => onSelect(option)}
        >
          {option.label}
        </Box>
      );
    },
    options: [
      {
        label: "label",
        value: "value",
      },
      {
        label: "label",
        value: "value 2",
      },
    ],
  },
};
