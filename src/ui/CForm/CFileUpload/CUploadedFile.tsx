import { Box, Button, Flex, Image, Stack, Text } from "@mantine/core";
import {
  IconDeviceAudioTape,
  IconFile,
  IconFileTypePdf,
  IconVideo,
} from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import { fileToBase64 } from "../../../utils";

export interface CUploadedFileProps {
  handleRemoveImage: () => void;
  componentType: string;
  file: any;
  openSelect: () => void | null;
  label?: string | null;
  error?: string | null;
  changeButtonLabel?: string;
  removeButtonLabel?: string;
}

export const CUploadedFile: FC<CUploadedFileProps> = ({
  componentType,
  file,
  handleRemoveImage,
  openSelect,
  error,
  label = "",
  changeButtonLabel = "Change",
  removeButtonLabel = "Remove",
}) => {
  const isFile = file instanceof File;

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isImage, setIsImage] = useState<boolean>(false);

  useEffect(() => {
    const getImageUrl = async () => {
      if (isFile) {
        const base64File = await fileToBase64(file);
        setImageUrl(base64File);
        setIsImage(base64File?.toString().includes("data:image") ?? false);
      } else {
        setImageUrl(file);
        setIsImage(file?.toString().includes("data:image"));
      }
    };

    getImageUrl();
  }, [file, isFile]);
  const getIcon = () => {
    switch (componentType) {
      case "pdfOrImage": {
        return <IconFileTypePdf color={"var(--mantine-color-red-5)"} />;
      }
      case "file": {
        return <IconFile />;
      }
      case "video": {
        return <IconVideo />;
      }
      case "audio": {
        return <IconDeviceAudioTape />;
      }
      default: {
        return <IconFile />;
      }
    }
  };

  return (
    <Flex direction="column">
      <Stack gap="sm">
        {(componentType === "image" || componentType === "pdfOrImage") &&
        isImage ? (
          <Stack align="center">
            <Box>
              <Image
                height={100}
                fit="contain"
                alt="file upload preview"
                src={imageUrl as string}
              />
            </Box>
          </Stack>
        ) : (
          <Stack align="center">
            {getIcon()}
            <Text
              ff="Lato"
              fw={400}
              lh="15.6px"
              size="12px"
              c="primary.9"
              ta="center"
            >
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
      <Flex gap="lg" mt={"xl"} justify={"center"}>
        <Button variant="subtle" fw={400} onClick={openSelect}>
          {changeButtonLabel}
        </Button>
        <Button variant="subtle" fw={400} c="red.5" onClick={handleRemoveImage}>
          {removeButtonLabel}
        </Button>
      </Flex>
    </Flex>
  );
};
