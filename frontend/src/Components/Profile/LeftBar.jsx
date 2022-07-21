import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Card,
  Typography,
} from "@mui/material";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import InventoryIcon from "@mui/icons-material/Inventory";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import WorkIcon from "@mui/icons-material/Work";
import StorefrontIcon from "@mui/icons-material/Storefront";
import GroupsIcon from "@mui/icons-material/Groups";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  where,
} from "firebase/firestore";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import { AuthContext } from "../../auth/AuthProvider";
import OnlineStatus from "./OnlineStatus";
import Avatar from "@mui/material/Avatar";

const LeftBar = () => {
  const authContext = useContext(AuthContext);
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const { user, setUserToMessage } = authContext;

  const [active, setActive] = useState("");
  const [userList, setUserList] = useState([]);
  const [userPicture, setUserPicture] = useState([]);
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
    console.log("222", db, "333", user);

    if (db && user) {
      let collectionRef = collection(db, "messages");
      let queryRef = query(
        collectionRef,
        where("users." + user.uid, "==", true)
        // where("senderuid", "!=", user.uid),
      );
      const unsubscribe = onSnapshot(queryRef, (querySnap) => {
        console.log("555", querySnap.docs);
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
        <Card>
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
            <Typography sx={{ marginLeft: "30px", color: "green" }}>
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
                  <Typography sx={{ marginLeft: "10px" }}>
                    {unread
                      .filter((message) => message.senderuid === item.uid)?.[0]
                      ?.newChat.slice(0, 3)}
                  </Typography>
                </Box>
              ))}
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default LeftBar;
