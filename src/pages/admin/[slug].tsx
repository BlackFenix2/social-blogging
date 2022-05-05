import AuthCheck from "components/AuthCheck";
import Metatags from "components/Metatags";
import PostManager from "components/posts/PostManager";

export default function AdminPostEdit() {
  return (
    <main>
      <Metatags title="Admin page" />
      <AuthCheck>
        <PostManager />
      </AuthCheck>
    </main>
  );
}
