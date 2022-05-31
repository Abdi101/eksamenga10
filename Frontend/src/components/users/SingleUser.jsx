import Navbar from '../navbar/Navbar';
import "./users.css"
import Header from "../header/Header";
import { useEffect, useState } from 'react';
import EditUserModal from './EditUserModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import axios from 'axios';

function SingleUser(props) {
    const data = props.data;
    const editModalTitle = "Edit user";
    const userToken = localStorage.getItem('userToken');

    const [id, setId] = useState("");
    const [error, setError] = useState("");
    const [modalVisible,setModalVisible] = useState(false);
    const [delModalVisible,setDelModalVisible] = useState(false);

    useEffect(() => {}, [])

    const handleEdit = (formData) => {
        console.log(formData);
            props.onClick(formData);
    }

    const handleDelete = () => {
            setDelModalVisible(false);
            props.deleteUser(data._id);
    }

    return (
        <>
            <tr key={id}>
                <td>{data.email}</td>
                <td>{data.isAdmin ? "yes" : "no"}</td>
                <td>
                    <button className='delete userButton' onClick={() => {setDelModalVisible(true)}}>Delete</button>
                    <button className='edit userButton' onClick={() => {setModalVisible(true)}}>Edit</button>
                </td>
            </tr>
            {modalVisible && <EditUserModal closeModal={setModalVisible} title={editModalTitle} data={data} onClick={handleEdit}/>}
            {delModalVisible && <ConfirmDeleteModal closeModal={setDelModalVisible} deleteUser={handleDelete}/>}
        </>
    )
}

export default SingleUser;
    