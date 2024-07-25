import { Textarea, TextareaProps } from "@mantine/core";

export function CTextArea(props: Readonly<TextareaProps>) {
  return <Textarea autosize minRows={5} {...props} />;
}
