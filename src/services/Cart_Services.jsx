// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { db, storage } from "../firebase";
// import {
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   updateDoc,
//   deleteDoc,
//   setDoc,
//   addDoc,
//   serverTimestamp,
// } from "firebase/firestore";

// export const CartCollectionRef = collection(db, "carts");

// class CartDataService {
//   addToCartOnFirebase = async (itemData, userId) => {
//     // Include userId as an argument
//     const cartRef = collection(db, "carts", userId, "carts"); // Use userId here
//     const docRef = await addDoc(cartRef, itemData);
//     return docRef.id; // Return the document ID
//   };

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  setDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export const CartCollectionRef = collection(db, "users"); // Define a reference for carts collection

class CartDataService {
  addToCartOnFirebase = async (itemData, userId) => {
    // Include userId as an argument
    const userCartRef = doc(CartCollectionRef, userId); // Create a document reference for the user's cart

    try {
      const cartDoc = await getDoc(userCartRef); // Check if user's cart document exists

      // If document exists, add item to a subcollection named "carts" within the user's cart
      if (cartDoc.exists()) {
        const itemRef = collection(userCartRef, "carts"); // Create a reference to the "carts" subcollection
        const docRef = await addDoc(itemRef, itemData);
        return docRef.id; // Return the document ID of the added item
      } else {
        // Create a new document for the user's cart if it doesn't exist
        await setDoc(userCartRef, {}); // Set an empty document for the user's cart
        const itemRef = collection(userCartRef, "carts"); // Create a reference to the "carts" subcollection
        const docRef = await addDoc(itemRef, itemData);
        return docRef.id; // Return the document ID of the added item
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      // Handle errors (optional)
    }
  };

  fetchCartItems = async (userId) => {
    try {
      const userCartRef = doc(CartCollectionRef, userId); // Reference user's cart document

      const cartDoc = await getDoc(userCartRef); // Retrieve cart document

      if (cartDoc.exists()) {
        const itemsCollectionRef = collection(userCartRef, "carts"); // Reference "carts" subcollection
        const querySnapshot = await getDocs(itemsCollectionRef); // Fetch carts

        const cartItems = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        return cartItems;
      } else {
        // Handle the case where the user's cart document doesn't exist
        return []; // Or throw an error, depending on your logic
      }
    } catch (error) {
      console.error("Error fetching cart carts:", error);
      // Handle errors (optional)
    }
  };

  // fetchCartItems = async (userId) => {
  //   try {
  //     const cartRef = collection(db, "carts", userId); // Build the path with "carts" and userId
  //     const querySnapshot = await getDocs(cartRef);
  //     console.log("fetchref", cartRef);

  //     const cartItems = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));

  //     return cartItems;
  //   } catch (error) {
  //     console.error("Error fetching cart carts:", error);
  //     // Handle errors (optional)
  //   }
  // };

  // fetchCartItems = async (userId) => {
  //   try {
  //     const cartRef = collection(db, "carts", userId);
  //     const querySnapshot = await getDocs(cartRef);

  //     const cartItems = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));

  //     return cartItems;
  //   } catch (error) {
  //     console.error("Error fetching cart carts:", error);
  //     // Handle errors (optional)
  //   }
  // };

  updateCartItem = async (itemData, userId, itemId) => {
    const cartRef = collection(db, "carts", userId);
    const docRef = doc(cartRef, itemId);
    await updateDoc(docRef, itemData);
  };

  deleteCartItem = async (userId, itemId) => {
    const cartRef = collection(db, "carts", userId);
    const docRef = doc(cartRef, itemId);
    await deleteDoc(docRef);
  };
}

export default new CartDataService();
