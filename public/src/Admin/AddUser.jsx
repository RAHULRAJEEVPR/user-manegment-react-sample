import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify'

function AddUser() {

    const navigate = useNavigate()

    const [value, setValue] = useState({
        email: "",
        passowrd: ""
    })

    const generateError = (err) => toast.error(err, {
        position: "bottom-right"
    })

    const addUser = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post("http://localhost:4000/admin/adduser", {
                ...value
            }, { withCredentials: true })
            console.log(data)
            if (data) {
                if (data.errors) {
                    const { email, password } = data.errors
                    if (email) generateError(email)
                    else if (password) generateError(password)
                } else {
                    navigate("/admin")
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='body'>
                <div className='container_lr'>
                    <h2>Add user</h2>
                    <form onSubmit={addUser}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" name='email' placeholder='Email' onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })} />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type='password' name='password' placeholder='Password' onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })} />
                        </div>
                        <button type='submit'>Add User</button>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}

export default AddUser