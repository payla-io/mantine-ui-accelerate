import { Box } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

import { MIME_TYPES } from "@mantine/dropzone";
import { CDropzone, CDropzoneProps } from "./CDropzone";
import React, { useEffect, useRef, useState } from "react";
import { CUploadedFile } from "./CUploadedFile";

export const MIME_TYPE_MAP = {
  audio: ["audio/mpeg"],
  video: [MIME_TYPES.mp4, "video/quicktime"],
  file: [MIME_TYPES.pdf],
  image: [MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.svg, MIME_TYPES.gif],
  all: [
    MIME_TYPES.png,
    MIME_TYPES.jpeg,
    MIME_TYPES.svg,
    MIME_TYPES.gif,
    MIME_TYPES.mp4,
    "video/quicktime",
    "audio/mpeg",
    MIME_TYPES.pdf,
  ],
};

export interface CFileUploadProps {
  fileTypes?: string[];
  name: string;
  form: UseFormReturnType<
    Record<string, unknown>,
    (values: Record<string, unknown>) => Record<string, unknown>
  >;
  dropzoneProps?: CDropzoneProps;
  getDisplayInfo?: () => React.ReactNode;
  componentType?: string;
}

export const CFileUpload = ({
  fileTypes,
  name,
  form,
  dropzoneProps,
  getDisplayInfo,
  componentType,
}: CFileUploadProps) => {
  const openRef = useRef<() => void>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRemoveImage = () => {
    form.setFieldValue(name, "");
  };
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  }, [error]);

  const openSelect = () => openRef.current && openRef.current();

  const file = form.values[name];
  const isFile = file instanceof File;
  const imageUrl = isFile ? URL.createObjectURL(file) : file;

  return (
    <Box>
      {!!imageUrl && (
        <CUploadedFile
          file={file}
          componentType={componentType ?? "image"}
          handleRemoveImage={handleRemoveImage}
          openSelect={openSelect}
          error={error}
        />
      )}
      <CDropzone
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
  );
};
