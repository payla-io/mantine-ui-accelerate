import { ActionIcon, DrawerProps, Flex, Stack, Title } from "@mantine/core";
import { IconFilter, IconRefresh, IconXboxX } from "@tabler/icons-react";
import { ICFormField } from "./CForm/types";
import React, { useState } from "react";
import { UseFormReturnType } from "@mantine/form";
import { CSearchInput, CSearchInputProps } from "./CForm/CSearchInput";
import { CFormProps, CForm } from "./CForm";
import { IFilterItem, useFilters } from "../hooks/useFilters";
import { CDrawer } from "./CDrawer";
import { CItem } from "./CItem";
import { CFilterOptions } from "./CFilterOptions";

export interface CSearchFilterHeaderProps {
  title?: string;
  titleProps?: React.ComponentProps<typeof Title>;
  searchProps?: CSearchInputProps;
  hideSearch?: boolean;
  hideFilter?: boolean;
  rightSection?: React.ReactNode;
  drawerTrigger?: React.ReactNode | string;
  formProps?: CFormProps;
  onFormSubmit?: CFormProps["onSubmit"];
  drawerTitle?: DrawerProps["title"];
  drawerTitleProps?: React.ComponentProps<typeof Title>;
  drawerColor?: string;
  drawerBackgroundColor?: string;
  enableRefresh?: boolean;
  rangeFields?: string[];
  getFilterLabel?: (name: string, value: string) => string;
  getStateFilters: () => Record<string, IFilterItem>;
  setStateFilters: (filters: Record<string, IFilterItem>) => void;
  formatDate?: (date: Date) => string;
  updateFilterOnlyOnSubmit?: boolean;
}

export function CSearchFilterHeader(props: Readonly<CSearchFilterHeaderProps>) {
  const { selected, setSelectedFilter, refreshFilters, getFilterItems } =
    useFilters({
      formatDate: props.formatDate,
      setSelected: props.setStateFilters,
      getSelected: props.getStateFilters,
    });
  const [fmk, setFmk] =
    useState<
      UseFormReturnType<
        Record<string, unknown>,
        (values: Record<string, unknown>) => Record<string, unknown>
      >
    >();
  const handleValueChange = (values: {
    [key: string]: ICFormField["initialValue"];
  }) => {
    props.formProps?.data?.forEach((field) => {
      if (field.name in values) {
        const filter: IFilterItem = {
          name: field.name,
          label: field.inputProps?.label ?? field.name,
          value: values[field.name],
        };
        setSelectedFilter(field.name, filter);
      }
    });
  };

  const handleSubmit = (values: {
    [key: string]: ICFormField["initialValue"];
  }) => {
    if (props.updateFilterOnlyOnSubmit) {
      handleValueChange(values);
    }
    props.onFormSubmit?.(values);
  };

  const parseValue = (value: unknown) => {
    if (value instanceof Array) {
      return value.map((v) => {
        if (typeof v === "string") {
          if (new Date(v).toString() === "Invalid Date") {
            return v;
          } else {
            return new Date(v);
          }
        }
        return v;
      });
    } else {
      if (typeof value === "string") {
        if (new Date(value).toString() === "Invalid Date") {
          return value;
        } else {
          return new Date(value);
        }
      }
      return value;
    }
  };

  const getFormInitialValues = (): ICFormField[] => {
    return (
      props.formProps?.data?.map((field: ICFormField) => {
        return {
          ...field,
          initialValue: parseValue(
            selected[field.name]?.value ?? field.initialValue
          ),
        };
      }) ?? []
    );
  };

  const getHeader = (close: () => void) => {
    return (
      <Flex
        justify={"space-between"}
        align={"center"}
        c={"var(--mantine-primary-color-filled)"}
      >
        {props.drawerTitle && (
          <Title size="xl" {...props.drawerTitleProps}>
            {props.drawerTitle}
          </Title>
        )}
        <Flex gap="sm">
          {props.enableRefresh && (
            <ActionIcon
              onClick={() => {
                fmk?.reset();
                if (fmk?.values) fmk.values.search = "";
                refreshFilters();
              }}
              size="1.3rem"
              variant="subtle"
            >
              <IconRefresh />
            </ActionIcon>
          )}
          <ActionIcon onClick={close} size="1.3rem" variant="subtle">
            <IconXboxX />
          </ActionIcon>
        </Flex>
      </Flex>
    );
  };

  return (
    <Stack gap="md">
      <Flex justify={"space-between"} gap={"sm"} align={"center"}>
        {props.title && (
          <Title size="18px" {...props.titleProps}>
            {props.title}
          </Title>
        )}
        {!props.hideSearch && (
          <CSearchInput
            onChange={(value) => {
              setSelectedFilter("search", {
                name: "search",
                label: "search",
                value,
              });
            }}
            value={selected.search?.value ?? ""}
            {...props.searchProps}
          />
        )}

        {!props.hideFilter && (
          <CDrawer
            bg={props.drawerBackgroundColor}
            drawerProps={{
              overlayProps: { backgroundOpacity: 0 },
              withCloseButton: false,
              size: "xs",
            }}
            anchorLabel={
              props.drawerTrigger ?? (
                <CItem
                  containerProps={{
                    align: "center",
                    gap: "3px",
                  }}
                  label="Filter"
                  icon={<IconFilter size="1.2rem" />}
                />
              )
            }
            getHeader={getHeader}
          >
            <CForm
              onSubmit={handleSubmit}
              setFormInstance={setFmk}
              onValueChange={
                props.updateFilterOnlyOnSubmit ? undefined : handleValueChange
              }
              {...props.formProps}
              data={getFormInitialValues()}
            />
          </CDrawer>
        )}
      </Flex>
      <Flex justify="space-between">
        <Flex
          justify="flex-start"
          align={"center"}
          gap="xs"
          wrap="wrap"
          pr={{ base: "80px", sm: "90px" }}
        >
          {Object.keys(selected).map((filter) => {
            const selectedFilter = selected[filter];
            if (
              (selectedFilter &&
                (!selectedFilter.value ||
                  selectedFilter.value?.length === 0)) ||
              (selectedFilter.value instanceof Array &&
                selectedFilter.value.every((item) => !item))
            )
              return null;
            return (
              <CFilterOptions
                key={filter}
                label={selectedFilter.label}
                items={getFilterItems(
                  selectedFilter,
                  props.rangeFields,
                  props.getFilterLabel
                )}
              />
            );
          })}
        </Flex>
        {props.rightSection}
      </Flex>
    </Stack>
  );
}
