import "./message.css"
import {format} from 'timeago.js'
import { useState, useEffect } from "react";
import axios from 'axios'

export default function Message({message, own, yourPic}){

    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
        const getPicture = async () => {
        const res = await axios("http://localhost:5001/user/" + message.sender)
        if (res.status === 200) {
            console.log(res.data.profilePicture);
            setProfilePicture(res.data.profilePicture);
        }}

        getPicture();
    }, [])

    return(
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className="messageIMG" src={profilePicture} alt=""/>
                <p className="messageText">{message.text}</p>
            </div>

            <div className="messageBottom">
                {format(message.createdAt)}
            </div>
        </div>
    )
}