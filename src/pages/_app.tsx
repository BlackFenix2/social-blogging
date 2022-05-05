import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "components/Navbar";
import { Toaster } from "react-hot-toast";
import { UserContext } from "state/context";

import { useUserData } from "lib/hooks";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData();
  return (
    <UserContext.Provider value={userData as any}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
