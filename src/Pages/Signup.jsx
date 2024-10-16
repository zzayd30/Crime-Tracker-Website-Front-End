import React, { useState } from 'react'
import { useUserStore } from '../store/store'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const { setIsAlert, setAlertMsg, setAlertType } = useUserStore();
    const [User, setUser] = useState({
        FirstName: "",
        LastName: "",
        Age: "",
        Username: "",
        Email: "",
        Password: "",
        Role: "Admin",
    })
    const handleChange = (e) => {
        setUser(user => {
            return {
                ...user,
                [e.target.id]: e.target.value
            }
        })
    }
    const signup = async () => {
        console.log(User)
        await fetch('/api/signup', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(User)
        })
            .then(data => {
                return data.json()
            })
            .then(data => {
                if (data.success) {
                    setIsAlert(true);
                    setAlertType("success");
                    setAlertMsg("You have successfully signed up");
                    navigate('/login');
                }
                else {
                    setIsAlert(true);
                    setAlertType("error");
                    setAlertMsg(data.message);
                }
            })
            .catch(err => {
                setIsAlert(true);
                setAlertType("error");
                setAlertMsg(err.message);
            })
    }
    return (
        <div className='auth flex flex-col gap-y-8 h-[140vh] justify-center items-center'>
            <h1 className="text-4xl font-semibold">Create an account</h1>
            <label htmlFor="name" className='flex flex-col gap-y-2 w-[20rem]'>
                Enter Your Username
                <input type="name" className="input input-bordered input-info" id="Username" placeholder='e.g. John' onChange={handleChange} />
            </label>
            <label htmlFor="name" className='flex flex-col gap-y-2 w-[20rem]'>
                Enter Your First Name
                <input type="name" className="input input-bordered input-info" id="FirstName" placeholder='e.g. John' onChange={handleChange} />
            </label>
            <label htmlFor="name" className='flex flex-col gap-y-2 w-[20rem]'>
                Enter Your Last Name
                <input type="name" className="input input-bordered input-info" id="LastName" placeholder='e.g. Walker' onChange={handleChange} />
            </label>
            <label htmlFor="email" className='flex flex-col gap-y-2 w-[20rem]'>
                Enter Your Email
                <input type="name" className="input input-bordered input-info" id="Email" placeholder='e.g. john@gmail.com' onChange={handleChange} />
            </label>
            <label htmlFor="DOB" className='flex flex-col gap-y-2 w-[20rem]'>
                Enter Your Age
                <input type="number" className="input input-bordered input-info" id="Age" placeholder='Enter your Age' onChange={handleChange} />
            </label>
            <label htmlFor="password" className='flex flex-col gap-y-2 w-[20rem]'>
                Enter Your Password
                <input type="password" className="input input-bordered input-info" id="Password" placeholder='Enter your Password' onChange={handleChange} />
            </label>
            <button onClick={signup} className="btn btn-active btn-primary text-xl text-white">Signup</button>
        </div>
    )
}

export default Signup
