import Navbar from '../navbar/Navbar';
import "./users.css"
import Header from "../header/Header";
import { useEffect, useState } from 'react';
import axios from 'axios';

function Users(props) {

    const userToken = localStorage.getItem('userToken');

    const [values, setValues] = useState([])
    const [error, setError] = useState("")


    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const res = await axios.get("http://localhost:3001/api/allusers", {
                    headers: {
                        token: `Bearer ${userToken}`
                    }
                })
                // console.log(res.data)
                setValues(res.data)
                // console.log(object)
            } catch (err) {
                setError(err)
                console.log(err);
            }
        }
        getAllUsers()
    }, [])
    // console.log(values)

    const handleDelete = async () => {
        // setValues(values.filter(value => value.id !== id))
        await axios.delete(`http://localhost:3001/remove/${values._id}`, {
            headers: {
                token: `Bearer ${userToken}`
            }
        })
    }

    return (
        <div>
            <Header />

            {
                userToken && <div style={{
                    backgroundColor: 'rgb(27, 28, 35)',
                    width: '100%',
                    margin: 0
                }}>
                    <Navbar />
                </div>
            }

            <div className='userData container neumorphism-card' id="top-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            values.map((value, id) => (
                                <tr key={id}>
                                    <td>{value._id}</td>
                                    <td>{value.email}</td>
                                    <td>Active</td>
                                    <td>
                                        <button className='delete' onClick={handleDelete}>Delete</button>
                                        <button className='edit'>Edit</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users;
