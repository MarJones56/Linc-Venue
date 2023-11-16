import { useContext, useEffect } from "react";
import Header from "./components/Header";
import Conversation from "./components/conversation/conversation";
import Message from "./components/message/message";
import axios from 'axios'
import { useState, useRef } from "react";



function Messenger(){
    const [conversation, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [message, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const scrollRef = useRef();


    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() =>{    
        const getConversations = async ()=>{
            try{
                const res = await axios.get("http://localhost:3000/conversation/" + user._id)
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
                const res = await axios.get("http://localhost:3000/messages/" + currentChat?._id);
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

        try{
            const res = await axios.post("http://localhost:3000/messages", messageObj);
            setMessages([...message, res.data])
            setNewMessage("")
        }catch (err){
            console.log(err)
        }
    };


    useEffect(() => {

        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }, [message])


    return(
        <>
            <Header />
        

        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Search" className="chatMenuInput"></input>
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
                            onChange={(e) => setNewMessage(e.target.value)}
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

