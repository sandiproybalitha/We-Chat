import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';

function Contact({ contacts, currentUser, changeChat }) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        if (currentUser) {
            setCurrentUserName(currentUser.username);
            setCurrentUserImage(currentUser.avatarImage);
        }
    }, [currentUser])
    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact)
    }
    return (
        <>
            {currentUserImage && currentUserImage && (
                <Container>
                    <div className="brand">
                        <img src={Logo} alt="logo" />
                        <h3>We <span>Chat</span></h3>
                    </div>
                    <div className="contacts">
                        {contacts.map((contact, index) => {
                            return (
                                <div
                                    key={contact._id}
                                    className={`contact ${index === currentSelected ? "selected" : ""
                                        }`}
                                    onClick={() => changeCurrentChat(index, contact)}
                                >
                                    <div className="avatar">
                                        <img
                                            src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                            alt=""
                                        />
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="current-user">
                        <div className="avatar">
                            <img
                                src={`data:image/svg+xml;base64,${currentUserImage}`}
                                alt="avatar"
                            />
                        </div>
                        <div className="username">
                            <h2>{currentUserName}</h2>
                        </div>
                    </div>
                </Container>
            )}
        </>
    );
}
const Container = styled.div`
    display:grid;
    grid-template-rows:10% 75% 15%;
    overflow:hidden;
    backgroud-color:#080420;
    .brand
    {
        display : flex;
        align-items:center;
        justify-content:center;
        gap:1rem;
        img 
        {
            height:2rem;
        }
        h3 
        {
            color:white;
        }
        span 
        {
            color:blue ;
        }
    }
    .contacts 
    {
        display:flex ;
        flex-direction:column;
        align-items:center;
        overflow:auto;
        gap:.8rem;
        .contact 
        {
            background-color:#ffffff39;
            min-height:5rem;
            width:90%;
            cursor:pointer;
            border-radius:.2rem;
            padding:.4rem;
            gap:1rem;
            align-items:center;
            display:flex;
            transition:0.5s ease-in-out;
            .avatar 
            {
                img
                {
                    height:3rem;
                }
                
            }
            .username 
                {
                    h3
                    {
                        color:white;
                        font-size:1.2rem;
                        text-align:center;
                        width:100%
                    }
                }
        }
        .selected 
        {
            background-color:#9186f3;
        }
    }
    .current-user 
    {
        backgroud-color:#0d0d30;
        display:flex;
        justify-content:center;
        align-items:center;
        gap:2rem;
        .avatar
        {
            img
            {
                height:4rem;
                max-inline-size:100%;
            }
        }
        .username 
        {
            h2 
            {
                color:white;
            }

        }
        @media screen and (min-width:720px) and (max-width:1080px)
        {
            gap:.5rem;
            .username 
            {
                h2 
                {
                    font-size:1rem;
                }
            }
        }
    }
`
export default Contact