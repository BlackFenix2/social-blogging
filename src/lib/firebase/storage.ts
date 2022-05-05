import firebaseApp from "./firebaseApp";
import { getStorage, TaskEvent } from "firebase/storage";

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(firebaseApp);

export const STATE_CHANGED: TaskEvent = "state_changed";
