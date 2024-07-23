/** @type { import('@storybook/react').Preview } */
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import React, { useEffect } from "react";
import { addons } from "@storybook/preview-api";
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";
import { useMantineColorScheme } from "@mantine/core";
import { withMantineThemes } from "storybook-addon-mantine";
import { greenTheme, brandTheme } from "../stories/themes";
import { DatesProvider } from "@mantine/dates";

const channel = addons.getChannel();

function ColorSchemeWrapper({ children }: { children: React.ReactNode }) {
  const { setColorScheme } = useMantineColorScheme();
  const handleColorScheme = (value: boolean) =>
    setColorScheme(value ? "dark" : "light");

  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, handleColorScheme);
    return () => channel.off(DARK_MODE_EVENT_NAME, handleColorScheme);
  }, [channel]);

  return <DatesProvider settings={{ consistentWeeks: true }}>{children}</DatesProvider>;
}

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  (renderStory: any) => (
    <ColorSchemeWrapper>{renderStory()}</ColorSchemeWrapper>
  ),
  withMantineThemes({
    themes: [
      {
        id: "brand-theme",
        name: "Brand Theme",
        ...brandTheme,
      },
      {
        id: "light-green",
        name: "Light Green Theme",
        ...greenTheme,
      },
    ],
  }),
];

export default preview;
