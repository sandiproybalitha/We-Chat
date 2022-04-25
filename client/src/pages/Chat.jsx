import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contact from '../components/Contact';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from 'socket.io-client';

function Chat() {

    const socket = useRef();
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined)
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        async function setUser() {
            if (!localStorage.getItem('we-chat-user')) {
                navigate("/login");
            } else {
                await JSON.parse(
                    localStorage.getItem('we-chat-user')
                );
                setCurrentUser(
                    await JSON.parse(
                        localStorage.getItem('we-chat-user')
                    ));
                setIsLoaded(true);
            }
        }
        setUser();
    }, []);

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser])

    useEffect(() => {
        async function contact() {
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                    setContacts(data);
                }
                else {
                    navigate('/setAvatar');
                }
            }
        }
        contact();
    }, [currentUser])
    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    }

    return (
        <Container>
            <div className="container">
                <Contact contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
                {
                    isLoaded && currentChat === undefined ? <Welcome currentUser={currentUser} /> : <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
                }
            </div>
        </Container>
    )
}

const Container = styled.div`
    height:100vh;
    width:100vw;
    display : flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:1rem;
    background-color:#131324;
    .container 
    {
        height:85vh;
        width:85vw;
        background-color:#00000076;
        display:grid;
        grid-template-columns:25% 75%;
        @media screen and (min-width:720px) and (max-width:1080px)
        {
            grid-template-columns:35% 65%;
        }
        @media screen and (min-width:360px) and (max-width:710px)
        {
            grid-template-columns:20% 80%;
        }
    }
`
export default Chat;