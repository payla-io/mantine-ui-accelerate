import { Skeleton } from "@mantine/core";
import { TableDataProps } from "./types";
import InfiniteScroll, {
  Props as InfiniteScrollProps,
} from "react-infinite-scroll-component";
import TableData from ".";
import React from "react";

export interface InfiniteScrollTableProps extends TableDataProps {
  loadMore?: () => void;
  hasNextPage?: boolean;
  infiniteScrollProps?: InfiniteScrollProps;
}

const InfiniteScrollTable = (props: InfiniteScrollTableProps) => {
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

export default InfiniteScrollTable;
