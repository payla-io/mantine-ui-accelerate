import {
  NavLink,
  NavLinkProps,
  Tooltip,
  createPolymorphicComponent,
} from "@mantine/core";
import { forwardRef } from "react";

export interface CNavlinkProps extends NavLinkProps {
  minimised?: boolean;
  disableTooltip?: boolean;
}

export const CNavLink = createPolymorphicComponent<"a", CNavlinkProps>(
  forwardRef<HTMLAnchorElement, CNavlinkProps>(
    ({ minimised, disableTooltip, ...others }, ref) => {
      const nav = (
        <NavLink {...others} label={minimised ? "" : others.label} ref={ref}>
          {others.children}
        </NavLink>
      );
      if (!disableTooltip && minimised && others.label) {
        return (
          <Tooltip label={others.label} position="right">
            {nav}
          </Tooltip>
        );
      }
      return nav;
    },
  ),
);
