import type { Meta, StoryObj } from "@storybook/react";
import { CTableData } from "../src/ui/CTableData";
import React from "react";
import { Button, Card, Input } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

const meta: Meta<typeof CTableData> = {
  component: CTableData,
};

export default meta;
type Story = StoryObj<typeof CTableData>;

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
    defaultOrderBy: {
      column: { fieldName: "name", label: "Name", sorting: "string" },
      direction: "desc",
    },
  },
};

export const WithCustomSortingIndicator: Story = {
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
        sorting: false,
      },
      {
        fieldName: "amount",
        label: "Amount",
        sorting: "number",
      },
    ],
    defaultOrderBy: {
      column: { fieldName: "name", label: "Name", sorting: "string" },
      direction: "desc",
    },
    ascSortIndicator: <IconChevronUp size={"1rem"} />,
    decSortIndicator: <IconChevronDown size={"1rem"} />,
  },
};

export const EnableVisibility: Story = {
  args: {
    withHeaderBorderBottom: true,
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
    singleRowToggle: true,
    paginationSize: 2,
    tableProps: {
      striped: true,
    },
    onRowClick: (item) => {},
    isItemSelected: (item, selectedItem) => item?.name === selectedItem?.name,
    getCollapsibleContent: (item) => {
      return <Card shadow="xs">{item.name}</Card>;
    },
  },
};
