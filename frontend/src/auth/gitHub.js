import { auth } from "./config";
import {GithubAuthProvider, FacebookAuthProvider, TwitterAuthProvider, GoogleAuthProvider, signInWithPopup}  from 'firebase/auth'
const gitHubprovider = new GithubAuthProvider();
const facebookprovider = new FacebookAuthProvider();
const twitterprovider = new TwitterAuthProvider();
const googleprovider = new GoogleAuthProvider();

export const gitHub = async() => {
  const result = await signInWithPopup(auth, gitHubprovider);
  const user = result
  return user;
}

export const facebook = async() => {
 const result = await signInWithPopup(auth, facebookprovider);
 const user = result
 return user;
}

export const twitter = async() => {
 const result = await signInWithPopup(auth, twitterprovider);
 const user = result
 return user;
}

export const google = async () => {
  try {
    
    const result = await signInWithPopup(auth, googleprovider);
    const user = result
    return user;
  } catch (error) {
    console.log(error.message)
  }
}



