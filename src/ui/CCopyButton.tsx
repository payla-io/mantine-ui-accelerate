import { ActionIcon, CopyButton, Tooltip } from "@mantine/core";
import { IconCopy } from "@tabler/icons-react";
import React from "react";

export interface CCopyButtonProps {
  value: string;
  color?: string;
  copiedText: string;
  copyText: string;
}
export function CCopyButton(props: Readonly<CCopyButtonProps>) {
  return (
    <CopyButton value={props.value}>
      {({ copied, copy }) => (
        <Tooltip
          label={
            copied
              ? props.copiedText ?? "Copied"
              : props.copyText ?? "Copy to clipboard"
          }
          color="var(--mantine-primary-color-9)"
          withArrow
        >
          <ActionIcon
            variant="subtle"
            color={
              copied ? "var(--mantine-primary-color-3)" : props.color ?? "gray"
            }
            onClick={copy}
            data-cy="copy-button"
          >
            <IconCopy />
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
}
