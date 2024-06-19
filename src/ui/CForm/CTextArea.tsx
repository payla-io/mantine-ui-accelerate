import { Textarea, TextareaProps } from "@mantine/core";


export default function CTextArea(props: Readonly<TextareaProps>) {

  return <Textarea autosize minRows={5} {...props} />;
}
