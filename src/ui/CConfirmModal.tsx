import {
  Modal,
  Container,
  Title,
  Stack,
  Button,
  ButtonProps,
  Flex,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { CForm, CFormProps } from "./CForm";

export interface CConfirmModaProps {
  message: string;
  confirmButtonLabel: string;
  confirmButtonProps?: ButtonProps;
  cancelButtonLabel: string;
  cancelButtonProps?: ButtonProps;
  buttonLabel?: string | React.ReactNode;
  buttonProps?: ButtonProps;
  opened?: boolean;
  formData?: CFormProps["data"];
  onConfirm: (data?: any) => void;
  onCancel?: () => void;
}
export const CConfirmModal = (props: CConfirmModaProps) => {
  const [open, setOpen] = useState(props.opened ?? false);
  const [data, setData] = useState({});
  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(props.opened ?? false);
  }, [props.opened]);

  return (
    <>
      <Modal
        opened={open}
        onClose={closeModal}
        radius="sm"
        size={"lg"}
        centered
      >
        <Container mt="md">
          <Title size={"h4"}>{props.message}</Title>
          <Stack mt="xl" gap="xs">
            {props.formData && (
              <CForm
                data={props.formData}
                noFooter
                onValueChange={(values) => {
                  setData(values);
                }}
              />
            )}
            <Flex gap="sm" justify={"flex-end"} mt="lg">
              <Button
                {...props.cancelButtonProps}
                onClick={() => {
                  closeModal();
                  props.onCancel && props.onCancel();
                }}
                variant="outline"
              >
                {props.cancelButtonLabel}
              </Button>
              <Button
                {...props.confirmButtonProps}
                onClick={() => {
                  closeModal();
                  props.onConfirm(data);
                }}
              >
                {props.confirmButtonLabel}
              </Button>
            </Flex>
          </Stack>
        </Container>
      </Modal>
      {props.buttonLabel && (
        <Button
          {...props.buttonProps}
          onClick={() => {
            setOpen(true);
          }}
        >
          {props.buttonLabel}
        </Button>
      )}
    </>
  );
};
