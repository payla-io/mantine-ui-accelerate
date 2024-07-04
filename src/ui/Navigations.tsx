import { Box, Stack, ActionIcon } from "@mantine/core";
import { IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { CNavLink } from "./CNavLink";
import React from "react";

interface INav {
  label: string;
  icon?: JSX.Element;
  href: string;
  onClick?: () => void;
  hidden?: boolean;
  children?: INav[];
}

interface NavigationsProps {
  setMinimisedNav?: (minimised: boolean) => void;
  minimisedNav?: boolean;
  links: INav[];
  component?: any;
}

export default function Navigations(props: Readonly<NavigationsProps>) {
  const renderNav = (nav: INav, index: number) => {
    if (nav.hidden) return null;
    const isActive = nav.children?.length
      ? window.location.pathname.includes(nav.href)
      : window.location.pathname === nav.href;
    return (
      <CNavLink
        to={nav.href}
        onClick={nav.onClick}
        key={index}
        label={nav.label}
        leftSection={nav.icon}
        childrenOffset={28}
        component={props.component ?? "a"}
        minimised={props.minimisedNav}
        active={isActive}
      >
        {nav.children &&
          !props.minimisedNav &&
          nav.children.map((child, i) => renderNav(child, i))}
      </CNavLink>
    );
  };

  return (
    <>
      {props.setMinimisedNav && (
        <Box style={{ position: "relative" }} visibleFrom="sm" my="xl">
          <ActionIcon
            variant="default"
            size={"sm"}
            style={{ position: "absolute", right: -25, top: -40 }}
            onClick={() => {
              if (props.setMinimisedNav)
                props.setMinimisedNav(!props.minimisedNav);
            }}
          >
            {props.minimisedNav ? (
              <IconChevronsRight size="1rem" />
            ) : (
              <IconChevronsLeft size="1rem" />
            )}
          </ActionIcon>
        </Box>
      )}
      <Stack gap="xs">
        {props.links.map((nav, index) => renderNav(nav, index))}
      </Stack>
    </>
  );
}
