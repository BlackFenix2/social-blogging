import { UserContext } from "state/context";
import NextLink from "next/link";
import React, { useContext } from "react";
import {
  Box,
  Button,
  Stack,
  HStack,
  Image,
  Flex,
  LinkOverlay,
  Link,
} from "@chakra-ui/react";

type Props = {};

const Navbar = (props: Props) => {
  const { user, username } = useContext(UserContext);
  return (
    <Box
      as="nav"
      height={"70px"}
      paddingX="10vw"
      borderBottom={1}
      backgroundColor="white"
      borderColor="gray.300"
      borderBottomStyle={"solid"}
      position="sticky"
      top={0}
      width="100%"
      zIndex={99}
    >
      <Flex height="100%" alignItems="center" justifyContent="space-between">
        <Box>
          <NextLink href={"/"} passHref>
            <Link>
              <Button
                _hover={{
                  filter: "brightness(0.8)",
                }}
                backgroundColor={"black"}
                colorScheme="blackAlpha"
                color="white"
                paddingX={4}
                fontSize="1.5rem"
                size="lg"
              >
                FEED
              </Button>
            </Link>
          </NextLink>
        </Box>

        {username && (
          <>
            <Box marginLeft={"auto"}>
              <NextLink href="/admin" passHref>
                <Link>
                  <Button colorScheme={"blue"} marginRight={4} size="lg">
                    Write Posts
                  </Button>
                </Link>
              </NextLink>
            </Box>
            <Box>
              <NextLink href={`/${username}`} passHref>
                <Link>
                  <Image
                    borderRadius="full"
                    boxSize="50px"
                    alt="profile"
                    src={user?.photoURL as string}
                    referrerPolicy="no-referrer"
                  />
                </Link>
              </NextLink>
            </Box>
          </>
        )}
        {!username && (
          <Box>
            <NextLink href="/enter" passHref>
              <Button colorScheme={"blue"} marginRight={4} size="lg">
                Log in
              </Button>
            </NextLink>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
