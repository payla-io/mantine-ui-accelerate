import { Skeleton } from "@mantine/core";
import { CTableDataProps } from "./types";
import InfiniteScroll, {
  Props as InfiniteScrollProps,
} from "react-infinite-scroll-component";
import { CTableData } from ".";

export interface CInfiniteScrollTableProps extends CTableDataProps {
  loadMore?: () => void;
  hasNextPage?: boolean;
  infiniteScrollProps?: InfiniteScrollProps;
}

export const CInfiniteScrollTable = (props: CInfiniteScrollTableProps) => {
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
      <CTableData {...props} />
    </InfiniteScroll>
  );
};
