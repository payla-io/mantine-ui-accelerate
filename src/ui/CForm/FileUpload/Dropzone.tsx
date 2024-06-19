import { Box, Center, Flex, Group, Stack, Text } from '@mantine/core'
import { Dropzone as MantineDropzone } from '@mantine/dropzone'
import { UseFormReturnType } from '@mantine/form'
import { IconUpload, IconX } from '@tabler/icons-react'
import React from 'react'
import { fileToBase64 } from '../../../utils'


export interface IDropzone {
  form: UseFormReturnType<Record<string, unknown>, (values: Record<string, unknown>) => Record<string, unknown>>
  fileTypes: string[]
  name: string
  error?: string | null
  setError: (error: string | null) => void
  show?: boolean
  fileSizeInfo?: string
  userInstructions?: string
  maxSize?: number
  fileSizeError?: string
  fileFormatError?: string
  placeholder?: string
  noBase64?: boolean
  getDisplayInfo?: () => React.ReactNode
}

type RefType = () => void | undefined

const Dropzone = React.forwardRef<RefType, IDropzone>(
  (props, ref) => {
    return (
      <Stack gap={'xs'} style={{cursor: 'pointer'}}>
      <MantineDropzone
        openRef={ref}
        onDrop={async (files) => {
          props.form.setFieldValue(props.name, !props.noBase64 ? await fileToBase64(files[0]) : files[0])
        }}
        onReject={(files) => {
          props.form.setFieldError(
            props.name,
            files[0].errors[0].message.includes('larger than')
              ? props.fileSizeError ?? 'File is larger than 2GB'
              : props.fileFormatError ?? 'File type not supported',
          )
        }
          
        }
        {...props.form.getInputProps(props.name)}
        maxSize={props.maxSize ?? 2000 * 1024 ** 2}
        accept={props.fileTypes}
        multiple={false}
        styles={{
          root: {
            display: !props.show ? 'none' : 'flex',
            flexShrink: 0,
            minHeight: '150px',
            padding: '16px',
            gap: '16px',
            backgroundColor: "var(--mantine-primary-color-0)",
            borderRadius: '8px',
            border: `1px dashed darkgray`,
          },
          inner: {
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            gap: '6px',
          },
          
        }}
      >
        {props.getDisplayInfo ? props.getDisplayInfo() : (
          <Stack>
        <Text c="dimmed">{props.placeholder}</Text>
        <Group
          gap="sm"
          style={{
            flexWrap: 'nowrap',
          }}
        >
          <Center h="100%">
            <Flex gap="xs">
              <Box>
                <MantineDropzone.Reject>
                  <IconX
                    size="32px"
                    stroke={1.5}
                    color="red"
                  />
                </MantineDropzone.Reject>
                <MantineDropzone.Idle>
                  <IconUpload size="32px" color="gray" />
                </MantineDropzone.Idle>
              </Box>
              <Box>
                <Text c="primary.9" size='xs'>
                  {props.userInstructions ?? "Click to Browse or Drag & Drop file"}
                </Text>
                <Text ff="Lato" fw={400} lh="15.6px" size="12px" c="primary.9">
                  {props.fileSizeInfo ?? "Max file size: 2GB"}
                </Text>
                {props.error && (
                  <Text ff="Lato" fw={400} lh="15.6px" size="12px" c="error.4">
                    {props.error}
                  </Text>
                )}
              </Box>
            </Flex>
          </Center>
        </Group>
        </Stack>
        )}
      </MantineDropzone>

        {!!props.form.errors[props.name] && (
          <Text ff="Lato" fw={400} lh="15.6px" size="12px" c="red">
            {props.form.errors[props.name]}
          </Text>
        )}
      </Stack>
    )
  },
)

Dropzone.displayName = 'Dropzone'

export default Dropzone
