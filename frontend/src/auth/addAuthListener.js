import firebase from 'firebase/compat/app';

const addAuthListener = (callback) => {
  const onChange = (user) => {
      if (user){
          callback({});
      } else {
            callback(null);
      }
  }
  return firebase.auth().onAuthStateChanged(onChange);
}

export default addAuthListener;