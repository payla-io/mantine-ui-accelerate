import { TextInput, TextInputProps } from "@mantine/core";
import InputMask from "react-input-mask";

interface CTextInputProps extends TextInputProps {
  mask?: string;
}

export default function CTextInput(props: Readonly<CTextInputProps>) {
  if (props.mask) {
    return <TextInput {...props} component={InputMask} />;
  }
  return <TextInput {...props} />;
}
