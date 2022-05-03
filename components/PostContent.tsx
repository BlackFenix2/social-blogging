import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  post: any;
};

const PostContent = ({ post }: Props) => {
  const createdAt =
    typeof post.createdAt === "number"
      ? new Date(post.createdAt)
      : post.createdAt.toDate();
  return (
    <div className="card">
      <h1>{post?.title}</h1>
      <span className="text-sm">
        Written by{" "}
        <Link href={`/${post.username}`}>
          <a className="text-info">@{post.username}</a>
        </Link>{" "}
        on {createdAt.toDateString()}
      </span>
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </div>
  );
};

export default PostContent;
