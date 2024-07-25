import { Checkbox, Popover, Stack, Input, Box } from "@mantine/core";
import { IconFilter, IconFilterCog, IconSearch } from "@tabler/icons-react";
import { CDataFilterProps } from "./types";
import { useEffect, useState } from "react";
import { IOption } from "../CForm/types";

export function DataFilter({
  selectedOptions,
  options,
  renderLabel,
  onChange,
}: Readonly<CDataFilterProps>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(selectedOptions ?? []);
  const showSearch = (options?.length ?? 0) > 5;
  const filterOptions = () => {
    if (!searchTerm) return options ?? [];
    return (
      options?.filter((option) =>
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
    if (onChange) onChange(selected);
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
                  label={renderLabel ? renderLabel(option) : option.label}
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
