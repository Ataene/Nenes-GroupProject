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
import { collection, onSnapshot, orderBy, query, doc } from "firebase/firestore";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import { AuthContext } from "../../auth/AuthProvider";
import OnlineStatus from "./OnlineStatus";
import { Container } from "@mui/system";
import Avatar from "@mui/material/Avatar";

const LeftBar = () => {
  const authContext = useContext(AuthContext);
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const { user, messageUser, setMessageUser } = authContext;

  const [active, setActive] = useState("");
  const [userList, setUserList] = useState([]);
  const [userPicture, setUserPicture] = useState([]);

  useEffect(() => {
    if (db && user) {
      // setLoading(true);
      let collectionRef = collection(db, "users");
      let queryRef = query(collectionRef, orderBy("timeStamp"));
      const unsubscribe = onSnapshot(queryRef, (querySnap) => {
        if (querySnap.empty) {
        } else {
          let usersData = querySnap.docs.map((doc) => {
            return { ...doc.data(), DOC_ID: doc.id };
          });
          setUserList(usersData);
          // setLoading(false);
        }
      });
      return unsubscribe;
    }
  }, [db, user]);

  // const [status, setStatus] = useState([]);
  // useEffect(() => {
  //   if (db && user) {
  //     let collectionRef = collection(db, "users");
  //     let queryRef = query(collectionRef, orderBy("uid"));
  //     const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
  //       let newStatus = [];
  //       querySnapshot.forEach((doc) => {
  //         status.push(doc.data());
  //       });
  //       setStatus(status);
  //     });
  //     return unsubscribe;
  //   }
  // }, [db, user]);

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
                <RssFeedIcon sx={{ color: "#B8F1B0" }} />
              </ListItemIcon>
              <ListItemText primary="Sent mail" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <ChatIcon sx={{ color: "#B8F1B0" }} />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <GroupsIcon sx={{ color: "#B8F1B0" }} />
              </ListItemIcon>
              <ListItemText primary="Groups" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <StorefrontIcon sx={{ color: "#B8F1B0" }} />
              </ListItemIcon>
              <ListItemText primary="Market" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <InventoryIcon sx={{ color: "#B8F1B0" }} />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
            <hr />
            <ListItemButton>
              <ListItemIcon>
                <WorkIcon sx={{ color: "#B8F1B0" }} />
              </ListItemIcon>
              <ListItemText primary="Career" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <CircleNotificationsIcon sx={{ color: "#B8F1B0" }} />
              </ListItemIcon>
              <ListItemText primary="Notify" />
            </ListItemButton>
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
            <ListItemButton>
              <ListItemIcon>
                <OndemandVideoIcon sx={{ color: "#B8F1B0" }} />
              </ListItemIcon>
              <ListItemText primary="Video" />
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
                    onClick={() => setMessageUser(item.uid)}
                  />
                  <OnlineStatus uid={item.owner} />
                  <Typography sx={{ marginLeft: "10px" }}>
                    {item.firstName}
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
