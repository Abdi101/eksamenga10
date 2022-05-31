import Navbar from '../navbar/Navbar';
import "./users.css"
import { makeRequest } from '../../api/requests';
import Header from "../header/Header";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CreateUserModal from './CreateUserModal';
import SingleUser from './SingleUser';
import axios from 'axios';

function Users(props) {

    const userToken = localStorage.getItem('userToken');
    const navigate = useNavigate();
    const [values, setValues] = useState([])
    const [error, setError] = useState("")
    const [createModalVis, setCreateModalVis] = useState(false);
    const isAdmin = JSON.parse((localStorage.getItem('isAdmin')).toLowerCase());
    const editModalTitle = "Create new user";    

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

    useEffect(() => {
        if (!isAdmin) navigate('/');
        getAllUsers()
    }, [])
    // console.log(values)

    const handleDelete = async (value) => {
        console.log(value);
            let payload = {
                apiEndpoint: `/allusers/${value}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `Bearer ${userToken}`,
                    'Access-Control-Allow-Origin': '*'
                }
            }
            //console.log(payload);
            makeRequest(payload, (err, data) => {
                if (data) {
                    setError(null);
                    console.log(data);
                    getAllUsers();
                } else {
                    //console.log(err);
                    switch (typeof err.error) {
                        case "object":
                            setError(err.error.message)
                            break;
                        case "string":
                            setError(err.error)
                            break;
                    }
                }
            });
    }


    const handleEdit = async (data) => {
        let payload = {
            apiEndpoint: `/allusers/${data._id}`,
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${userToken}`,
                'Access-Control-Allow-Origin': '*'
            },
            body: {
                email: data.email,
                isAdmin: data.isAdmin
            }
        }
        //console.log(payload);
        makeRequest(payload, (err, data) => {
            if (data) {
                setError(null);
                getAllUsers();
            } else {
                //console.log(err);
                switch (typeof err.error) {
                    case "object":
                        setError(err.error.message)
                        break;
                    case "string":
                        setError(err.error)
                        break;
                }
            }
        });
    }

    const handleCreate = async (data) => {
        console.log(data);
        let payload = {
            apiEndpoint: '/users/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                email: data.email,
                password: data.password
            }
        }
        //console.log(payload);
        makeRequest(payload, (err, data) => {
            if (data) {
                setError(null);
                getAllUsers();
            } else {
                //console.log(err);
                switch (typeof err.error) {
                    case "object":
                        setError(err.error.message)
                        break;
                    case "string":
                        setError(err.error)
                        break;
                }
            }
        });
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
            <h1>Users</h1>
            {
                error && <p className="error-message">{error}</p>
            }
            <div className='userData container neumorphism-card' id="top-container">
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            values.map((value, id) => (
                                <SingleUser key={id} data={value} onClick={handleEdit} deleteUser={handleDelete}/>
                            ))
                        }
                        <tr>
                            <td colSpan="3" id="addNewUser">
                                <button className="newUserButton" onClick={() => {setCreateModalVis(true)}}>
                                    create new user
                                    <span className="circle plus"></span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {createModalVis && <CreateUserModal closeModal={setCreateModalVis} onClick={handleCreate} title={editModalTitle}/>}

            </div>
        </div>
    )
}

export default Users;