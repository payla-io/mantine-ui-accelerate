import { Skeleton, SkeletonProps, Stack, StackProps } from "@mantine/core";
import React from "react";

interface SkeletonRowProps {
  count?: number;
  skeletonProps?: SkeletonProps;
  containerProps?: StackProps;
}

export function SkeletonRow(props: Readonly<SkeletonRowProps>) {
  return (
    <Stack gap="sm" my="sm" {...props.containerProps}>
      {[...Array(props.count ?? 1)].map((_t, i) => (
        <Skeleton key={i} height={20} {...props.skeletonProps} />
      ))}
    </Stack>
  );
}
