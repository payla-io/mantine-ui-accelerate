import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { IconCalendar } from "@tabler/icons-react";
import CSearchFilterHeaderTest from "./CSearchFilterHeaderTest";

const meta: Meta<typeof CSearchFilterHeaderTest> = {
  component: CSearchFilterHeaderTest,
};

export default meta;
type Story = StoryObj<typeof CSearchFilterHeaderTest>;

export const Basic: Story = {
  args: {
    formProps: {
      data: [
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
          name: "status",
          inputType: "multi_select",
          initialValue: [],
          inputProps: {
            label: "Status",
            data: [
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ],
          },
        },
        {
          name: "booking_date",
          inputType: "date",
          inputProps: {
            placeholder: "Booking date",
            label: "Booking date",
            type: "range",
            rightSection: (
              <IconCalendar color="var(--mantine-primary-color-filled)" />
            ),
          },
        },
        {
          name: "created",
          inputType: "date",
          inputProps: {
            placeholder: "created",
            label: "created",
            type: "range",
            rightSection: (
              <IconCalendar color="var(--mantine-primary-color-filled)" />
            ),
          },
        },
      ],
    },
  },
};
