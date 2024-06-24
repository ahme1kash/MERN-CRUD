import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "./Update.css"
import axios from "axios"
const Update = () => {
    const users = {
        firstName: "",
        lastName: "",
        email: "",
        address: "",
    }
    const navigate = useNavigate()
    const { id } = useParams();
    const [user, setUser] = useState(users)
    // axios.defaults.withCredentials = true;
    const inputChangeHandler = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })

    }
    useEffect(() => {
        const fetchData = async () => {
            let response = await axios.get(`https://mern-crud-backend-app.vercel.app/api/getSingleUser/${id}`)
            setUser(response.data.user)
        }
        fetchData();
    }, [id])
    const submitForm = async (e) => {
        try {
            e.preventDefault();
            await axios.put(`https://mern-crud-backend-app.vercel.app/api/updateUser/${id}`, user)
            // console.log(response)
            toast.success("User Updated Successfully", { position: "top-right" })
            navigate("/")
        }
        catch (err) {
            console.log(err)
            toast.error("Data failed to get submitted successfully", { position: "top-right" })
            navigate("/")
        }
    }
    return (
        <div className='updateUser'>
            <Link className='back' to={"/"}>Back</Link>
            <h3>Update user</h3>
            <form className='updateUserForm' onSubmit={submitForm}>

                <div className="inputGroup">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" value={user.firstName} onChange={inputChangeHandler} id="firstName"
                        name="firstName" autoComplete="off" placeholder='First Name' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" value={user.lastName} onChange={inputChangeHandler} id="lastName" name="lastName" autoComplete="off" placeholder='Last Name' />


                </div>
                <div className="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" value={user.email} onChange={inputChangeHandler} id="email" name="email" autoComplete="off" placeholder='Email' />
                </div>

                <div className="inputGroup">
                    <label htmlFor="address">Address</label>
                    <input type="text" value={user.address} onChange={inputChangeHandler} id="address" name="address" autoComplete="off" placeholder='Address' />
                </div>


                <div className='inputGroup'>
                    <button type="submit">Update</button>
                </div>


            </form>

        </div>
    )
}

export default Update
