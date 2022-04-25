import React, { useState } from 'react'
import styled from 'styled-components'
import robot from '../assets/robot.gif'

function Welcome({ currentUser }) {
    // const currentUser = JSON.parse(localStorage.getItem('we-chat-user'));
    return (
        <Container>
            <img src={robot} alt="robot" />
            <h1>Welcome <span>{currentUser.username.split(" ")[0]}</span></h1>
            <h3>Please select a chat to messaging</h3>
        </Container>
    )
}
const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    color:white;
    img
    {
        height:20rem
    }
    span 
    {
        color:blue;
    }
`;
export default Welcome