import "./conversation.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Conversation({conversation, currentUser}){

    const [user, setUser] = useState(null) 

    useEffect(()=>{ 
        const recipientId = conversation.members.find((m) => m !== currentUser._id);

        const getUser = async () => {
            try{
            const res = await axios("https://new-server-cvbw.onrender.com/user?userId=" + recipientId)
            setUser(res.data);
            } catch (err){
                console.log(err);
            }
        };

        getUser();
    }, [currentUser, conversation]);


    return(

        <div className="conversation">
            <img className="conversationIMG" src={user?.profilePicture ? user.profilePicture : "./images/user.jpg"} alt=""/>
            <span className="conversationName">{user?.username}</span>
        </div>
    )
}