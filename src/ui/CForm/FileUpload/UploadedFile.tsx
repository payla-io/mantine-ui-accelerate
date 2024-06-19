import { Image, Text, Box, Flex, Button, Stack } from '@mantine/core'
import { IconDeviceAudioTape, IconFile, IconPdf, IconVideo } from '@tabler/icons-react'

import { FC } from 'react'

interface IUploadedFile {
  handleRemoveImage: () => void
  componentType: string
  file: any
  openSelect: () => void | null
  label?: string | null
  error?: string | null
  changeButtonLabel?: string
  removeButtonLabel?: string
}

const UploadedFile: FC<IUploadedFile> = ({
  componentType,
  file,
  handleRemoveImage,
  openSelect,
  error,
  label = '',
  changeButtonLabel = 'Change',
  removeButtonLabel = 'Remove',
}) => {
  const isFile = file instanceof File
  const imageUrl = isFile ? URL.createObjectURL(file) : file
  const getIcon = () => {
    switch (componentType) {
      case 'file': {
        return <IconPdf />
      }
      case 'video': {
        return <IconVideo />
      }
      case 'audio': {
        return <IconDeviceAudioTape />
      }
      default: {
        return <IconFile />
      }
    }
  }

  return (
    <Flex direction="column">
      <Stack gap="sm">
        {componentType === 'image' ? (
          <Stack align='center'>
            <Box>
              <Image
                height={100}
                fit='contain'
                alt="file upload preview"
                src={imageUrl as string}
              />
            </Box>
          </Stack>
        ) : (
          <Stack align='center'>
            {getIcon()}
            <Text ff="Lato" fw={400} lh="15.6px" size="12px" c="primary.9" ta="center">
              {isFile && file?.name ? file?.name : label}
            </Text>
          </Stack>
        )}
        {error && (
          <Text ff="Lato" fw={400} size="12px" c="error.4" m="md">
            {error}
          </Text>
        )}
      </Stack>
      <Flex gap="lg" mt={'xl'} justify={'center'}>
        <Button
          variant="subtle"
          fw={400}
          onClick={openSelect}
        >
          {changeButtonLabel}
        </Button>
        <Button
          variant="subtle"
          fw={400}
          c="red.5"
          onClick={handleRemoveImage}
        >
          {removeButtonLabel}
        </Button>
      </Flex>
    </Flex>
  )
}

export default UploadedFile
