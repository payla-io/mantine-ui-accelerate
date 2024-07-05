import type { Meta, StoryObj } from "@storybook/react";
import { CNavigations } from "../src/ui/CNavigations";
import React from "react";
import { IconStar } from "@tabler/icons-react";

const meta: Meta<typeof CNavigations> = {
  component: CNavigations,
};

export default meta;
type Story = StoryObj<typeof CNavigations>;

export const Basic: Story = {
  args: {
    minimisedNav: false,
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
