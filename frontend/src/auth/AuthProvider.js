import React, { useState, useEffect, createContext, useContext } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile, GithubAuthProvider, FacebookAuthProvider, TwitterAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FirebaseContext } from './FirebaseProvider';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

import { useParams } from "react-router-dom";
import { TrendingUpOutlined } from '@mui/icons-material';

export const AuthContext = createContext();

const AuthProvider = (props) => {

    const params = useParams();
    const children = props.children
    const [ user, setUser ] = useState(null);
    const [ profile, setProfile ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ authError, setAuthError ] = useState();
    const [ isPending, setIsPending ] = useState();
    const [ isOnline, setIsOnline ] = useState(false);
    const [ userToMessage, setUserToMessage ] = useState(false);

    const gitHubprovider = new GithubAuthProvider();
    const facebookprovider = new FacebookAuthProvider();
    const twitterprovider = new TwitterAuthProvider();
    const googleprovider = new GoogleAuthProvider();

    const fbContext = useContext(FirebaseContext);
    const auth = fbContext.auth;
    const db = fbContext.db;

    const registerUser = async (firstName, lastName, email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password, db);
            let user = userCredential.user;
            let newUser = doc(db, "users", user.uid);
            const userProfile = {
                uid: user.uid,
                email: user.email,
                name: user.displayName,
                firstName: firstName,
                lastName: lastName,
                province: "",
                city: "",
                postalCode: "",
                Want: "",
                Have: "",
                timeStamp: serverTimestamp(),
              }
              setDoc(newUser, userProfile)
              setIsOnline(true)
              return true;
            // await updateProfile(auth.userCredential, {displayName: `${firstName} ${lastName}`});
        } catch (error) {
            console.log(error.message);
        }
    }

    const signInUser = async (email, password) => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if(userCredential){
                setAuthError(null)
                setIsPending(true)
                setIsOnline(true)
            } else {
                setAuthError(`Failed Credentials`);
            }
          } catch (error) {
          console.log(error.message)
        }
      }

      const LogoutUser = async () => {
        try {
            await signOut(auth);
            setIsOnline(false)
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

    const gitHub = async() => {
        const result = await signInWithPopup(auth, gitHubprovider);
        const user = result
        setIsOnline(true)
        return user;
      }

    const google = async () => {
    try {
        const result = await signInWithPopup(auth, googleprovider);
        const user = result
        setIsOnline(true)
        return user;
    } catch (error) {
        console.log(error.message)
        }
    }

    const facebook = async() => {
        const result = await signInWithPopup(auth, facebookprovider);
        const user = result
        setIsOnline(true)
        return user;
       }
       
    const twitter = async() => {
        const result = await signInWithPopup(auth, twitterprovider);
        const user = result
        setIsOnline(true)
        return user;
       }

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
        });

        return unsubscribe;
    }, [auth]);

    const theValues = {
        user,
        loading,
        authError,
        isPending,
        isOnline,
        registerUser,
        signInUser,
        LogoutUser,
        forgotPassword,
        gitHub,
        google,
        twitter,
        facebook,
        userToMessage,
        setUserToMessage,
    }
    return <AuthContext.Provider value={theValues}>{children}</AuthContext.Provider>
}

export default AuthProvider;
