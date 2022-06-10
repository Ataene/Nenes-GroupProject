import React, { useState, useEffect, createContext, useContext } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail,updateProfile } from 'firebase/auth';
import { auth } from "./config";

export const UserContext = createContext({});
export const useUserContext = () => {
    return useContext(UserContext);
}
export const UserContextProvider = (props) => {

    const children = props.children
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState("");

    const registerUser = async (firstName, lastName, email, password) => {
        try {
            setLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const result = userCredential.result;
            const user = await updateProfile(auth.result, {
                displayName: `${firstName} ${lastName}`})
            return result;
        } catch (error) {
            console.log(error.message);
        }
    }

    const signinInUser = async (email, password) => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user
          return user;
        } catch (error) {
          console.log(error.message)
        }
      }

      const LogoutUser = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log("Error logging out");
        }
    }

    const forgotPassword = async (email) => {
        try {
            return sendPasswordResetEmail(auth, email)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (res) => {
            res ? setUser(res) : setUser(null);
            setError("")
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const values = {
        user,
        loading,
        error,
        registerUser,
        signinInUser,
        LogoutUser,
        forgotPassword
    }
    return <UserContext.Provider value={values}>{children}</UserContext.Provider>
}
