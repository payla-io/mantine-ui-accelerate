import {
  Timeline,
  Text,
  TimelineProps,
  TimelineItemProps,
} from "@mantine/core";
import React from "react";

export interface CTimelineItemProps {
  title?: string;
  description?: string;
  author?: string;
  time?: string;
  data?: any;
  icon?: React.ReactNode;
  itemProps?: TimelineItemProps;
  renderItem?: (item: CTimelineItemProps) => React.ReactNode;
}
export interface CTimelineProps {
  renderItem?: (item: CTimelineItemProps) => React.ReactNode;
  items: CTimelineItemProps[];
  timelineProps?: TimelineProps;
}
export const CTimeline = (props: CTimelineProps) => {
  return (
    <Timeline bulletSize={24} lineWidth={2} {...props.timelineProps}>
      {props.items.map((item, index) => {
        const renderItem = item.renderItem ?? props.renderItem;
        return (
          <Timeline.Item
            key={index}
            title={item.title}
            bullet={item.icon}
            {...item.itemProps}
          >
            {renderItem ? (
              renderItem(item)
            ) : (
              <>
                {item.description && (
                  <Text c="dimmed" size="sm">
                    {item.description}
                  </Text>
                )}
                {item.author && (
                  <Text c="dimmed" size="sm">
                    {item.author}
                  </Text>
                )}
                {item.time && (
                  <Text size="xs" mt={4}>
                    {item.time}
                  </Text>
                )}
              </>
            )}
          </Timeline.Item>
        );
      })}
    </Timeline>
  );
};
