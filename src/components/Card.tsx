import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

const Card: React.FunctionComponent<BoxProps> = (props: BoxProps) => {
  return (
    <Box
      padding="2rem"
      margin="1rem 0"
      backgroundColor={"white"}
      border="1px solid #b5bdc4"
      rounded={"md"}
      {...props}
    >
      {props.children}
    </Box>
  );
};

export default Card;
