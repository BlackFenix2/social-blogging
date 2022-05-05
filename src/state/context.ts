import { createContext } from "react";
import type { User } from "firebase/auth";

export interface BlogUser extends User {
  username: string;
}

export const UserContext = createContext<{
  user: BlogUser | null;
  username: string | null;
}>({
  user: null,
  username: null,
});
