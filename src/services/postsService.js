import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../app/firebase";

export class PostService {
  colRef;
  constructor() {   
    this.colRef = collection(db, "posts");
  }

  async addNewPost(ptitle, pslug, pcontent, pImage) {
    try {
      const newDocRef = doc(this.colRef);

      const data = {
        title: ptitle,
        slug: pslug,
        content: pcontent,
        image: pImage,
        createdAt: new Date(),
      };

      return await setDoc(newDocRef, data);
    } catch (error) {
      throw new Error(`Error while adding post: ${error.message}`);
    }
  }

  async getAllPosts() {
    try {
    } catch (error) {
      throw new Error(`Error while getting post: ${error.message}`);
    }
  }
}

const postService = new PostService();

export default postService;
