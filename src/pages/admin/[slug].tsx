import Metatags from "components/Metatags";
import PostManager from "components/posts/PostManager";

export default function AdminPostEdit() {
  return (
    <main>
      <Metatags title="Admin page" />
      <PostManager />
    </main>
  );
}
