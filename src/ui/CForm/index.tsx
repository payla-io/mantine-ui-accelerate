import { UseFormReturnType, useForm, isEmail, isNotEmpty } from "@mantine/form";
import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Flex, Grid, Stack } from "@mantine/core";
import { ICFormField } from "./types";
import CFieldInput from "./CFieldInput";
import { CFormFooter } from "./CFormFooter";
import { validateConditions } from "../../utils/conditions";

export interface CFormProps {
  data: ICFormField[];
  gutter?: string;
  grow?: boolean;
  noFormTag?: boolean;
  currentIndex?: number;
  singleQuestion?: boolean;
  validationRule?: {
    [key: string]: (value: unknown, values: Record<string, unknown>) => any;
  };
  hideSubmit?: boolean;
  submitComponent?: React.ReactNode;
  getSubmitComponent?: (
    formInstance: UseFormReturnType<Record<string, unknown>>
  ) => React.ReactNode;
  submitLabel?: string;
  continueLabel?: string;
  skipLabel?: string;
  fixedFooter?: boolean;
  disableBack?: boolean;
  onSubmit?: (values: { [key: string]: ICFormField["initialValue"] }) => void;
  onContinue?: () => void;
  formContainerProps?: React.ComponentProps<typeof Stack>;
  footerContainerProps?: React.ComponentProps<typeof Box>;
  footerContainerWrapperProps?: React.ComponentProps<typeof Box>;
  submitButtonContainerProps?: React.ComponentProps<typeof Box>;
  submitButtonProps?: React.ComponentProps<typeof Button>;
  backButtonProps?: React.ComponentProps<typeof Button>;
  fullHeight?: boolean;
  isPending?: boolean;
  errorMessages?: Record<string, string>;
  setFormInstance?: (
    formInstance: UseFormReturnType<
      Record<string, unknown>,
      (values: Record<string, unknown>) => Record<string, unknown>
    >
  ) => void;
  onValueChange?: (values: {
    [key: string]: ICFormField["initialValue"];
  }) => void;
}

export function CForm(props: Readonly<CFormProps>) {
  const [currentIndex, setCurrentIndex] = useState(props.currentIndex ?? 0);
  const formRef = useRef<any>(null);

  const getDefaultValues = (field: ICFormField) => {
    if (["select", "multi_select"].includes(field.inputType)) {
      return [];
    } else if (["range"].includes(field.inputType)) {
      return [0, 0];
    } else if (["location"].includes(field.inputType)) {
      return {};
    } else if (field.inputType === "date") {
      if (field.inputProps?.type === "range") return [null, null];
      return null;
    }
    return "";
  };

  const getInitialValues = () => {
    const initialValues: Record<string, unknown> = {};
    props.data.forEach((field) => {
      initialValues[field.name] = field.initialValue ?? getDefaultValues(field);
    });
    return initialValues;
  };

  const getValidations = () => {
    const data: any = {};
    props.data.forEach((field) => {
      data[field.name] = (value: unknown, values: Record<string, unknown>) => {
        const message = isNotEmpty(
          props.errorMessages?.required ?? "This field is required"
        )(value);
        if (field.inputProps.required && message) {
          return message;
        }
        if (field.inputType === "email" && value) {
          return isEmail(props.errorMessages?.invalidEmail ?? "Invalid email")(
            value
          );
        }
        const { isValid, failed } = validateConditions(
          field.valueConditions ?? [],
          values
        );
        if (!isValid) {
          return failed.join(", ");
        }
        if (field.validate) {
          return field.validate(value, values);
        }
        return null;
      };
    });
    return data;
  };

  const fmk = useForm({
    initialValues: getInitialValues(),
    validate: getValidations(),
    validateInputOnChange: true,
  });

  const additionalProps: any = {};

  if (!props.noFormTag) {
    additionalProps.onSubmit = fmk.onSubmit(() => {
      if (props.onSubmit) props.onSubmit(fmk.values);
    });
  }

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleContinue = () => {
    if (currentIndex < props.data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        setCurrentIndex((currentIndex) => {
          const currentData = props.data[currentIndex];
          fmk.validateField(currentData.name);
          if (fmk.isValid(currentData.name)) {
            if (currentIndex < props.data.length - 1) {
              return currentIndex + 1;
            } else if (props.onSubmit) {
              fmk.validate();
              if (fmk.isValid()) formRef.current.requestSubmit();
            }
          }
          return currentIndex;
        });
      }
    });
    if (props.setFormInstance) props.setFormInstance(fmk);
  }, []);

  useEffect(() => {
    if (props.onValueChange) props.onValueChange(fmk.values);
  }, [fmk.values, props.onValueChange]);

  return (
    <Box
      component={props.noFormTag ? "div" : "form"}
      ref={formRef}
      {...additionalProps}
      style={{ height: props.fullHeight ? "95%" : "auto" }}
    >
      <Stack
        gap="md"
        justify="space-between"
        h="100%"
        p="md"
        {...props.formContainerProps}
      >
        <Grid grow={props.grow} gutter={props.gutter ?? 10}>
          {props.data.map((field, index) => {
            const { span, hidden, initialValue, ...fieldInputProps } = field;
            if (hidden || field.inputType === "label") return null;
            const { isValid } = validateConditions(
              field.visibilityConditions ?? [],
              fmk.values ?? {}
            );
            if (!isValid) return null;
            if (props.singleQuestion && currentIndex !== index) return null;
            if (initialValue && !fmk.values[field.name])
              fmk.setFieldValue(field.name, initialValue);
            return (
              <Grid.Col
                key={field.name}
                span={span}
                px={0}
                data-cy={`cform-${
                  fieldInputProps.inputProps?.name ??
                  fieldInputProps.inputProps?.placeholder ??
                  fieldInputProps.inputProps?.label
                }`}
              >
                <CFieldInput formInstance={fmk} {...fieldInputProps} />
              </Grid.Col>
            );
          })}
        </Grid>
        <Flex
          p="xl"
          style={{
            position: props.fixedFooter ? "fixed" : "relative",
            bottom: 0,
            left: 0,
            zIndex: props.fixedFooter ? 9 : 0,
          }}
          justify={"center"}
          w="100%"
          bg="var(--mantine-primary-color-0)"
          {...props.footerContainerWrapperProps}
        >
          <Flex
            w={{ base: "100%", sm: 720 }}
            justify={"right"}
            {...props.footerContainerProps}
          >
            {!props.hideSubmit && (
              <>
                {props.getSubmitComponent ? (
                  props.getSubmitComponent(fmk)
                ) : (
                  <CFormFooter
                    currentIndex={currentIndex}
                    handleContinue={handleContinue}
                    handleBack={handleBack}
                    singleQuestion={props.singleQuestion}
                    data={props.data[currentIndex]}
                    totalQuestions={props.data.length - 1}
                    formInstance={fmk}
                    isPending={props.isPending}
                    submitButtonContainerProps={
                      props.submitButtonContainerProps
                    }
                    containerProps={props.footerContainerProps}
                    submitButtonProps={props.submitButtonProps}
                    backButtonProps={props.backButtonProps}
                    submitLabel={props.submitLabel}
                    continueLabel={props.continueLabel}
                    skipLabel={props.skipLabel}
                    disableBack={props.disableBack}
                  />
                )}
              </>
            )}
          </Flex>
        </Flex>
      </Stack>
    </Box>
  );
}
