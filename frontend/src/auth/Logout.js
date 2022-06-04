import firebase from "firebase/compat/app";

const Logout = async () => {
    try {
        await firebase.auth().signOut();
    } catch (error) {
        throw new Error("Error logging out");
    }
}

export default Logout;

