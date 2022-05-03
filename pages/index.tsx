import Loader from "components/Loader";
import PostFeed from "components/PostFeed";
import { firestore, fromMillis, postToJSON } from "lib/firebase";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import styles from "../styles/Home.module.css";

const LIMIT = 10;

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collectionGroup("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return { props: { posts } };
}

const Home: NextPage = (props) => {
  const [posts, setPosts] = React.useState(props.posts);
  const [isLoading, setIsLoading] = React.useState(false);

  const [postsEnd, setPostsEnd] = React.useState(false);

  const getMorePosts = async () => {
    setIsLoading(true);
    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === "number"
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const query = firestore
      .collectionGroup("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setIsLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };
  return (
    <main>
      <main>
        <PostFeed posts={posts} />

        {!isLoading && !postsEnd && (
          <button onClick={getMorePosts}>Load more</button>
        )}

        <Loader show={isLoading} />

        {postsEnd && "You have reached the end!"}
      </main>
    </main>
  );
};

export default Home;
