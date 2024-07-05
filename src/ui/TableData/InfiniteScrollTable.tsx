import { Skeleton } from "@mantine/core";
import { CTableDataProps } from "./types";
import InfiniteScroll, {
  Props as InfiniteScrollProps,
} from "react-infinite-scroll-component";
import { TableData } from ".";
import React from "react";

export interface InfiniteScrollTableProps extends CTableDataProps {
  loadMore?: () => void;
  hasNextPage?: boolean;
  infiniteScrollProps?: InfiniteScrollProps;
}

export const InfiniteScrollTable = (props: InfiniteScrollTableProps) => {
  return (
    <InfiniteScroll
      dataLength={props.data.length}
      next={() => {
        props.loadMore && props.loadMore();
      }}
      hasMore={!!props.hasNextPage}
      loader={<Skeleton height={20} />}
      {...props.infiniteScrollProps}
    >
      <TableData {...props} />
    </InfiniteScroll>
  );
};
