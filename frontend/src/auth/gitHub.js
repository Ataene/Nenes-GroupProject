import firebase from "firebase/compat/app";
import {GithubAuthProvider, FacebookAuthProvider, TwitterAuthProvider, GoogleAuthProvider}  from 'firebase/auth'
const gitHubprovider = new GithubAuthProvider();
const facebookprovider = new FacebookAuthProvider();
const twitterprovider = new TwitterAuthProvider();
const googleprovider = new GoogleAuthProvider();


export const gitHub = async() => {
  const result = await firebase.auth().signInWithPopup(gitHubprovider);
  const user = result
  return user;
}

export const facebook = async() => {
 const result = await firebase.auth().signInWithPopup(facebookprovider);
 const user = result
 return user;
}

export const twitter = async() => {
 const result = await firebase.auth().signInWithPopup(twitterprovider);
 const user = result
 return user;
}

export const google = async() => {
 const result = await firebase.auth().signInWithPopup(googleprovider);
 const user = result
 return user;
}



