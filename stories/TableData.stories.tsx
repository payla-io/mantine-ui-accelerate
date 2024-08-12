import type { Meta, StoryObj } from "@storybook/react";
import { TableData } from "../src/ui/TableData";
import React from "react";
import { Button, Input } from "@mantine/core";

const meta: Meta<typeof TableData> = {
  component: TableData,
};

export default meta;
type Story = StoryObj<typeof TableData>;

export const Basic: Story = {
  args: {
    data: [
      {
        name: "name 1",
        description: "description 1",
        status: "success",
        amount: 10,
      },
      {
        name: "name 2",
        description: "description 2",
        status: "failed",
        amount: 50,
      },
      {
        name: "name 3",
        description: "description 3",
        status: "pending",
        amount: 100,
      },
    ],
    columns: [
      {
        fieldName: "name",
        label: "Name",
        sorting: "string",
      },
      {
        fieldName: "description",
        label: "Description",
        sorting: "string",
      },
      {
        fieldName: "status",
        label: "Status",
        sorting: "string",
      },
      {
        fieldName: "amount",
        label: "Amount",
        sorting: "number",
      },
    ],
  },
};

export const EnableVisibility: Story = {
  args: {
    data: [
      {
        name: "name 1",
        description: "description 1",
        status: "success",
        amount: 10,
      },
      {
        name: "name 2",
        description: "description 2",
        status: "failed",
        amount: 50,
      },
      {
        name: "name 3",
        description: "description 3",
        status: "pending",
        amount: 100,
      },
    ],
    columns: [
      {
        fieldName: "name",
        label: "Name",
        sorting: "string",
      },
      {
        fieldName: "description",
        label: "Description",
        sorting: "string",
      },
      {
        fieldName: "status",
        label: "Status",
        sorting: "string",
      },
      {
        fieldName: "amount",
        label: "Amount",
        sorting: "number",
      },
      {
        label: <Input placeholder="Search" />,
        renderValue: (item) => {
          return <Button>Click</Button>;
        },
      },
    ],
    enableColumnVisibility: true,
    flagSelectedRow: true,
    onRowClick: (item) => {},
    isItemSelected: (item, selectedItem) => item?.name === selectedItem?.name,
  },
};
