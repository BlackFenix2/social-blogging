import { Button } from "@chakra-ui/react";
import { deleteDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function DeletePostButton({ postRef }) {
  const router = useRouter();

  const deletePost = async () => {
    const doIt = confirm("are you sure!");
    if (doIt) {
      await deleteDoc(postRef);
      router.push("/admin");
      toast("post annihilated ", { icon: "🗑️" });
    }
  };

  return (
    <Button colorScheme={"red"} onClick={deletePost} marginY={2}>
      Delete
    </Button>
  );
}
