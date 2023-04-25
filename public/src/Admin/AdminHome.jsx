import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useCookies  } from 'react-cookie'
import { useEffect   } from 'react'
import { useState    } from 'react'
import { setUserId   } from '../Redux/Admin/AdminSlice'


function AdminHome() {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const [cookies, removeCookie] = useCookies([])
    const [query, setQuery] = useState("")

    useEffect(() => {

        const verifyAdmin = async () => {
            if (!cookies.adminjwt) {
             
                navigate("/admin/login")
            } else {
                const { data } = await axios.post("http://localhost:4000/admin",
                    {},
                    { withCredentials: true }
                ).catch(err => console.log(err)).then(res => console.log(res))
                if (!data.status) {
                    removeCookie("adminjwt")
                    navigate("/admin/login")
                }
            }

        }
        verifyAdmin()

    }, [cookies, navigate, removeCookie])

    useEffect(() => {
        axios.get("http://localhost:4000/getallusers").then((response) => {
            setUsers(response.data.data)
        }).catch((err) => {
            console.log(err)
        })
    },[]);

    const deleteUser = async (id) => {
        console.log(id)
        axios.post(`http://localhost:4000/admin/delete-user/${id}`,
            {},
            { withCredentials: true }
        ).then((res) => {
            console.log(res)
            if (res.data.deleted) {
                setUsers(users.filter(user => user._id !== id))
            }
        })
    }


    const logOut = (e) => {
        console.log("vanno");
        removeCookie("adminjwt")
        navigate("/admin/login")
    }

  return (
    <div>
        <nav  className="navbar navbar-expand-lg navbar-light bg-light">
                <span  className="navbar-brand" style={{ cursor: "pointer" }} >Admin Panel</span>
                 

                <div  className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul  className="navbar-nav mr-auto">
                  
                    </ul>
                    <form  className="form-inline my-2 my-lg-0">
                        <input
                             className="form-control mr-sm-2"
                            type="search" placeholder="Search"
                            aria-label="Search"
                             onChange={(e) => setQuery(e.target.value)}
                        />
                       <button onClick={() => navigate('/admin/adduser')}  className="btn btn-outline-success my-2 my-sm-0" type="submit">Add User</button> 
                        <button
                         onClick={logOut} 
                         className="btn btn-outline-success my-2 my-sm-0" type='button' >Logout</button>
                    </form>
                </div>
            </nav>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", marginTop: "3rem" }}>
                <table  className="table" style={{ width: "1000px" }}>
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.filter((user) => 
                            user.email.toLowerCase().includes(query))
                            .map((user, index) => {
                                // console.log(user.email);
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                         <td>{user.email}</td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    dispatch(setUserId({ userId: user._id, userEmail: user.email }))
                                                    navigate("/admin/edit-user")
                                                }}
                                                className='btn btn-warning'
                                                style={{ margin: "5px" }}
                                            >Edit</button>
                                            <button
                                                className='btn btn-danger'
                                                style={{ margin: "5px" }}
                                                 onClick={() => deleteUser(user._id)}
                                            >DELETE</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
    </div>
  )
}

export default AdminHome