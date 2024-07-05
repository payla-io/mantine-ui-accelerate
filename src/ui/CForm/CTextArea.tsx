import { Textarea, TextareaProps } from "@mantine/core";
import React from "react";

export function CTextArea(props: Readonly<TextareaProps>) {
  return <Textarea autosize minRows={5} {...props} />;
}
