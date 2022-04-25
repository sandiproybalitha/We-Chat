import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { BiPowerOff } from 'react-icons/bi';

function Logout() {
    const navigate = useNavigate();
    const handleClick = async () => {
        localStorage.removeItem('we-chat-user');
        navigate("/login");
    }
    return (
        <Button onClick={handleClick}>
            <BiPowerOff />
        </Button>
    )
}
const Button = styled.button`
    display:flex;
    align-items:center;
    justify-content:center;
    padding:.5rem;
    border-radius:.5rem;
    background-color:#997af0;
    border:none;
    cursor:pointer;
    svg 
    {
        font-size:1.5rem;
        color:white;
    }
`;
export default Logout