import { ActionIcon, CopyButton, Tooltip } from '@mantine/core'
import { IconCopy } from '@tabler/icons-react'
import React from 'react'

interface CCopyButtonProps {
    value: string
    color?: string
    copiedText: string
    copyText: string
}
export default function CCopyButton(props: Readonly<CCopyButtonProps>) {

  return (
      <CopyButton value={props.value}>
          {({ copied, copy }) => (
            <Tooltip label={copied ? props.copiedText : props.copyText} color="var(--mantine-primary-color-9)" withArrow>
              <ActionIcon variant="subtle" color={copied ? 'var(--mantine-primary-color-3)' : props.color ?? 'gray'} onClick={copy} data-cy="copy-button">
                  <IconCopy />
              </ActionIcon>
            </Tooltip>
          )}
      </CopyButton>
  )
}
