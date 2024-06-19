import { Checkbox, Popover, Stack, Input, ScrollArea, PopoverProps, Text } from "@mantine/core";
import { IconFilter, IconFilterCog, IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export interface PopoverOptionsProps {
  selectedOptions: any[];
  trigger?: React.ReactNode;
  triggerSelected?: React.ReactNode;
  maxHeight?: number;
  options: any[];
  renderItem?: (
    option: any,
    onSelect: (option: any) => void,
    isSelected: boolean,
  ) => React.ReactNode;
  getValue?: (option: any) => string;
  getLabel?: (option: any) => string;
  onChange?: (selected: any[]) => void;
  popoverProps?: PopoverProps;
  title?: string;
}

export function PopoverOptions(props: Readonly<PopoverOptionsProps>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(props.selectedOptions ?? []);
  const showSearch = (props.options.length ?? 0) > 5;

  const getLabel = (option: any) => {
    return props.getLabel ? props.getLabel(option) : option.label;
  };

  const getTrigger = () => {
    if (props.trigger && selected.length === 0) return props.trigger;
    if (selected.length > 0 && (props.trigger || props.triggerSelected))
      return props.triggerSelected ?? props.trigger;
    return selected.length > 0 ? (
      <IconFilterCog
        size={"1rem"}
        style={{ cursor: "pointer", opacity: 0.4 }}
      />
    ) : (
      <IconFilter size={"1rem"} style={{ cursor: "pointer", opacity: 0.4 }} />
    );
  };

  const getValue = (option: any) => {
    return props.getValue ? props.getValue(option) : option.value;
  };

  const filterOptions = () => {
    if (!searchTerm) return props.options ?? [];
    return (
      props.options?.filter((option) => {
        const label = getLabel(option);
        return label.toLowerCase().includes(searchTerm.toLowerCase());
      }) ?? []
    );
  };

  const onSelect = (option: any) => {
    if (selected.some((o) => getValue(option) === getValue(o))) {
      setSelected(selected.filter((o) => getValue(option) !== getValue(o)));
    } else {
      setSelected([...selected, option]);
    }
  };

  useEffect(() => {
    if (props.onChange) props.onChange(selected);
  }, [selected]);

  return (
    <Popover position="bottom" withArrow keepMounted shadow="md" radius={"lg"} {...props.popoverProps}>
      <Popover.Target>{getTrigger()}</Popover.Target>
      <Popover.Dropdown>
        {props.title && <Text mb="lg">{props.title}</Text>}
        <Stack>
          {showSearch && (
            <Input
              placeholder="Search"
              leftSection={<IconSearch size={"1rem"} />}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
          <ScrollArea.Autosize mah={props.maxHeight ?? 200} scrollbarSize={2}>
            <Stack>
              {filterOptions().map((option, i) =>
                props.renderItem ? (
                  props.renderItem(
                    option,
                    onSelect,
                    selected.some((o) => getValue(option) === getValue(o)),
                  )
                ) : (
                  <Checkbox
                    readOnly
                    key={getValue(option) ?? i}
                    label={getLabel(option)}
                    checked={selected.some(
                      (o) => getValue(option) === getValue(o),
                    )}
                    onClick={() => {
                      onSelect(option);
                    }}
                  />
                ),
              )}
            </Stack>
          </ScrollArea.Autosize>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
