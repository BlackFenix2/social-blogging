import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import Card from "./Card";

export default function PostFeed({ posts, admin }: any) {
  return posts
    ? posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))
    : null;
}

function PostItem({ post, admin = false }) {
  // Naive method to calc word count and read time
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <Card>
      <Link href={`/${post.username}`}>
        <a>
          <strong>By @{post.username}</strong>
        </a>
      </Link>

      <Link href={`/${post.username}/${post.slug}`}>
        <Heading as="h2" size={"md"} marginY={4}>
          <a>{post.title}</a>
        </Heading>
      </Link>

      <Flex>
        <span>
          {wordCount} words. {minutesToRead} min read
        </span>
        <Box as="span" marginLeft={"auto"}>
          💗 {post.heartCount || 0} Hearts
        </Box>
      </Flex>

      {/* If admin view, show extra controls for user */}
      {admin && (
        <>
          <Link href={`/admin/${post.slug}`}>
            <Button colorScheme={"blue"} marginY={4}>
              Edit
            </Button>
          </Link>

          {post.published ? (
            <Text color={"green.400"} fontWeight={700}>
              Live
            </Text>
          ) : (
            <Text color="red" fontWeight={700}>
              Unpublished
            </Text>
          )}
        </>
      )}
    </Card>
  );
}
