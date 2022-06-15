import { Box, Button, Modal, TextField } from "@mui/material";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const PostAdPage = () => {
  const [open, setOpen] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  // const FileUploader = () => {
  //   const handleFileInput = () => {};
  // };

  return (
    <>
      <Button onClick={handleOpen}>Post your ad!</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ width: 400 }}>
          <form>
            <TextField
              placeholder="Enter your Postal Code"
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
            <TextField
              placeholder="Enter the product category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <TextField
              placeholder="Enter the condition of the item"
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />
            <TextField
              placeholder="Enter the description of the item"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {/* <input
              className="file-uploader"
              type="file"
              onChange={handleFileInput}
              placeholder="Upload a picture of your item"
              value={picture}
            /> */}
            <Button type="submit">Submit</Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default PostAdPage;



// import { addDoc, collection } from 'firebase/firestore';
// import React, { useContext, useState } from 'react';
// import { FirebaseContext } from '../providers/FirebaseProvider';

// function AddHeroForm() {
//   const fbContext = useContext(FirebaseContext);
//   const db = fbContext.db;

//   const [name, setName] = useState('');
//   const [vehicle, setVehicle] = useState('');

//   const addHero = async (heroName, heroVehicle) => {
//     try {
//       let collectionRef = collection(db, 'heroes');
//       await addDoc(collectionRef, { name: heroName, vehicle: heroVehicle });
//       setName('');
//       setVehicle('');
//     } catch (ex) {
//       console.log('FIRESTORE ADD FAILURE!', ex.message);
//     }
//   };

//   return (
//     <div>
//       <input
//         name='name'
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <br />
//       <input
//         name='vehicle'
//         value={vehicle}
//         onChange={(e) => setVehicle(e.target.value)}
//       />
//       <br />
//       <button onClick={() => addHero(name, vehicle)}>ADD HERO</button>{' '}
//     </div>
//   );
// }

// export default AddHeroForm;



// import {
//   collection,
//   getDocs,
//   onSnapshot,
//   orderBy,
//   query,
// } from 'firebase/firestore';
// import React, { useContext, useEffect, useState } from 'react';
// import { FirebaseContext } from '../providers/FirebaseProvider';

// function HeroesList() {
//   const fbContext = useContext(FirebaseContext);
//   const db = fbContext.db;

//   const [heroes, setHeroes] = useState([]);

//   useEffect(() => {
//     let collectionRef = collection(db, 'heroes');
//     let queryRef = query(collectionRef, orderBy('name'));
//     const unsubscribe = onSnapshot(queryRef, (querySnap) => {
//       if (querySnap.empty) {
//         console.log('No docs found');
//       } else {
//         let heroesData = querySnap.docs.map((doc) => doc.data());
//         setHeroes(heroesData);
//       }
//     });
//     return unsubscribe;
//   }, []);

//   return (
//     <div>
//       {heroes.map((hero) => {
//         return (
//           <ul key={hero.DOC_ID}>
//             <li>name: {hero.name}</li>
//             <li>vehicle: {hero.vehicle}</li>
//             <li>docId: {hero.DOC_ID}</li>
//             <hr />
//           </ul>
//         );
//       })}
//     </div>
//   );
// }

// export default HeroesList;