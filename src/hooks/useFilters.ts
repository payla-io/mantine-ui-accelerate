import { ICFormField } from "../ui/CForm/types";
import { TextInputProps } from "@mantine/core";

export interface IFilterItem {
  name: string;
  label: TextInputProps["label"];
  value?: ICFormField["initialValue"];
  inputType?: ICFormField["inputType"];
}

interface IUseFilters {
  formatDate?: (date: Date) => string;
  getSelected: () => Record<string, IFilterItem>;
  setSelected: (selected: Record<string, IFilterItem>) => void;
}
export const useFilters = ({
  formatDate,
  setSelected,
  getSelected,
}: IUseFilters) => {
  const setSelectedFilter = (name: string, filter: IFilterItem) => {
    const currentSelected = getSelected();
    setSelected({
      ...currentSelected,
      [name]: filter,
    });
  };

  const parseDate = (value: string | Date) => {
    if (!value) return value;
    if (new Date(value).toString() === "Invalid Date") {
      return value;
    } else {
      return new Date(value);
    }
  };

  const setSelectedFilters = (filters: Record<string, IFilterItem>) => {
    setSelected(filters);
  };

  const refreshFilters = () => {
    setSelected({});
  };

  const getFilterItems = (
    filter: IFilterItem,
    rangeFields?: string[],
    getFilterLabel?: (name: string, value: string) => string
  ) => {
    if (filter.value instanceof Array) {
      if (filter.value.length > 0 && rangeFields?.includes(filter.name)) {
        if (filter.inputType === "date") {
          return [
            {
              label: filter.value
                .map((v) => {
                  const date = parseDate(v);
                  return date instanceof Date ? date.toDateString() : date;
                })
                .join(" - "),
              onClose: () => {
                setSelectedFilter(filter.name, {
                  ...filter,
                  value: [null, null],
                });
              },
            },
          ];
        } else {
          return [
            {
              label: filter.value
                .map((v) => {
                  const label = getFilterLabel
                    ? getFilterLabel(filter.name, v)
                    : v;
                  return label;
                })
                .join(" - "),
              onClose: () => {
                setSelectedFilter(filter.name, {
                  ...filter,
                  value: [0, 0],
                });
              },
            },
          ];
        }
      }

      return filter.value.map((item, i) => {
        let label = getFilterLabel ? getFilterLabel(filter.name, item) : item;
        if (item && typeof item === "object") {
          label = item.label;
        }
        return {
          label: label,
          onClose: () => {
            setSelectedFilter(filter.name, {
              ...filter,
              value: filter.value.filter(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (_: any, index: number) => index !== i
              ),
            });
          },
        };
      });
    } else if (filter.inputType === "date") {
      const date = parseDate(filter.value);
      return [
        {
          label: date instanceof Date ? date.toDateString() : date,
          onClose: () => {
            setSelectedFilter(filter.name, {
              ...filter,
              value: undefined,
            });
          },
        },
      ];
    }
    let label = getFilterLabel
      ? getFilterLabel(filter.name, filter.value)
      : filter.value;
    if (filter.value && typeof filter.value === "object") {
      label = filter.value.label;
    }
    return [
      {
        label: label,
        onClose: () => {
          setSelectedFilter(filter.name, {
            ...filter,
            value: undefined,
          });
        },
      },
    ];
  };

  const getFilters = () => {
    const filters: { [key: string]: string } = {};
    const currentSelected = getSelected();
    Object.keys(currentSelected).forEach((key) => {
      const filter = currentSelected[key];
      const value = filter.value;
      if (value instanceof Array) {
        if (value.length === 0 || value[0] === undefined || value[0] === null)
          return;
        if (value.every((v) => v === 0)) return;
        filters[key] = value
          .map((v) => {
            if (filter.inputType === "date") {
              const date = parseDate(v);
              return formatDate
                ? formatDate(date as Date)
                : date instanceof Date
                ? date.toDateString()
                : date;
            }
            if (v instanceof Object) {
              return v.value;
            }
            return v;
          })
          .join(",");
      } else {
        if (!value) return;

        filters[key] =
          filter.inputType === "date" && formatDate ? formatDate(value) : value;
      }
    });
    return filters;
  };
  return {
    selected: getSelected(),
    setSelectedFilter,
    setSelectedFilters,
    refreshFilters,
    getFilters,
    getFilterItems,
  };
};
