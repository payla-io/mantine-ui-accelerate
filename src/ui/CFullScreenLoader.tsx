import { Box, Loader } from "@mantine/core";

interface CFullScreenLoaderProps {
  loading?: boolean;
}
export function CFullScreenLoader(props: Readonly<CFullScreenLoaderProps>) {
  if (!props.loading) {
    return null;
  }
  return (
    <Box
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.7)",
        zIndex: 1000,
      }}
    >
      <Loader size="xl" />
    </Box>
  );
}
