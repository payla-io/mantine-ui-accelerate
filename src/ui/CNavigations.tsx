import { Box, Stack, ActionIcon } from "@mantine/core";
import { IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react";
import { CNavLink } from "./CNavLink";
import React from "react";

export interface CNavigationsLink {
  label: string;
  icon?: JSX.Element;
  href: string;
  onClick?: () => void;
  hidden?: boolean;
  children?: CNavigationsLink[];
}

export interface CNavigationsProps {
  setMinimisedNav?: (minimised: boolean) => void;
  minimisedNav?: boolean;
  links: CNavigationsLink[];
  component?: any;
}

export function CNavigations(props: Readonly<CNavigationsProps>) {
  const renderNav = (nav: CNavigationsLink, index: number) => {
    const { children, ...rest } = nav;
    if (nav.hidden) return null;
    const isActive = nav.children?.length
      ? window.location.pathname.includes(nav.href)
      : window.location.pathname === nav.href;
    return (
      <CNavLink
        key={index}
        leftSection={nav.icon}
        childrenOffset={28}
        component={props.component ?? "a"}
        minimised={props.minimisedNav}
        active={isActive}
        {...rest}
      >
        {children &&
          !props.minimisedNav &&
          children.map((child, i) => renderNav(child, i))}
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
