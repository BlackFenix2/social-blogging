import type { AppProps } from "next/app";
import Navbar from "components/Navbar";
import { Toaster } from "react-hot-toast";
import { UserContext } from "state/context";

import { useUserData } from "lib/hooks";
import { Box, ChakraProvider, extendTheme, Flex } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    blue: {
      "50": "#E9EBFB",
      "100": "#C2C6F5",
      "200": "#9AA1EF",
      "300": "#737DE8",
      "400": "#4B58E2",
      "500": "#2433DB",
      "600": "#1D29AF",
      "700": "#151F84",
      "800": "#0E1558",
      "900": "#070A2C",
    },
    red: {
      "50": "#FBE9E9",
      "100": "#F5C2C2",
      "200": "#EF9A9A",
      "300": "#E87373",
      "400": "#E24B4B",
      "500": "#DB2424",
      "600": "#AF1D1D",
      "700": "#841515",
      "800": "#580E0E",
      "900": "#2C0707",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData();
  return (
    <UserContext.Provider value={userData as any}>
      <ChakraProvider resetCSS theme={theme}>
        <Flex flexDirection={"column"} minHeight={"100vh"}>
          <Navbar />
          <Box as="main" flexGrow={1} padding="1rem 10vw" bg={"gray.100"}>
            <Component {...pageProps} />
          </Box>
        </Flex>
        <Toaster />
      </ChakraProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
