import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import firebaseApp from "./firebaseApp";

export const auth = getAuth(firebaseApp);

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, new GoogleAuthProvider());

export const createUser = async (email: string, password: string) => {};

export const useSigninWithGoogleProvider = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
};
