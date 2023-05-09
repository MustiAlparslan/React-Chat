import { auth, db } from "../fbConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";

const getErrorMessage = (error) => {
  console.error("ERROR", error);
  switch (error) {
    case "auth/user-not-found":
      return "User not found";
    case "auth/invalid-email":
      return "Invalid Email or Password";
    case "auth/wrong-password":
      return "Invalid Email or Password";
    case "auth/missing-password":
      return "Invalid password!";
    case "auth/too-many-requests":
      return "Too many requests Please try again in a second.";
    case "auth/email-already-in-use":
      return "Email already in use";
    default:
      return "Something went wrong";
  }
};

class Requests {
  static async login(email, password) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { type: "success", data: result };
    } catch (err) {
      const errMessage = getErrorMessage(err.code);
      return { type: "error", message: errMessage };
    }
  }
  static async logout() {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      return { type: "success" };
    } catch (err) {
      const errMessage = getErrorMessage(err.code);
      return { type: "error", message: errMessage };
    }
  }

  static async register(email, password, displayName) {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(result.user, { displayName: displayName }); // TODO: PHOTO
      return { type: "success", data: result };
    } catch (err) {
      const errMessage = getErrorMessage(err.code);
      return { type: "error", message: errMessage };
    }
  }

  static async deleteRoom(id) {
    try {
      const roomRef = doc(collection(db, "rooms"), id);
      await deleteDoc(roomRef);
      return { type: "success" };
    } catch (err) {
      const errMessage = getErrorMessage(err.code);
      return { type: "error", message: errMessage };
    }
  }

  static async createRoom(roomName) {
    try {
      await addDoc(collection(db, "rooms"), {
        name: roomName,
        createdBy: auth?.currentUser.email,
        createdAt: serverTimestamp(),
        mainChat: false,
      });
      return { type: "success" };
    } catch (err) {
      const errMessage = getErrorMessage(err.code);
      return { type: "error", message: errMessage };
    }
  }
}

export default Requests;
