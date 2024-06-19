import { Accordion, Card, Flex, Title } from "@mantine/core";
import React from "react";

interface DetailAccordionCardProps {
  title: string;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
  cardProps?: React.ComponentProps<typeof Card>;
  closeByDefault?: boolean;
}
export default function DetailAccordionCard(
  props: Readonly<DetailAccordionCardProps>,
) {
  return (
    <Card {...props.cardProps}>
      <Accordion
        variant="filled"
        radius="xs"
        chevronPosition="left"
        defaultValue={props.closeByDefault ? undefined : "content"}
      >
        <Accordion.Item value={"content"} bg="transparent">
          <Accordion.Control>
            <Flex justify={"space-between"} align={"center"} gap="xs">
              <Title size={"h2"} tt="uppercase">
                {props.title}
              </Title>
              {props.headerRight}
            </Flex>
          </Accordion.Control>
          <Accordion.Panel>{props.children}</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Card>
  );
}
