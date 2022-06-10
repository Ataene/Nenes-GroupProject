import { collection, addDoc } from "firebase/firestore"; 
import { db } from "./config";

// export const createUserDocument = async (user) => {
//     const docRef = await addDoc(collection(db, "users"), {
//         uid: user.uid,
//         email: user.email,
//         name: user.displayName,
//         address: "",
//         province: "",
//         city: "",
//         postalCode: "",
//         ProductWant: "",
//         ProductNeeded: "",
//     })
//     return docRef;
// };

export const createUserDocument = async (user) => {     
    const docRef = await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        address: "",
        province: "",
        city: "",
        postalCode: "",
        ProductWant: "",
        ProductNeeded: "",
    })
    return docRef;
};


export const readUserDocument = async () => {
    const userDocRef = await getDocs(collection(db, "users"));
        userDocRef.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
    return userDocRef;
}

