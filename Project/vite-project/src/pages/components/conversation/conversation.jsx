import "./conversation.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {io} from "socket.io-client"

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isOnline, setIsOnline] = useState(null);
  const socket = useRef();


  useEffect(() => {
    socket.current = io("ws://localhost:8900");
}, []);


useEffect(() => {
  socket.current.on("getUsers", (users) =>{
    setOnlineUsers(users);
    console.log(onlineUsers);
});
}, [user]);

  useEffect(() => {
    const recipientId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("http://localhost:5001/user?userId=" + recipientId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();

    if (user !== null){
    setIsOnline(onlineUsers.find(userId => userId === user._id));
    }
  }, [currentUser, conversation]);




  return (
    <div className="conversation">
      <img
        className="conversationIMG"
        src={user?.profilePicture ? user.profilePicture : "./images/user.jpg"}
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
      {isOnline ? <span className="onlineText">ONLINE</span> : <span className="offlineText">OFFLINE</span>}
    </div>
  );
}
