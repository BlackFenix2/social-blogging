import { doc, writeBatch, getDoc, getFirestore } from "firebase/firestore";
import { signInWithPopup, signInAnonymously, signOut } from "firebase/auth";

import { useEffect, useState, useCallback, useContext } from "react";
import Metatags from "components/Metatags";
import { debounce } from "lodash";
import { UserContext } from "state/context";
import { auth, signInWithGooglePopup } from "lib/firebase/auth";
import {
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function Enter(props) {
  const { user, username } = useContext(UserContext);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <>
      <Metatags title="Enter" description="Sign up for this amazing app!" />
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </>
  );
}

// Sign in with Google button
function SignInButton() {
  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  return (
    <Stack alignItems={"flex-start"}>
      <Button colorScheme={"messenger"} onClick={signInWithGoogle}>
        <Image marginRight={"10px"} src={"/google.png"} width="30px" /> Sign in
        with Google
      </Button>
      <Button colorScheme={"teal"} onClick={() => signInAnonymously(auth)}>
        Sign in Anonymously
      </Button>
    </Stack>
  );
}

// Sign out button
function SignOutButton() {
  return (
    <Button
      colorScheme={"blackAlpha"}
      color="black"
      onClick={() => signOut(auth)}
    >
      Sign Out
    </Button>
  );
}

// Username form
function UsernameForm() {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Create refs for both documents
    const userDoc = doc(getFirestore(), "users", user.uid);
    const usernameDoc = doc(getFirestore(), "usernames", formValue);

    // Commit both docs together as a batch write.
    const batch = writeBatch(getFirestore());
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  //

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = doc(getFirestore(), "usernames", username);
        const snap = await getDoc(ref);
        console.log("Firestore read executed!", snap.exists());
        setIsValid(!snap.exists());
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    <section>
      <Heading as="h3" size={"md"} marginY={4}>
        Choose Username
      </Heading>
      <form onSubmit={onSubmit}>
        <Input
          backgroundColor={"white"}
          fontSize={"md"}
          name="username"
          placeholder="myname"
          value={formValue}
          onChange={onChange}
        />
        <UsernameMessage
          username={formValue}
          isValid={isValid}
          loading={loading}
        />
        <Button
          type="submit"
          colorScheme={"green"}
          marginY={3}
          disabled={!isValid}
        >
          Choose
        </Button>

        <Heading as="h3" size={"md"} marginY={4}>
          Debug State
        </Heading>
        <div>
          Username: {formValue}
          <br />
          Loading: {loading.toString()}
          <br />
          Username Valid: {isValid.toString()}
        </div>
      </form>
    </section>
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return (
      <Text fontWeight={"bold"} color="green">
        {username} is available!
      </Text>
    );
  } else if (username && !isValid) {
    return (
      <Text fontWeight={"bold"} color="red">
        That username is taken!
      </Text>
    );
  } else {
    return <Text></Text>;
  }
}
