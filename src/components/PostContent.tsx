import { Heading, Text } from "@chakra-ui/react";
import { css } from "@emotion/css";
import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";
import Card from "./Card";
import MarkdownView from "./MarkdownView";

type Props = {
  post: any;
};

const PostContent = ({ post }: Props) => {
  const createdAt =
    typeof post.createdAt === "number"
      ? new Date(post.createdAt)
      : post.createdAt.toDate();
  return (
    <Card>
      <Heading as="h1" marginY={8}>
        {post?.title}
      </Heading>
      <Text fontSize={"sm"}>
        Written by{" "}
        <Link href={`/${post.username}`}>
          <a
            className={css`
              font-weight: bold;
              color: #3b49df;
            `}
          >
            @{post.username}
          </a>
        </Link>{" "}
        on {createdAt.toDateString()}
      </Text>

      <MarkdownView>{post?.content}</MarkdownView>
    </Card>
  );
};

export default PostContent;
