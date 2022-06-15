import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from "../auth/FirebaseProvider";
import { doc, updateDoc} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Box, Button } from '@mui/material';

const ImageUpload = () => {

    const fbContext = useContext(FirebaseContext);
    const db = fbContext.db;
    const store = fbContext.store;

    const [file, setFile] = useState('');
    const [progress, setProgress] = useState();
    useEffect(() => {
        const handleImageUpload = () => {

        const name = new Date().getTime() + file.name;
        console.log(name)
        const imageRef = ref(store, file.name);
        const uploadTask = uploadBytesResumable(imageRef, file);

        uploadTask.on("state_changed", (snapshort) => {
            const percentage = (snapshort.bytesTransferred / snapshort.totalBytes) * 100;
            setProgress(percentage);
        },
        (error) => {
            console.log("Upload Error", error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                const docRef = doc(db, file.name);
                updateDoc(docRef, {imageUrl: downloadURL});
            })
        })
    }

    file && handleImageUpload()
    }, [file])

  return (
    <>
     <Box>
        <input
            type='file'
            onChange={(e) => {
            let selectedFile = e.target.files[0];
            setFile(selectedFile);
            }}
        />
        <Button disable={progress !== null && progress < 100}>upload photo</Button>
        {progress ? <div>progress: {progress}%</div> : <div />}
     </Box>
    </>
  )
}

export default ImageUpload;