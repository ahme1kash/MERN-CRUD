import React, { useState } from 'react'
import "./Add.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import toast from 'react-hot-toast';
const Add = () => {
    const users = {
        firstName: "",
        lastName: "",
        email: "",
        address: "",
    }
    const [user, setUser] = useState(users);
    const inputHandler = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
        // console.log(user)

    }
    const navigate = useNavigate()
    const submitForm = async (e) => {
        try {
            e.preventDefault();
            await axios.post("https://mern-crud-backend-app.vercel.app/create", user)
            toast.success("New User Added Successfully", { position: "top-right" })
            navigate("/")
        }
        catch (err) {
            console.log(err)
            toast.error("Data failed to get submitted successfully", { position: "top-right" })
            navigate("/")
        }
    }


    return (
        <div className='addUser'>
            <Link className='back' to={"/"}>Back</Link>
            <h3>Add Users</h3>
            <form className='addUserForm' onSubmit={submitForm}>

                <div className="inputGroup">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" onChange={inputHandler} id="firstName"
                        name="firstName" autoComplete="off" placeholder='First Name' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" onChange={inputHandler} id="lastName" name="lastName" autoComplete="off" placeholder='Last Name' />


                </div>
                <div className="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={inputHandler} id="email" name="email" autoComplete="off" placeholder='Email' />
                </div>

                <div className="inputGroup">
                    <label htmlFor="address">Address</label>
                    <input type="text" onChange={inputHandler} id="address" name="address" autoComplete="off" placeholder='Address' />
                </div>


                <div className='inputGroup'>
                    <button type="submit">Submit</button>
                </div>


            </form>

        </div>
    )
}

export default Add
