import { Box } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'

import { MIME_TYPES } from "@mantine/dropzone";
import Dropzone, { IDropzone } from './Dropzone'
import { useEffect, useRef, useState } from 'react'
import UploadedFile from './UploadedFile'


export const MIME_TYPE_MAP = {
  audio: ['audio/mpeg'],
  video: [MIME_TYPES.mp4, 'video/quicktime'],
  file: [MIME_TYPES.pdf],
  image: [MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.svg, MIME_TYPES.gif],
  all: [MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.svg, MIME_TYPES.gif, MIME_TYPES.mp4, 'video/quicktime', 'audio/mpeg', MIME_TYPES.pdf],
}

interface FileUploadProps {
  fileTypes?: string[]
  name: string
  form: UseFormReturnType<Record<string, unknown>, (values: Record<string, unknown>) => Record<string, unknown>>
  dropzoneProps?: IDropzone
  getDisplayInfo?: () => React.ReactNode
}

const FileUpload = ({
  fileTypes,
  name,
  form,
  dropzoneProps,
  getDisplayInfo,
}: FileUploadProps) => {
  const openRef = useRef<() => void>(null)
  const [error, setError] = useState<string | null>(null)

  const handleRemoveImage = () => {
    form.setFieldValue(name, '')
  }
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }, [error])

  const openSelect = () => openRef.current && openRef.current()

  const file = form.values[name]
  const isFile = file instanceof File
  const imageUrl = isFile ? URL.createObjectURL(file) : file

  return (
    <Box>
       {!!imageUrl && <UploadedFile 
          file={file} 
          componentType="image" 
          handleRemoveImage={handleRemoveImage} 
          openSelect={openSelect}
          error={error}
        />}
      <Dropzone
        setError={setError}
        getDisplayInfo={getDisplayInfo}  
        error={error}
        form={form}
        fileTypes={fileTypes ?? MIME_TYPE_MAP.all}
        name={name}
        ref={openRef}
        show={!imageUrl}
        {...dropzoneProps}
      />
    </Box>
  )
}

export default FileUpload
