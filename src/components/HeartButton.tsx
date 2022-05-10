import { useDocument } from "react-firebase-hooks/firestore";
import { increment, writeBatch, doc, getFirestore } from "firebase/firestore";
import { auth } from "lib/firebase/auth";
import { Button } from "@chakra-ui/react";

// Allows user to heart or like a post
export default function Heart({ postRef }: any) {
  // Listen to heart document for currently logged in user
  const heartRef = doc(
    getFirestore(),
    postRef.path,
    "hearts",
    auth.currentUser!.uid
  );
  const [heartDoc] = useDocument(heartRef);

  // Create a user-to-post relationship
  const addHeart = async () => {
    const uid = auth.currentUser!.uid;
    const batch = writeBatch(getFirestore());

    batch.update(postRef, { heartCount: increment(1) });
    batch.set(heartRef, { uid });

    await batch.commit();
  };

  // Remove a user-to-post relationship
  const removeHeart = async () => {
    const batch = writeBatch(getFirestore());

    batch.update(postRef, { heartCount: increment(-1) });
    batch.delete(heartRef);

    await batch.commit();
  };

  return heartDoc?.exists() ? (
    <Button onClick={removeHeart} colorScheme="blackAlpha" marginY={2}>
      💔 Unheart
    </Button>
  ) : (
    <Button onClick={addHeart} colorScheme="blackAlpha" marginY={2}>
      💗 Heart
    </Button>
  );
}
