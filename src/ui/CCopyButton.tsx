import { ActionIcon, CopyButton, Tooltip } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";

export interface CCopyButtonProps {
  value: string;
  copiedColor?: string;
  copyColor?: string;
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
              copied
                ? props.copiedColor ?? "var(--mantine-primary-color-3)"
                : props.copyColor ?? "gray"
            }
            onClick={copy}
            data-cy="copy-button"
          >
            {copied ? <IconCheck /> : <IconCopy />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
}
