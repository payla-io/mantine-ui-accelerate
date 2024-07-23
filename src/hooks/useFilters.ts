import { ICFormField } from "../ui/CForm/types";
import { TextInputProps } from "@mantine/core";

export interface IFilterItem {
  name: string;
  label: TextInputProps["label"];
  value?: ICFormField["initialValue"];
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
        if (filter.value[0] instanceof Date) {
          return [
            {
              label: filter.value
                .map((date) => date?.toDateString())
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
                  if (new Date(v).toString() !== "Invalid Date") {
                    return new Date(v).toDateString();
                  }
                  return v;
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
        if (typeof item === "object") {
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
    } else if (filter.value instanceof Date) {
      return [
        {
          label: filter.value.toDateString(),
          onClose: () => {
            setSelectedFilter(filter.name, {
              ...filter,
              value: undefined,
            });
          },
        },
      ];
    }
    return [
      {
        label: filter.value,
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
      const value = currentSelected[key].value;
      if (value instanceof Array) {
        if (value.length === 0 || value[0] === undefined || value[0] === null)
          return;
        if (value.every((v) => v === 0)) return;
        let prevDate: Date | null = null;
        filters[key] = value
          .map((v) => {
            if (v === null && prevDate) {
              return formatDate
                ? formatDate(prevDate)
                : prevDate.toDateString();
            }
            if (v instanceof Date) {
              prevDate = new Date(v);
              return formatDate ? formatDate(v) : v.toDateString();
            }
            if (v instanceof Object) {
              return v.value;
            }
            if (new Date(v).toString() === "Invalid Date") {
              return v;
            }
            prevDate = new Date(v);
            return formatDate ? formatDate(v) : v.toDateString();
          })
          .join(",");
      } else {
        if (!value) return;

        filters[key] =
          value instanceof Date && formatDate ? formatDate(value) : value;
      }
    });
    return filters;
  };
  return {
    selected: getSelected(),
    setSelectedFilter,
    refreshFilters,
    getFilters,
    getFilterItems,
  };
};
