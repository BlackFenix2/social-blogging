import { Button, Heading, Spinner, Text } from "@chakra-ui/react";
import Card from "components/Card";
import Metatags from "components/Metatags";
import PostFeed from "components/PostFeed";
import { getMorePosts, getPosts } from "lib/firebase/firestore";
import React, { useState } from "react";

// Max post to query per page
const LIMIT = 10;

export async function getServerSideProps(context: any) {
  const posts = await getPosts();

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function Home(props: any) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  // Get next page in pagination query
  const getMorePostsHere = async () => {
    setLoading(true);

    const newPosts = await getMorePosts(posts);

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <>
      <Metatags
        title="Home Page"
        description="Get the latest posts on our site"
      />

      <Card color={"white"} backgroundColor="blue">
        <Heading size={"md"}>💡 Next.js + Firebase - The Full Course</Heading>
        <Text marginY={4}>
          Welcome! This app is built with Next.js and Firebase and is loosely
          inspired by Dev.to.
        </Text>
        <Text marginY={4}>
          Sign up for an 👨‍🎤 account, ✍️ write posts, then 💞 heart content
          created by other users. All public content is server-rendered and
          search-engine optimized.
        </Text>
      </Card>

      <PostFeed posts={posts} />

      {!loading && !postsEnd && (
        <Button onClick={getMorePostsHere} colorScheme="blackAlpha">
          Load more
        </Button>
      )}

      <Spinner hidden={!loading} />

      {postsEnd && "You have reached the end!"}
    </>
  );
}
