import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import { AuthContext } from "../../auth/AuthProvider";
import OnlineStatus from "./OnlineStatus";
import Avatar from "@mui/material/Avatar";
import { Container } from "@mui/system";

const LeftBar = () => {
  const authContext = useContext(AuthContext);
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const { user, setUserToMessage } = authContext;

  const [active, setActive] = useState("");
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [unread, setUnread] = useState([]);

  useEffect(() => {
    if (db && user) {
      setLoading(true);
      let collectionRef = collection(db, "users");
      let queryRef = query(collectionRef, orderBy("timeStamp"));
      const unsubscribe = onSnapshot(queryRef, (querySnap) => {
        if (querySnap.empty) {
        } else {
          let usersData = querySnap.docs.map((doc) => {
            return { ...doc.data(), DOC_ID: doc.id };
          });
          setUserList(usersData);
          setLoading(false);
        }
      });
      return unsubscribe;
    }
  }, [db, user]);

  useEffect(() => {

    if (db && user) {
      let collectionRef = collection(db, "messages");
      let queryRef = query(
        collectionRef,
        where("users." + user.uid, "==", true)
        // where("senderuid", "!=", user.uid),
      );
      const unsubscribe = onSnapshot(queryRef, (querySnap) => {
        if (querySnap.empty) {
          setMessages([]);
        } else {
          let messagesData = querySnap.docs.map((message) => message.data());
          messagesData = messagesData.sort((a, b) => {
            return a.timeStamp.toString().localeCompare(b.timeStamp.toString());
          });
          setMessages(messagesData);
        }
      });
      return unsubscribe;
    }
  }, [db, user]);

  useEffect(() => {
    if (messages) {
      let unreadMessges = messages.filter(
        (message) => message.unread && message.senderuid !== user.uid
      );
      setUnread(unreadMessges);
    }
  }, [messages]);

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <Box
        sx={{
          flex: "1.5",
          // backgroundColor: "#A5BECC",
          position: "sticky",
          maxHeight: "auto",
          display: { xs: "none", md: "flex" },
        }}
      >
        <Container>
          <List component="nav" aria-labelledby="nested-list-subheader">
            <ListItemButton>
              <ListItemIcon>
                <LiveHelpIcon sx={{ color: "#B8F1B0" }} />
              </ListItemIcon>
              <ListItemText primary="FAQ" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <CalendarMonthIcon sx={{ color: "#B8F1B0" }} />
              </ListItemIcon>
              <ListItemText primary="Event" />
            </ListItemButton>
          </List>
          <Box>
            <Typography variant="h6" sx={{ marginLeft: "60px", color: "green" }}>
              Users
            </Typography>
            <hr />
            {userList
              .filter((item) => item.uid !== user.uid)
              .map((item) => (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: "10px",
                  }}
                >
                  <Avatar
                    sx={{ marginTop: "10px", cursor: "pointer" }}
                    alt="User"
                    src={item.Avatar}
                    onClick={() => setUserToMessage(item.uid)}
                  />
                  <OnlineStatus uid={item.uid} />
                  <Typography sx={{ marginLeft: "10px" }}>
                    {item.firstName}
                  </Typography>
                  <Typography sx={{ marginLeft: "10px", color: "#0096FF" }}>
                    {unread
                      .filter((message) => message.senderuid === item.uid)?.[0]
                      ?.newChat.slice(0, 5)}
                  </Typography>
                </Box>
              ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default LeftBar;
