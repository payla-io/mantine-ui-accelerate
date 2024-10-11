import React, { useState } from "react";
import { IFilterItem } from "../src/hooks/useFilters";
import {
  CSearchFilterHeader,
  CSearchFilterHeaderProps,
} from "../src/ui/CSearchFilterHeader";

interface CSearchFilterHeaderTestProps {
  formProps: CSearchFilterHeaderProps["formProps"];
  updateFilterOnlyOnSubmit?: boolean;
}
export default function CSearchFilterHeaderTest(
  props: CSearchFilterHeaderTestProps
) {
  const [selectedFilter, setSelectedFilter] = useState<
    Record<string, IFilterItem>
  >({});
  return (
    <CSearchFilterHeader
      setStateFilters={(filters: Record<string, IFilterItem>) => {
        setSelectedFilter(filters);
      }}
      enableRefresh={true}
      getStateFilters={() => selectedFilter}
      rangeFields={["created", "booking_date", "amount"]}
      formProps={props.formProps}
      updateFilterOnlyOnSubmit={props.updateFilterOnlyOnSubmit}
    />
  );
}
