import type { Meta, StoryObj } from "@storybook/react";
import { CLinkList } from "../src/ui/CLinkList";

const meta: Meta<typeof CLinkList> = {
  component: CLinkList,
};

export default meta;
type Story = StoryObj<typeof CLinkList>;

export const Default: Story = {
  args: {
    items: [
      { label: "Home", href: "#/" },
      { label: "About", href: "#/about" },
      { label: "Contact", href: "#/contact" },
    ],
  },
};

export const Vertical: Story = {
  args: {
    items: [
      { label: "Home", href: "#/" },
      { label: "About", href: "#/about" },
      { label: "Contact", href: "#/contact" },
    ],
    containerProps: {
      direction: "column",
    },
  },
};

export const GlobalStyle: Story = {
  args: {
    items: [
      { label: "Home", href: "#/" },
      { label: "About", href: "#/about" },
      { label: "Contact", href: "#/contact" },
    ],
    containerProps: {
      direction: "column",
    },
    style: {
      color: "red",
    },
  },
};

export const ItemStyle: Story = {
  args: {
    items: [
      { label: "Home", href: "#/" },
      { label: "About", href: "#/about", style: { color: "blue" } },
      { label: "Contact", href: "#/contact", style: { color: "green" } },
    ],
    containerProps: {
      direction: "column",
    },
    style: {
      color: "red",
    },
  },
};

export const OnItemClick: Story = {
  args: {
    items: [
      { label: "Home", onClick: () => alert("Home clicked") },
      {
        label: "About",
        href: "#/about",
        onClick: () => alert("About clicked"),
      },
      { label: "Contact", href: "#/contact" },
    ],
    containerProps: {
      direction: "column",
    },
  },
};
