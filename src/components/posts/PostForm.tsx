import { Box, Button, Checkbox, Text, Textarea } from "@chakra-ui/react";
import { css } from "@emotion/css";
import Card from "components/Card";
import ImageUploader from "components/ImageUploader";
import MarkdownView from "components/MarkdownView";
import { serverTimestamp, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import styles from "styles/Admin.module.css";

export default function PostForm({ defaultValues, postRef, preview }) {
  const { register, handleSubmit, formState, reset, watch } = useForm({
    defaultValues: {
      content: defaultValues.content,
      published: defaultValues.published,
    },
    mode: "onChange",
  });

  const { isValid, isDirty, errors } = formState;

  const updatePost = async ({ content, published }) => {
    await updateDoc(postRef, {
      content,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ content, published });

    toast.success("Post updated successfully!");
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <Card>
          <MarkdownView>{watch("content")}</MarkdownView>
        </Card>
      )}

      <Box display={preview ? "none" : "flex"} flexDirection="column">
        <ImageUploader />

        <Textarea
          height={"60vh"}
          backgroundColor="white"
          {...register("content", {
            maxLength: { value: 20000, message: "content is too long" },
            minLength: { value: 10, message: "content is too short" },
            required: { value: true, message: "content is required" },
          })}
        />

        {errors?.content && (
          <Text color="red" fontWeight={"bold"}>
            {errors.content.message}
          </Text>
        )}

        <Checkbox marginY={4} {...register("published")}>
          Published
        </Checkbox>

        <Button
          colorScheme={"green"}
          type="submit"
          disabled={!isDirty || !isValid}
        >
          Save Changes
        </Button>
      </Box>
    </form>
  );
}
