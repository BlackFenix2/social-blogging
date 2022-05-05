import {
  DocumentSnapshot,
  getFirestore,
  Timestamp,
  TaskState,
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  startAfter,
} from "firebase/firestore";
import { postToJSON } from ".";
import firebaseApp from "./firebaseApp";

export const firestore = getFirestore(firebaseApp);

export const fromMillis = Timestamp.fromMillis;

export { serverTimestamp, increment } from "firebase/firestore";

export const getPosts = async (): Promise<DocumentSnapshot[]> => {
  const ref = collectionGroup(firestore, "posts");
  const postsQuery = query(
    ref,
    where("published", "==", true),
    orderBy("createdAt", "desc"),
    limit(10)
  );

  const posts = (await getDocs(postsQuery)).docs.map(postToJSON);

  return posts;
};

/**
 * Get more posts to add to the current list of posts
 * @param posts current list of posts
 * @returns
 */
export const getMorePosts = async (posts: any) => {
  const last = posts[posts.length - 1];

  const cursor =
    typeof last.createdAt === "number"
      ? Timestamp.fromMillis(last.createdAt)
      : last.createdAt;

  const ref = collectionGroup(firestore, "posts");
  const postsQuery = query(
    ref,
    where("published", "==", true),
    orderBy("createdAt", "desc"),
    startAfter(cursor),
    limit(10)
  );

  const newPosts = (await getDocs(postsQuery)).docs.map((doc) => doc.data());

  return newPosts;
};
