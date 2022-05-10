import { firestore, getUserWithUsername, postToJSON } from "lib/firebase";
import {
  doc,
  getDocs,
  getDoc,
  collectionGroup,
  query,
  limit,
  getFirestore,
} from "firebase/firestore";

import Link from "next/link";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useContext } from "react";
import { UserContext } from "state/context";
import AuthCheck from "components/AuthCheck";
import HeartButton from "components/HeartButton";
import Metatags from "components/Metatags";
import PostContent from "components/PostContent";
import { Box, Button, Flex } from "@chakra-ui/react";
import Card from "components/Card";

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    // const postRef = userDoc.ref.collection('posts').doc(slug);
    const postRef = doc(getFirestore(), userDoc.ref.path, "posts", slug);

    // post = postToJSON(await postRef.get());
    post = postToJSON(await getDoc(postRef));

    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 100,
  };
}

export async function getStaticPaths() {
  // Improve my using Admin SDK to select empty docs
  const q = query(collectionGroup(getFirestore(), "posts"), limit(20));
  const snapshot = await getDocs(q);

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    // must be in this format:
    // paths: [
    //   { params: { username, slug }}
    // ],
    paths,
    fallback: "blocking",
  };
}

export default function Post(props) {
  const postRef = doc(getFirestore(), props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;

  const { user: currentUser } = useContext(UserContext);

  return (
    <Flex minHeight={"100vh"} flexDirection={{ base: "column", md: "row" }}>
      <Metatags title={post.title} description={post.title} />

      <Box
        as="section"
        width={{ base: "100%", md: "80%" }}
        marginRight={"1rem"}
      >
        <PostContent post={post} />
      </Box>
      <Card
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
        <p>
          <strong>{post.heartCount || 0} 🤍</strong>
        </p>

        <AuthCheck
          fallback={
            <Link href="/enter">
              <Button marginY={2}>💗 Sign Up</Button>
            </Link>
          }
        >
          <HeartButton postRef={postRef} />
        </AuthCheck>

        {currentUser?.uid === post.uid && (
          <Link href={`/admin/${post.slug}`}>
            <Button colorScheme={"blue"} marginY={2}>
              Edit Post
            </Button>
          </Link>
        )}
      </Card>
    </Flex>
  );
}
