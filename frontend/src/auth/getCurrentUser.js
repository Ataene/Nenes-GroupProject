import firebase from 'firebase/compat/app';

const getCurrentUser = () => {
    
    const user = firebase.auth().currentUser;
   if(!user) return null;
   return {};
}
export default getCurrentUser;