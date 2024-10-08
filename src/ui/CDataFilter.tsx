import { Checkbox, Popover, Stack, Input, Box } from "@mantine/core";
import { IconFilter, IconFilterCog, IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { IOption } from "./CForm/types";

export interface CDataFilterProps {
  options?: IOption[];
  selectedOptions?: IOption[];
  onChange?: (options: IOption[]) => void;
  renderLabel?: (option: IOption) => React.ReactNode;
}

export function CDataFilter(props: Readonly<CDataFilterProps>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(props.selectedOptions ?? []);
  const showSearch = (props.options?.length ?? 0) > 5;
  const filterOptions = () => {
    if (!searchTerm) return props.options ?? [];
    return (
      props.options?.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      ) ?? []
    );
  };

  const handleOnChange = (option: IOption) => {
    if (selected.some((o) => option.value === o.value)) {
      setSelected(selected.filter((o) => option.value !== o.value));
    } else {
      setSelected([...selected, option]);
    }
  };

  useEffect(() => {
    if (props.onChange) props.onChange(selected);
  }, [selected]);

  return (
    <Popover
      position="bottom"
      withArrow
      keepMounted
      shadow="md"
      radius={"lg"}
      styles={{ dropdown: { maxHeight: "250px", overflow: "hidden" } }}
    >
      <Popover.Target>
        {selected.length > 0 ? (
          <IconFilterCog
            size={"1rem"}
            style={{ cursor: "pointer", opacity: 0.4 }}
          />
        ) : (
          <IconFilter
            size={"1rem"}
            style={{ cursor: "pointer", opacity: 0.4 }}
          />
        )}
      </Popover.Target>
      <Popover.Dropdown>
        <Stack>
          {showSearch && (
            <Input
              placeholder="Search"
              leftSection={<IconSearch size={"1rem"} />}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
          <Box
            style={{
              maxHeight: "150px",
              overflowY: showSearch ? "scroll" : "hidden",
            }}
          >
            <Stack>
              {filterOptions().map((option) => (
                <Checkbox
                  readOnly
                  key={option.value ?? "empty"}
                  label={
                    props.renderLabel ? props.renderLabel(option) : option.label
                  }
                  checked={selected.some((o) => option.value === o.value)}
                  onClick={() => {
                    handleOnChange(option);
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
