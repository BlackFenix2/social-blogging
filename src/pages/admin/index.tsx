import styles from "styles/Admin.module.css";
import {
  serverTimestamp,
  query,
  collection,
  orderBy,
  getFirestore,
  setDoc,
  doc,
} from "firebase/firestore";

import { useContext, useState } from "react";
import { useRouter } from "next/router";

import { useCollection } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import AuthCheck from "components/AuthCheck";
import PostFeed from "components/PostFeed";
import { auth } from "lib/firebase/auth";
import { kebabCase } from "lodash";
import { UserContext } from "state/context";
import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";

export default function AdminPostsPage(props) {
  return (
    <Box paddingTop={10}>
      <AuthCheck>
        <PostList />
        <CreateNewPost />
      </AuthCheck>
    </Box>
  );
}

function PostList() {
  // const ref = firestore.collection('users').doc(auth.currentUser.uid).collection('posts');
  // const query = ref.orderBy('createdAt');

  const ref = collection(
    getFirestore(),
    "users",
    auth.currentUser!.uid,
    "posts"
  );
  const postQuery = query(ref, orderBy("createdAt"));

  const [querySnapshot] = useCollection(postQuery);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <Heading as="h1">Manage your Posts</Heading>
      <PostFeed posts={posts} admin />
    </>
  );
}

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(title));

  // Validate length
  const isValid = title.length > 3 && title.length < 100;

  // Create a new post in firestore
  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser!.uid;
    const ref = doc(getFirestore(), "users", uid, "posts", slug);

    // Tip: give all fields a default value here
    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: "# hello world!",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await setDoc(ref, data);

    toast.success("Post created!");

    // Imperative navigation after doc is set
    router.push(`/admin/${slug}`);
  };

  return (
    <form onSubmit={createPost}>
      <Input
        value={title}
        size="lg"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="My Awesome Article!"
        fontSize={"2.5rem"}
        backgroundColor="white"
      />
      <Text marginY={4}>
        <strong>Slug:</strong> {slug}
      </Text>
      <Button type="submit" disabled={!isValid} colorScheme="green">
        Create New Post
      </Button>
    </form>
  );
}
