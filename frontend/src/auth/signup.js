import firebase from 'firebase/compat/app';
import "firebase/auth";

const signup = async (firstName, lastName, email, password) => {

  const result = await firebase.auth().createUserWithEmailAndPassword(email, password);

  const user = result.user
  await user.updateProfile({displayName: `${lastName}`})
  return user;
}

export default signup;