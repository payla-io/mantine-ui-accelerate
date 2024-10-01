import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { IconStar } from "@tabler/icons-react";
import CNavigationTest from "./CNavigationTest";

const meta: Meta<typeof CNavigationTest> = {
  component: CNavigationTest,
};

export default meta;
type Story = StoryObj<typeof CNavigationTest>;

export const Basic: Story = {
  args: {
    links: [
      {
        label: "label 1",
        href: "#",
        icon: <IconStar />,
        onClick: () => {
          alert("clicked label 1");
        },
      },
      {
        label: "label 2",
        href: "#",
        icon: <IconStar />,
        children: [
          {
            label: "label 2",
            href: "#",
            icon: <IconStar />,
            onClick: () => {
              alert("clicked label 1");
            },
          },
          {
            label: "label 2",
            href: "#",
            icon: <IconStar />,
            onClick: () => {
              alert("clicked label 2");
            },
          },
        ],
      },
      {
        label: "label 2",
        href: "#",
        icon: <IconStar />,
        children: [
          {
            label: "label 2",
            href: "#",
            icon: <IconStar />,
            children: [
              {
                label: "label 2",
                href: "#",
                icon: <IconStar />,
                onClick: () => {
                  alert("clicked label 1");
                },
              },
              {
                label: "label 2",
                href: "#",
                icon: <IconStar />,
                onClick: () => {
                  alert("clicked label 2");
                },
              },
            ],
          },
          {
            label: "label 2",
            href: "#",
            icon: <IconStar />,
            onClick: () => {
              alert("clicked label 2");
            },
          },
        ],
      },
    ],
  },
};
