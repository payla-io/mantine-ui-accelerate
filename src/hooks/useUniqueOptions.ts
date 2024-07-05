/* eslint-disable @typescript-eslint/no-explicit-any */

interface UseUniqueOptionsProps {
  data: any[];
  valueField?: string;
  labelField?: string;
}

export const useUniqueOptions = ({
  data,
  valueField,
  labelField,
}: UseUniqueOptionsProps) => {
  const getUniqueOptions = (
    valueField?: string,
    labelField?: string,
    getFilterValue?: (item: any, field: string) => string
  ) => {
    if (!valueField || !labelField) return [];
    const uniqueOptions = new Set();
    data.forEach((item) => {
      let label = item[labelField];
      if (!label && getFilterValue) {
        label = getFilterValue(item, labelField);
      }
      let value = item[valueField];
      if (!value && getFilterValue) {
        value = getFilterValue(item, valueField);
      }
      uniqueOptions.add(JSON.stringify({ label, value }));
    });
    return Array.from(uniqueOptions).map((item: any) => JSON.parse(item));
  };

  const getUniqueOptionsByMethod = (
    getValue: (item: any) => string,
    getLabel: (item: any) => string
  ) => {
    const uniqueOptions = new Set();
    data.forEach((item) => {
      const label = getLabel(item);
      const value = getValue(item);
      uniqueOptions.add(JSON.stringify({ label, value }));
    });
    return Array.from(uniqueOptions).map((item: any) => JSON.parse(item));
  };

  return {
    getUniqueOptions,
    getUniqueOptionsByMethod,
    options: getUniqueOptions(valueField, labelField),
  };
};
