import { Button, Code, Flex, Spinner } from "@chakra-ui/react";
import { css } from "@emotion/css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth } from "lib/firebase/auth";
import React, { SyntheticEvent } from "react";
import { useState } from "react";
import { storage, STATE_CHANGED } from "../lib/firebase";
import Loader from "./Loader";

type Props = {};

const ImageUploader = (props: Props) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState<string>();

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = Array.from(e.target.files)[0];
    const extension = file.type.split("/")[1];

    // Makes reference to the storage bucket location
    const fileRef = ref(
      storage,
      `uploads/${auth.currentUser!.uid}/${Date.now()}.${extension}`
    );
    setUploading(true);

    // Starts the upload
    const task = uploadBytesResumable(fileRef, file);

    // Listen to updates to upload task
    task.on(STATE_CHANGED, (snapshot) => {
      const pct = (
        (snapshot.bytesTransferred / snapshot.totalBytes) *
        100
      ).toFixed(0);
      setProgress(parseInt(pct));

      // Get downloadURL AFTER task resolves (Note: this is not a native Promise)
      task
        .then((d) => getDownloadURL(fileRef))
        .then((url) => {
          setDownloadURL(url as string);
          setUploading(false);
        });
    });
  };

  return (
    <Flex justifyContent={"space-between"}>
      <Spinner hidden={!uploading} />
      {uploading && <h3>{progress}%</h3>}

      {!uploading && (
        <>
          <Button
            as={"label"}
            colorScheme={"blackAlpha"}
            color={"black"}
            cursor="pointer"
            marginY={2}
          >
            📸 Upload Img
            <input
              type="file"
              style={{ display: "none" }}
              onChange={uploadFile}
              accept="image/x-png,image/gif,image/jpeg"
            />
          </Button>
        </>
      )}

      {downloadURL && (
        <Code
          className={css`
            width: 75%;
            margin-left: auto;
            background: white;
            padding: 5px;
            margin: 5px 0;
          `}
        >{`![alt](${downloadURL})`}</Code>
      )}
    </Flex>
  );
};

export default ImageUploader;
