import { IOption } from "../ui/CForm/types";
import { CIKeyValue } from "../ui/CTableData/types";

export function isValidUrl(value: string) {
  const pattern = new RegExp(
    "^([a-zA-Z]+:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$"
  );
  return pattern.test(value);
}

export const isValidHttpUrl = (value: string) => {
  if (!value || value.length === 0) return false;
  try {
    return (
      isValidUrl(value) ||
      new URL(value).protocol === "http:" ||
      new URL(value).protocol === "https:"
    );
  } catch (_) {
    return false;
  }
};

export const conditionValidator: { [key: string]: any } = {
  is_equal_to: (currentValue: any, conditionValue: any) => {
    return conditionValue == currentValue;
  },

  is_not_equal_to: (currentValue: any, conditionValue: any) => {
    return conditionValue != currentValue;
  },

  is_greater_than: (currentValue: any, conditionValue: any) => {
    return Number(currentValue) > Number(conditionValue);
  },

  is_greater_than_or_equal_to: (currentValue: any, conditionValue: any) => {
    return Number(currentValue) >= Number(conditionValue);
  },

  is_less_than: (currentValue: any, conditionValue: any) => {
    return Number(currentValue) < Number(conditionValue);
  },

  is_less_than_or_equal_to: (currentValue: any, conditionValue: any) => {
    return Number(currentValue) <= Number(conditionValue);
  },

  options_in: (currentValue: any, options: any[]) => {
    if (currentValue instanceof Array) {
      return currentValue?.some((value) => options.includes(value));
    }
    return options.includes(currentValue);
  },

  options_not_in: (currentValue: any, options: any[]) => {
    if (currentValue instanceof Array) {
      return currentValue?.every((value) => !options.includes(value));
    }
    return !options.includes(currentValue);
  },

  is_character_length_greater_than_or_equal_to: (
    currentValue: any,
    conditionValue: any
  ) => {
    return currentValue?.toString().length >= conditionValue;
  },

  is_character_length_less_than_or_equal_to: (
    currentValue: any,
    conditionValue: any
  ) => {
    return currentValue?.toString().length <= conditionValue;
  },

  is_word_length_greater_than_or_equal_to: (
    currentValue: any,
    conditionValue: any
  ) => {
    return currentValue?.split(" ").length >= conditionValue;
  },

  is_word_length_less_than_or_equal_to: (
    currentValue: any,
    conditionValue: any
  ) => {
    return currentValue?.split(" ").length <= conditionValue;
  },

  contains: (currentValue: any, conditionValue: any) => {
    return currentValue?.toLowerCase()?.includes(conditionValue);
  },

  not_contains: (currentValue: any, conditionValue: any) => {
    return !currentValue?.toLowerCase()?.includes(conditionValue);
  },

  starts_with: (currentValue: any, conditionValue: any) => {
    return currentValue?.toLowerCase()?.startsWith(conditionValue);
  },

  ends_with: (currentValue: any, conditionValue: any) => {
    return currentValue?.toLowerCase()?.endsWith(conditionValue);
  },

  options_length_equal_to: (currentValue: any, conditionValue: any) => {
    return currentValue?.length == conditionValue;
  },

  options_length_greater_than: (currentValue: any, conditionValue: any) => {
    return currentValue?.length > conditionValue;
  },

  options_length_greater_than_or_equal_to: (
    currentValue: any,
    conditionValue: any
  ) => {
    return currentValue?.length >= conditionValue;
  },

  options_length_less_than: (currentValue: any, conditionValue: any) => {
    return currentValue?.length < conditionValue;
  },

  options_length_less_than_or_equal_to: (
    currentValue: any,
    conditionValue: any
  ) => {
    return currentValue?.length <= conditionValue;
  },

  is_url: (currentValue: string) => {
    return isValidHttpUrl(currentValue);
  },

  is_not_empty: (currentValue: any) => {
    if (currentValue instanceof Array || typeof currentValue === "string") {
      return currentValue.length > 0;
    }
    return !!currentValue;
  },
};

const comparisonMap: CIKeyValue = {
  is_equal_to: "should be equal to",
  is_not_empty: "should not be empty",
  is_not_equal_to: "should be not equal to",
  is_greater_than: "should be greater than",
  is_greater_than_or_equal_to: "should be greater than or equal to",
  is_less_than: "should be less than",
  is_less_than_or_equal_to: "should be less than or equal to",
  options_in: "should be in",
  options_not_in: "should be not in",
  is_character_length_greater_than_or_equal_to:
    "character length should be greater than or equal to",
  is_character_length_less_than_or_equal_to:
    "character length should be less than or equal to",
  is_word_length_greater_than_or_equal_to:
    "word length should be greater than or equal to",
  is_word_length_less_than_or_equal_to:
    "word length should be less than or equal to",
  contains: "should contain",
  not_contains: "should not contain",
  starts_with: "should start with",
  ends_with: "should end with",
  options_length_equal_to: "options length should be equal to",
  options_length_greater_than: "options length should be greater than",
  options_length_greater_than_or_equal_to:
    "options length should be greater than or equal to",
  options_length_less_than: "options length should be less than",
  options_length_less_than_or_equal_to:
    "options length should be less than or equal to",
  is_url: "Please enter a valid url",
  response_count_less_than_or_equal: "count should be less than or equal to",
};

const buildErrorText = (
  comparison: string,
  conditionValue: any,
  conditionOptions: any
) => {
  const comparisonText = comparisonMap[comparison];
  if (comparison === "options_in" || comparison === "options_not_in") {
    return `Response ${comparisonText} [${conditionOptions.join(", ")}]`;
  } else if (comparison === "is_url") {
    return `${comparisonText}`;
  }
  return `Response ${comparisonText} ${conditionValue}`;
};

type ILogic = "and" | "or";

export interface ICondition {
  formName: string;
  logic?: ILogic;
  method: string;
  value?: any;
  options?: IOption[];
  failedMessage?: string;
  getCurrentValue?: () => any;
  validate?: (value: unknown, values: Record<string, unknown>) => any;
}

export const validateConditions = (
  conditions: ICondition[],
  values: Record<string, unknown>
) => {
  let result: boolean | null = null;
  const failed: string[] = [];
  conditions.forEach((c) => {
    const method: any = conditionValidator[c.method];
    const logic = c.logic;
    if (method) {
      let currentValue = values[c.formName];
      if (c.getCurrentValue) {
        currentValue = c.getCurrentValue();
      }

      const conditionOptions = c.options?.map((o) => o.value);

      const conditionOptionsTitle = c.options?.map((o) => o.label);
      const conditionValue = c.value;
      const conditionWithOptions = ["options_in", "options_not_in"].includes(
        c.method
      );
      let currentResult = null;
      if (c.validate) {
        currentResult = c.validate(currentValue, values);
      } else {
        currentResult = conditionWithOptions
          ? method(currentValue, conditionOptions)
          : method(currentValue, conditionValue);
      }
      if (!currentResult) {
        failed.push(
          c.failedMessage ??
            buildErrorText(c.method, conditionValue, conditionOptionsTitle)
        );
      }
      if (result === null) {
        result = currentResult;
      } else {
        if (logic === "and") {
          result = result && currentResult;
        } else {
          result = result || currentResult;
        }
      }
    }
  });

  return { isValid: result || result === null, failed };
};
