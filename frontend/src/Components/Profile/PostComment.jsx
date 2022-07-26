import React, { useContext, useState, useEffect, useRef } from "react";
import { ListItem, ListItemText, ListItemAvatar, Avatar, TextField, Button } from "@mui/material";
import Comments from "../Profile/Comment";
import SendIcon from "@mui/icons-material/Send";
import "../Profile/Post.css";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  onSnapshot,
  limit,
  orderBy,
  doc,
  where,
  arrayRemove,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import { AuthContext } from "../../auth/AuthProvider";
import { v4 as uuidv4 } from "uuid";
import CommentsOnItem from "../Profile/Comment";

function PostComment({ url, postedAds, item }) {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('');

  const authContext = useContext(AuthContext);
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const { user, isOnline, userToComment, currentlyLoggedinUser } = authContext;
  console.log(currentlyLoggedinUser)
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [chat, setChat] = useState("");
  const scroll = useRef();
  const [displayName, setDisplayName] = useState("");
    const [userPicture, setUserPicture] = useState("");

    useEffect(() => {
      if (db && user) {
        let docRef = doc(db, "users", user.uid);
        const unsubscribe = onSnapshot(docRef, (querySnap) => {
  
          if (querySnap.empty) {
          } else {
            let usersData = querySnap.data()
            setUserPicture(usersData?.Avatar);
          }
        });
        return unsubscribe;
      }
    }, [db, user]);



// useEffect(() => {
//   if (db && userToComment) {
//     let docRef = doc(db, "users", userToComment);
//     const unsubscribe = onSnapshot(docRef, (querySnap) => {
//       let userToCommentData = querySnap.data();
//     });
//     return unsubscribe;
//   }
// }, [db, userToComment]);

// useEffect(() => {
//   if (db && user) {
//     let collectionRef = collection(db, "users");
//     let queryRef = query(collectionRef, orderBy("timeStamp"));
//     const unsubscribe = onSnapshot(queryRef, (querySnap) => {
//       if (querySnap.empty) {
//         console.log("Ads not found");
//       } else {
//         let usersData = querySnap.docs.map((doc) => {
//           return { ...doc.data(), DOC_ID: doc.id };
//         });
//         setOnlineUsers(usersData);
//       }
//     });
//     return unsubscribe;
//   }
// }, [db, user]);
  
    useEffect(() => {
      if (db) {
        let collectionRef = collection(db, "comments");
        let queryRef = query(
          collectionRef,
        );
        const unsubscribe = onSnapshot(queryRef, (querySnap) => {
          if (querySnap.empty) {
            setComments([]);
          } else {
            let commentsData = querySnap.docs.map((comment) => comment.data());
            commentsData = commentsData.sort((a, b) => {
              return a.createdAt
                .toString()
                .localeCompare(b.createdAt.toString());
            });
            setComments(commentsData);
          }
        });
        return unsubscribe;
      }
    }, [db]);

//User's Messages from DB.
// useEffect(() => {
//   if (db && user) {
//     let collectionRef = collection(db, "comments");
//     let queryRef = query(collectionRef, orderBy("timeStamp"), limit(50));
//     const unsubscribe = onSnapshot(queryRef, (querySnap) => {
//       if (querySnap.empty) {
//         console.log("Ads not found");
//       } else {
//         let usersComments = querySnap.docs.map((doc) => {
//           return { ...doc.data(), DOC_ID: doc.id };
//         });
//         setComments(usersComments);
//       }
//     });
//     return unsubscribe;
//   }
// }, [db, comments]);
  
  
  const handleComment = async (e) => {
    e.preventDefault();
    if (e.key === "Enter") { 
         
    try {
      let collectionRef = collection(db, "comments");
      await addDoc(collectionRef, {
        comment: comment,
        createdAt: new Date(),
 //       commentId: uuidv4(),
      });
      setComment("");
    } catch (error) {
      console.log(error.message);
    }
  };
    }


  const handleDeleteComment = (comment) => {
      let collectionRef = collection(db, "comments");
      deleteDoc(doc(db, "comments",comment.DOC_ID) 
      )
        .then((e) => {
          console.log(e);
        })
        .catch((error) => {
          console.log(error);
        });
    };

  const [usePicture, setUsePicture] = useState();
  
    useEffect(() => {
      if (db && user) {
        let docRef = doc(db, "users", user.uid);
        const unsubscribe = onSnapshot(docRef, (querySnap) => {
          if (querySnap.empty) {
            console.log("Ads not found");
          } else {
            let usersData = querySnap.data();
            setUsePicture(usersData?.Avatar);
          }
        });
        return unsubscribe;
      }
    }, [db, user]);
  
  return (
    <div className="post">
      <div className="post__header">
        {comments !== null &&
          comments.map(({ comment, userName, createdAt }) => (
            <ListItem key={comment}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                        sx={{ bgcolor: "red"[500] }}
                        aria-label="recipe"
                        src={userPicture}
                      />
                  {comment}
                </ListItemAvatar>
                <div className="post__comments">
                </div>
              </ListItem>
            </ListItem>
          ))}
        <div className="post__comments">
          {/*<CommentsOnItem />*/}
        </div>
        {user && (
          <div className="post_commentBox">
            <TextField
              label="add comment"
              size="small"
              variant="outlined"
              className="post__input"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="add a comment"
              onKeyUp={(e) => {
                handleComment(e);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default PostComment;
