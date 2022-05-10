import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { doc, getFirestore } from "firebase/firestore";
import { firestore } from "lib/firebase";
import { auth } from "lib/firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  useDocumentData,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import DeletePostButton from "./DeletePostButton";
import PostForm from "./PostForm";

export default function PostManager() {
  const [preview, setPreview] = useState(false);

  const router = useRouter();

  const { slug } = router.query;

  // const postRef = firestore.collection('users').doc(auth.currentUser.uid).collection('posts').doc(slug);
  const postRef = doc(
    getFirestore(),
    "users",
    auth.currentUser!.uid,
    "posts",
    slug as string
  );

  const [post] = useDocumentData(postRef);
  return (
    <Container maxW={"container.lg"}>
      <Flex flexDirection={{ base: "column", md: "row" }}>
        {post && (
          <>
            <Box
              as="section"
              width={{ base: "60vw", md: "100%" }}
              marginRight={4}
            >
              <Heading as="h1" marginY={8}>
                {post.title}
              </Heading>
              <Text marginY={4}>ID: {post.slug}</Text>

              <PostForm
                postRef={postRef}
                defaultValues={post}
                preview={preview}
              />
            </Box>

            <Box
              as="aside"
              display={"flex"}
              flexDirection={"column"}
              width={{ base: "100%", md: "20%" }}
              alignItems={"stretch"}
              justifyContent={"center"}
              minHeight="300px"
              minWidth="250px"
              textAlign={"center"}
              position={{ base: "sticky", md: "relative" }}
              top="0"
              height={"0"}
            >
              <Heading as="h3" size={"md"} marginY={8}>
                Tools
              </Heading>
              <Button
                colorScheme={"blackAlpha"}
                color={"black"}
                marginY={2}
                onClick={() => setPreview(!preview)}
              >
                {preview ? "Edit" : "Preview"}
              </Button>
              <Link href={`/${post.username}/${post.slug}`}>
                <Button colorScheme={"blue"} marginY={2}>
                  Live view
                </Button>
              </Link>
              <DeletePostButton postRef={postRef} />
            </Box>
          </>
        )}
      </Flex>
    </Container>
  );
}
