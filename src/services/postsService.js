import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../app/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export class PostService {
  colRef;
  constructor() {
    this.colRef = collection(db, "posts");
  }

  async addNewPost(ptitle, pslug, pcontent = "", pImage) {
    try {
      const newDocRef = doc(this.colRef);
      const imageRef = ref(storage, `images/${pImage.name}`);
      const uploadResult = await uploadBytes(imageRef, pImage);
      const imageURL = await getDownloadURL(uploadResult.ref);

      const data = {
        title: ptitle,
        slug: pslug,
        content: pcontent,
        image: imageURL,
        createdAt: new Date(),
      };

      return await setDoc(newDocRef, data);
    } catch (error) {
      throw new Error(`Error while adding post: ${error.message}`);
    }
  }

  async getAllPosts() {
    try {
      const allDoc = await getDocs(this.colRef);
      const documents = [];
      allDoc.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      return documents;
    } catch (error) {
      throw new Error(`Error while getting post: ${error.message}`);
    }
  }

  async getSingleDoc(val) {
    try {
      const docQuery = query(this.colRef, where("slug", "==", val));
      if (docQuery) {
        const getDocument = await getDocs(docQuery);

        if (!getDocument.empty) {
          const document = getDocument.docs[0];
          return { id: document.id, ...document.data() };
        } else {
          throw new Error("No matching document found");
        }
      } else {
        throw new Error("No matching document found");
      }
    } catch (error) {
      throw new Error(`Error while retrieving post: ${error.message}`);
    }
  }
}

const postService = new PostService();

export default postService;
