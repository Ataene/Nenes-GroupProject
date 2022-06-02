import firebase from "firebase/compat/app";

const signin = async (email, password) => {
  
    try {
        const result = await firebase.auth().signInWithEmailAndPassword(email, password);
        return result;

    } catch (error) {
        console.log(error.message);
    }
}

export default signin;