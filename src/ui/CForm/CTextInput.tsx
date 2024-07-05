import { TextInput, TextInputProps } from "@mantine/core";
import InputMask from "react-input-mask";
import React from "react";

export interface CTextInputProps extends TextInputProps {
  mask?: string;
}

export function CTextInput(props: Readonly<CTextInputProps>) {
  if (props.mask) {
    return <TextInput {...props} component={InputMask} />;
  }
  return <TextInput {...props} />;
}
