import React, { useState } from "react";
import { CNavigations, CNavigationsProps } from "../src/ui/CNavigations";
import { Box } from "@mantine/core";

interface CNavigationTestProps {
  links: CNavigationsProps["links"];
}
export default function CNavigationTest(props: CNavigationTestProps) {
  const [minimisedNav, setMinimisedNav] = useState<boolean>(false);
  return (
    <Box w={minimisedNav ? 80 : 300}>
      <CNavigations
        links={props.links}
        minimisedNav={minimisedNav}
        setMinimisedNav={setMinimisedNav}
      />
    </Box>
  );
}
