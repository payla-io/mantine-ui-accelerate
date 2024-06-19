// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from '@storybook/react';
import CDrawer from '../ui/CDrawer';
import React from 'react';


const meta: Meta<typeof CDrawer> = {
  component: CDrawer,
};

export default meta;
type Story = StoryObj<typeof CDrawer>;

//👇 Throws a type error it the args don't match the component props
export const Default: Story = {
  args: {
    anchorLabel: "Open Drawer",
    children: "Drawer Content",
    bg: "white",
    title: "Drawer Title",
    drawerProps: {
      styles: {
        header: { backgroundColor: "red", color: "white" },
      }
    }
  },
};

//👇 Throws a type error it the args don't match the component props
export const PassingHeaderMethod: Story = {
  args: {
    anchorLabel: "Open Drawer",
    children: "Drawer Content",
    bg: "white",
    drawerProps: {
      withCloseButton: false
    },
    getHeader: (close) => ( 
      <div style={{background: "blue", padding: 10}}>
        <button onClick={close}>Close</button>
      </div>
    ),
  },
};
