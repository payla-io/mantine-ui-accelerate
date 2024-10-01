import {
  NavLink,
  NavLinkProps,
  Tooltip,
  createPolymorphicComponent,
} from "@mantine/core";
import { forwardRef, useCallback } from "react";
import { CNavigationsLink } from "./CNavigations";
import { CPopoverOptions } from "./CPopoverOptions";
import { useDisclosure, useDebouncedValue } from "@mantine/hooks";

export interface CNavlinkProps extends NavLinkProps {
  minimised?: boolean;
  disableTooltip?: boolean;
  component?: any;
  links?: CNavigationsLink[];
}

export const CNavLink = createPolymorphicComponent<"a", CNavlinkProps>(
  forwardRef<HTMLAnchorElement, CNavlinkProps>(
    ({ minimised, disableTooltip, ...others }, ref) => {
      const [opened, { close, open }] = useDisclosure(false);
      const [debouncedOpened] = useDebouncedValue(opened, 50);

      const handleMouseEnter = useCallback(() => {
        open();
      }, [open]);

      const handleMouseLeave = useCallback(() => {
        close();
      }, [close]);

      const nav = (
        <NavLink {...others} label={minimised ? "" : others.label} ref={ref}>
          {others.children}
        </NavLink>
      );

      if (!!others.links?.length && minimised) {
        return (
          <CPopoverOptions
            options={others.links}
            trigger={
              <NavLink
                {...others}
                label={minimised ? "" : others.label}
                href="#"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {others.children}
              </NavLink>
            }
            renderItem={(item) => {
              return (
                <NavLink
                  component={others.component ?? "a"}
                  label={item.label}
                  href={item.href}
                  to={item.to}
                  leftSection={item.icon}
                  onClick={item.onClick}
                />
              );
            }}
            popoverProps={{
              position: "right-start",
              trapFocus: true,
              opened: debouncedOpened,
            }}
            dropdownProps={{
              onMouseEnter: handleMouseEnter,
              onMouseLeave: handleMouseLeave,
            }}
          />
        );
      }
      if (!disableTooltip && minimised && others.label) {
        return (
          <Tooltip label={others.label} position="right">
            {nav}
          </Tooltip>
        );
      }
      return nav;
    }
  )
);
