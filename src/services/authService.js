import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../app/firebase";

export class AuthService {
  // Register New User
  async register(email, password) {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // SignIn Existing User
  async signIn(email, password) {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error(`Error While Signing In User: ${error.message}`);
    }
  }

  // Get Current User
  getCurrentUser() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            resolve(user);
          } else {
            resolve(null);
          }
        },
        reject
      );
    });
  }

  // Signout User
  async doSignOut() {
    try {
      return await signOut(auth);
    } catch (error) {
      throw new Error(`Error While Signing Out: ${error.message}`);
    }
  }
}

const authService = new AuthService();

export default authService;
