import { useContext, useEffect } from "react";
import Header from "./components/Header";
import Conversation from "./components/conversation/conversation";
import Message from "./components/message/message";
import axios from 'axios'
import {io} from "socket.io-client"
import { useState, useRef } from "react";



function Messenger(){
    const [searchedUser, setUserSearch] = useState();
    const [conversation, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [message, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef();
    const scrollRef = useRef();
    const [isTyping, setIsTyping] = useState(false);
    const [otherUsername, setOtherUsername] = useState(null);

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        socket.current = io("https://socket-server-c6x1.onrender.com");
        socket.current.on("getMessage", (data) =>{
        setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
        })
        })

        socket.current.on("getTyping", data => {
            setIsTyping(data.isTyping);
            setOtherUsername(data.username)
        })
    }, []);

    useEffect(() => {
        socket.current.emit("addUser", user._id)
    }, [user]);

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && 
        setMessages(prev=> [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])


    useEffect(() =>{    
        const getConversations = async ()=>{
            try{

                const res = await axios.get("http://localhost:5001/conversation/" + user._id)
                setConversations(res.data);
            }catch(err){
                console.log(err)    
            } 
        };
        getConversations();
        
    }, [user._id]);

    useEffect(() =>{
        const getMessages = async () => {
            try{
                const res = await axios.get("http://localhost:5001/messages/" + currentChat?._id);
                setMessages(res.data);
            }
            catch (err){
                console.log(err);
            }
        };

        getMessages();
    }, [currentChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const messageObj = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        const receiverId = currentChat.members.find(member=> member !== user._id);

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId: receiverId,
            text: newMessage,
        })

        socket.current.emit("typing", {
            senderId: user._id,
            receiverId: receiverId,
            isTyping: false,
            username: user.username
        })

        try{
            const res = await axios.post("http://localhost:5001/messages", messageObj);

            setMessages([...message, res.data])
            setNewMessage("")
        }catch (err){
            console.log(err)
        }
    };


    useEffect(() => {

        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }, [message])

    const handleSearch = async (e) => {
        e.preventDefault();

        try{
            const searchRes = await axios.get('http://localhost:5001/user/searchByUsername/' + searchedUser)

            if (searchRes.status == 200){
                if(searchRes.data == null){
                    console.log("No User with that Username");
                } else {
                    const searchedUserID = searchRes.data._id;
                    const members = [user._id, searchedUserID];
                    const conversationObj = {
                        members: members,
                    };
                    try{
                    const convRes = await axios.post('http://localhost:5001/conversation/', conversationObj);
                    setConversations([...conversation, convRes.data])
                    setUserSearch("");
                    } catch (err){
                        console.log(err);
                    }
                    
                }
            }
        } catch (err){
            console.log(err);
        }
    }

    const onType = async (e) => {
        setNewMessage(e.target.value);
        const receiverId = currentChat.members.find(member=> member !== user._id)
        console.log(newMessage)

        if (newMessage === "" || newMessage === null || newMessage.length === 1){
            socket.current.emit("typing", {
                senderId: user._id,
                receiverId: receiverId,
                isTyping: false,
                username: user.username
            })
        } else {
        socket.current.emit("typing", {
            senderId: user._id,
            receiverId: receiverId,
            isTyping: true,
            username: user.username
        })
        }
    }



    return(
        <>
            <Header />
        

        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Search Username" className="chatMenuInput"
                    onChange={(e) => setUserSearch(e.target.value)}
                    value={searchedUser}></input>
                    <button onClick={handleSearch} className="startConvoBtn">Start Conversation</button>

                    {conversation.map((c) => (
                        <div onClick={() => setCurrentChat(c)}>
                            <Conversation conversation={c} currentUser={user} />
                        </div>
                        ))}            
                </div>
            </div>
            <div className="chatBox">
            <div className="chatBoxWrapper">
                {currentChat ? (
                    <>
                        <div className="feedbackHolder">
                       <div className="feedback">
                            {isTyping ? <p>{otherUsername} is typing...</p>
                            : <p></p>}
                        </div>
                        <div className="deliveryStatus">
                            <p>Last Message: Read</p>
                        </div>
                        </div>
                        <div className="chatBoxTop">
                            {message.map((m) => (
                                <div ref={scrollRef}>
                                    <Message message={m} own={m.sender === user._id} />
                                </div>
                            ))}
                        </div>
                        <div className="chatBoxBottom">
                            <textarea className="chatMessageInput"
                            placeholder="write something" 
                            onChange={onType}
                            value={newMessage}
                            ></textarea>
                            <button className="chatSubmitBtn" onClick={handleSubmit}>Send</button>
                        </div>
                    </> ) : ( <span className="noConversationText">Open a Conversation to Start a Chat.</span>)}
                    
                </div>
            </div>

        </div>

        </>
    )
} export default Messenger;

