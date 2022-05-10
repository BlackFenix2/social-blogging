import { BlogUser } from "state/context";
import React from "react";
import { Center, Flex, Heading, Image } from "@chakra-ui/react";

type Props = {
  user: BlogUser;
};

const UserProfile = ({ user }: Props) => {
  return (
    <Flex flexDirection={"column"} alignContent={"center"} textAlign="center">
      <Image
        src={user?.photoURL || "/hacker.png"}
        margin="auto"
        width={"20%"}
        borderRadius="50%"
        maxWidth={"150px"}
        alt="user profile icon"
      />
      <p>
        <i>@{user?.username}</i>
      </p>
      <Heading as="h1">{user?.displayName || "Anonymous User"}</Heading>
    </Flex>
  );
};

export default UserProfile;
