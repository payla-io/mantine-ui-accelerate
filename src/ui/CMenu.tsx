import { Button, Menu } from "@mantine/core";
import React from "react";

interface IMenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: (item: IMenuItem) => void;
  hidden?: boolean;
}
interface IData {
  label?: string;
  hidden?: boolean;
  dividerAfter?: boolean;
  items?: IMenuItem[];
}
interface CMenuProps {
  data: IData[];
  target?: React.ReactNode;
  getTarget?: (item: IMenuItem | undefined) => React.ReactNode;
  targetLabel?: string;
  menuProps?: React.ComponentProps<typeof Menu>;
}

export default function CMenu(props: Readonly<CMenuProps>) {
  const [selected, setSelected] = React.useState<IMenuItem | undefined>(
    undefined,
  );
  const getTarget = () => {
    if (props.getTarget) {
      return props.getTarget(selected);
    }
    return props.target ?? <Button>{props.targetLabel}</Button>;
  };
  return (
    <Menu shadow="md" width={200} {...props.menuProps}>
      <Menu.Target>{getTarget()}</Menu.Target>

      <Menu.Dropdown>
        {props.data.map((item, index) => {
          if (item.hidden) return null;
          return (
            <React.Fragment key={index}>
              {item.label && <Menu.Label>{item.label}</Menu.Label>}
              {item.items?.map((subItem) => {
                if (subItem.hidden) return null;
                return (
                  <Menu.Item
                    key={subItem.label}
                    onClick={() => {
                      if (subItem.onClick) subItem.onClick(subItem);
                      setSelected(subItem);
                    }}
                    leftSection={subItem.icon}
                    disabled={subItem.onClick === undefined}
                  >
                    {subItem.label}
                  </Menu.Item>
                );
              })}
              {item.dividerAfter && <Menu.Divider />}
            </React.Fragment>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
}
