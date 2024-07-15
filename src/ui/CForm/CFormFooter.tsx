import { Button, Flex } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { ICFormField } from "./types";
import { UseFormReturnType } from "@mantine/form";

type ButtonType = "button" | "submit" | "reset" | undefined;
export interface CFormFooterProps {
  singleQuestion?: boolean;
  currentIndex: number;
  data: ICFormField;
  totalQuestions: number;
  formInstance: UseFormReturnType<
    Record<string, unknown>,
    (values: Record<string, unknown>) => Record<string, unknown>
  >;
  isPending?: boolean;
  backLabel?: string;
  submitLabel?: string;
  continueLabel?: string;
  skipLabel?: string;
  noFooter?: boolean;
  disableBack?: boolean;
  containerProps?: React.ComponentProps<typeof Flex>;
  backButtonProps?: React.ComponentProps<typeof Button>;
  submitButtonProps?: React.ComponentProps<typeof Button>;
  submitButtonContainerProps?: React.ComponentProps<typeof Flex>;
  skipButtonProps?: React.ComponentProps<typeof Button>;
  handleContinue: () => void;
  handleBack: () => void;
}

export function CFormFooter(props: Readonly<CFormFooterProps>) {
  const [buttonType, setButtonType] = useState<ButtonType>("submit");
  const formName = props.data.name;
  const lastQuestion =
    props.currentIndex === props.totalQuestions || !props.singleQuestion;

  useEffect(() => {
    if (lastQuestion) {
      setTimeout(() => {
        setButtonType("submit");
      }, 500);
    } else {
      setButtonType("button");
    }
  }, [lastQuestion]);
  if (props.noFooter) return null;
  return (
    <Flex justify={"right"} w="100%" gap={"xs"} {...props.containerProps}>
      {props.singleQuestion && props.currentIndex > 0 && !props.disableBack && (
        <Button
          onClick={() => {
            props.handleBack();
            setButtonType("button");
          }}
          type="button"
          {...props.backButtonProps}
        >
          {props.backLabel ?? "Back"}
        </Button>
      )}
      <Flex justify={"right"} {...props.submitButtonContainerProps}>
        {props.singleQuestion && !props.data.inputProps.required && (
          <Button
            variant="subtle"
            onClick={() => {
              props.handleContinue();
            }}
            mr="sm"
            {...props.skipButtonProps}
          >
            {props.backLabel ?? "Skip"}
          </Button>
        )}
        <Button
          onClick={() => {
            if (props.singleQuestion) {
              props.formInstance.validateField(formName);
              if (
                props.formInstance.isValid(formName) ||
                props.data.inputType === "label"
              ) {
                props.handleContinue();
              }
            }
          }}
          type={!props.singleQuestion ? "submit" : buttonType}
          loading={props.isPending}
          {...props.submitButtonProps}
        >
          {!props.singleQuestion || lastQuestion
            ? props.submitLabel ?? "Save"
            : props.continueLabel ?? "Continue"}
        </Button>
      </Flex>
    </Flex>
  );
}
