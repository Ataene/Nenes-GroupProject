import React, { useContext } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { FirebaseContext } from '../providers/FirebaseProvider';

const user = () => {
    const fbContext = useContext(FirebaseContext);
    const { db } = fbContext;
    
  return (
    <div>user</div>
  )
}

export default user


 

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

