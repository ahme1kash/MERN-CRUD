import React, { useState } from 'react'
import axios from "axios"
import "./User.css"
import { Link } from 'react-router-dom'
import { useEffect } from "react"
import toast from 'react-hot-toast';
// const navigate = useNavigate()
const User = () => {
    const [users, setUsers] = useState([]);
    axios.defaults.withCredentials = true;
    useEffect(() => {
        const fetchData = async () => {
            let response = await axios.get("https://mern-crud-backend-app.vercel.app/api/getAllUser")
            setUsers(response.data.user)
        }
        fetchData();


    }, [])
    const deleteUser = async (userId) => {
        try {
            await axios.delete(`https://mern-crud-backend-app.vercel.app/api/delete/${userId}`)
            setUsers((prevUser) => {
                return prevUser.filter((user) => user._id !== userId)
            })


            toast.success(" User Deleted Successfully", { position: "top-right" })
        }
        catch (err) {
            console.error("Error deleting user", err);
            toast.error("Failed to delete user", { position: "top-right" });
        }
        // navigate("/")
    }
    const deleteAll = async () => {
        try {
            await axios.delete("https://mern-crud-backend-app.vercel.app/api/deleteAllUser")
            setUsers([])


            toast.success("All User Deleted Successfully", { position: "top-right" })
        }
        catch (err) {
            console.error("Error in deleting All user", err);
            toast.error("Failed to delete user", { position: "top-right" });
        }
    }
    return (
        <div className='userTable'>
            <Link className="addNew" to={"/add"}>Add User</Link>
            <button onClick={deleteAll} className="deleteAll" to={"/delete"}>Delete All</button>
            <div className='data'>
                <h1>User Data</h1>
            </div>
            <table className="users" border={7} cellPadding={33} cellSpacing={20} borderolor={'#0652DD'}>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>User Email</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, index) => {
                        return (

                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td className="actionButtons" style={{ display: "flex" }}>
                                    <button onClick={() => {
                                        deleteUser(user._id)
                                    }} className='deleteButton'><i className="fa-regular fa-trash-can"></i></button>
                                    <Link to={`/edit/${user._id}`} className='editLink'><i className="far fa-edit"></i></Link>
                                </td>
                            </tr>
                        )




                    })
                    }
                </tbody>
            </table>
        </div >
    )
}

export default User



