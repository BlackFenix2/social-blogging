import { css } from "@emotion/css";
import React from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  children: any;
};

const MarkdownView = (props: Props) => {
  return (
    <ReactMarkdown
      className={css`
        all: revert;
        & > * {
          all: revert;
        }
      `}
    >
      {props.children}
    </ReactMarkdown>
  );
};

export default MarkdownView;
