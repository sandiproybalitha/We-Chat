import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Loader from '../assets/loader.gif';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { setAvatarRoute } from '../utils/APIRoutes';
import { Buffer } from 'buffer';

function SetAvatar() {
    const api = "https://api.multiavatar.com/45678945";
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOption = {
        position: 'top-center',
        autoClose: 5000,
        pauseOnHover: true,
        dragable: true,
        theme: "dark"
    }
    useEffect(() => {
        if (!localStorage.getItem('we-chat-user')) {
            navigate('/login');
        }
    }, [])

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please Select an Avatar", toastOption);
        }
        else {
            const user = await JSON.parse(localStorage.getItem('we-chat-user'));
            // const user = localStorage.getItem('we-chat-user');
            console.log(user);
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, { image: avatars[selectedAvatar] });
            console.log(data);
            if (data.isSet) {

                user.avatarImage = data.image;
                user.isAvatarImageSet = true;
                localStorage.setItem('we-chat-user', JSON.stringify(user));
                console.log("come here");
                console.log(user);
                navigate("/");
            }
            else {
                // toast.error('Error in Setting Avatar', toastOption);
            }
        }

    };
    useEffect(() => {
        async function fetchAvatar() {
            const data = [];
            async function fetchData() {
                for (let i = 0; i < 4; i++) {
                    const img = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                    const buffer = new Buffer(img.data);
                    data.push(buffer.toString("base64"));
                }
            }
            await fetchData();
            setAvatars(data);
            setIsLoading(false);
        }
        fetchAvatar();
    }, [])
    return (

        <>
            {
                isLoading ? <Container>
                    <img src={Loader} alt="Loader" className='loader' />
                </Container> : (

                    <Container>
                        <div className="title-container">
                            <h1>Pick an Avtar as Your Profile Picture</h1>
                        </div>
                        <div className="avatars">{
                            avatars.map((avatar, index) => {
                                return (

                                    <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>

                                        <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar"
                                            onClick={() => setSelectedAvatar(index)}
                                        />
                                    </div>
                                )
                            })
                        }
                        </div>
                        <button className='submit-btn' onClick={setProfilePicture}>Set as profile picture</button>
                    </Container>
                )
            }
            <ToastContainer />
        </>
    )
}
const Container = styled.div`
     display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    gap:3rem;
    height:100vh;
    width:100vw;
    background-color:#131324;
    .loader 
    {
        max-inline-size:100%;
    }
    .title-container 
    {
        h1
        {
            color:white;
            font-size : 2rem;
        }
    }
    .avatars 
    {
        display : flex;
        gap : 2rem;

        .avatar 
        {
            border : .4rem solid transparent;
            padding : 0.4rem;
            border-radius : 5rem;
            display : flex;
            align-items : center;
            justify-content : center;
            transition : .7s ease-in-out;
            img
            {
                height : 6rem;
                cursor : pointer;
            }
        }
        .selected
        {
            border : 0.4rem solid #4e0eff;
        }
    }
    .submit-btn 
    
     {   background-color:#997af0;
        
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
`;
export default SetAvatar