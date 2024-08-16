import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import React from "react";

export interface CChevronToggleProps {
  active?: boolean;
  onClick?: (state: boolean) => void;
  size?: string;
}

export default function CChevronToggle(props: Readonly<CChevronToggleProps>) {
  const [active, setActive] = React.useState(props.active ?? false);

  const toggle = () => {
    props.onClick && props.onClick(active);
    setActive(!active);
  };

  React.useEffect(() => {
    setActive(props.active ?? false);
  }, [props.active]);

  return !active ? (
    <IconChevronRight onClick={toggle} size={props.size ?? "1rem"} />
  ) : (
    <IconChevronDown onClick={toggle} size={props.size ?? "1rem"} />
  );
}
