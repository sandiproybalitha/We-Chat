import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';


function Login() {
    const navigate = useNavigate();
    const [value, setValue] = useState({
        email: "",
        password: ""
    })
    useEffect(() => {
        if (!localStorage.getItem('we-chat-user')) {
            navigate('/login');
        }

    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const toastOption = {
            position: "top-center",
            autoClose: 5000,
            pauseOnHover: true,
            draggable: true,
            theme: "dark"
        };

        if (handlevalidation()) {
            const { email, password } = value;
            const { data } = await axios.post(loginRoute, value);
            console.log(data.user);
            if (data.status === false) {
                toast.error(data.msg, toastOption);
            }
            else if (data.status === true) {


                if (!localStorage.getItem('we-chat-user')) {
                    // localStorage.removeItem('we-chat-user');
                    localStorage.setItem('we-chat-user', JSON.stringify(data.user));
                }
                toast.success(data.msg, toastOption);
                navigate("/");
            }
        }
    }
    const handlevalidation = () => {
        const toastOption = {
            position: "top-center",
            autoClose: 5000,
            pauseOnHover: true,
            draggable: true,
            theme: "dark"
        };
        const { email, password } = value;

        if (email === "") {
            toast.error('Email is Required', toastOption);
            return false;
        }
        else if (password.length < 8) {
            toast.error('Password Should be Gretter Than 8 Charecter', toastOption);
            return false;
        }
        return true;

    }
    const handleChange = (event) => {
        setValue({ ...value, [event.target.name]: event.target.value });
    }
    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)} >
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h1>We <span>Chat</span></h1>
                    </div>
                    <input type="email" name="email" id="" placeholder='Email' onChange={(e) => handleChange(e)} />
                    <input type="password" name="password" id="" placeholder='Password' onChange={(e) => handleChange(e)} />

                    <button type='submit'>Login</button>
                    <span className='text'>Don't have account?<Link to="/register">Register</Link></span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
}
const FormContainer = styled.div`
    height:100vh;
    width:100vw;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    gap:1rem;
    background-color:#131324;
    .brand
    {
        display : flex;
        align-items:center;
        gap:1rem;
        justify-content:center;
        img
        {
            height:5rem;
        }
        h1 
        {
            color:white;
            font-size:3rem;
        }
        h1 span 
        {
            color:blue;
            text-transform:capitalize;
            font-size:3rem;
        }
    }
    form
    {
        display:flex;
        flex-direction:column;
        gap:2rem;
        background:#00000076;
        border-radius:1.2rem;
        padding:3rem 5rem;
        input
        {
            background-color:transparent;
            border-bottom : 2px solid gray;
            color : white;
            font-size:1.6rem;
            padding: 0 .8rem;
            text-align : center;
        }
        button
        {
            background-color:#997af0;
            
            padding : 1rem 2rem;
            font-weight : bold;
            border-radius : .4rem;
            color:white;
            font-size:1.4rem;
            text-transform:uppercase;
            cursor:pointer;
            transition:0.4s ease-in-out;
            
            &:hover 
            {
                background-color:#4e0eff;
                cursor:pointer;
            }

        }
        span
        {
            color:grey;
            text-transform:uppercase;
            font-size:1.2rem;
            a
            {
                text-decoration:none;
                font-weight:bold;
                color:blue;
                margin-left:.3rem;
            }
        }
    }
`;

export default Login;