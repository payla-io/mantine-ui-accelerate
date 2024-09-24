import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { IconCalendar, IconSearch } from "@tabler/icons-react";
import { CForm } from "../src/ui/CForm";

const meta: Meta<typeof CForm> = {
  component: CForm,
};

export default meta;
type Story = StoryObj<typeof CForm>;

export const Basic: Story = {
  args: {
    data: [
      {
        name: "search",
        inputType: "text",
        inputProps: {
          label: "Search",
          placeholder: "Search by order # or payment reference",
          rightSection: (
            <IconSearch color="var(--mantine-primary-color-filled)" />
          ),
        },
      },
      {
        name: "created",
        inputType: "date",
        inputProps: {
          placeholder: "Order date",
          label: "Order date",
          rightSection: (
            <IconCalendar color="var(--mantine-primary-color-filled)" />
          ),
        },
      },
      {
        name: "merchants",
        inputType: "multi_select",
        inputProps: {
          placeholder: "Merchants",
          label: "Merchants",
          data: [
            { value: "1", label: "Merchant 1" },
            { value: "2", label: "Merchant 2" },
            { value: "3", label: "Merchant 3" },
          ],
        },
      },
      {
        name: "amount",
        inputType: "range",
        initialValue: [0, 0],
        inputProps: {
          label: "Amount",
          minRange: 0,
          min: 0,
          max: 10000,
          step: 100,
        },
      },
      {
        name: "accept_terms",
        inputType: "switch",
        initialValue: false,
        inputProps: {
          label: "Accept terms & conditions",
        },
      },
    ],
  },
};
