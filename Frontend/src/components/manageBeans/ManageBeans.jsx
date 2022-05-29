import { useState, useEffect, useCallback } from 'react';
import SingleBean from './SingleBean';
import { makeRequest } from '../../api/requests';
import Header from '../header/Header';
import Navbar from '../navbar/Navbar';
import './ManageBeans.css';
import axios from 'axios';

const ManageBeans = (props) => {

    const [menuItems, setMenuItems] = useState([]);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("userToken");
    const isAdmin = localStorage.getItem('isAdmin');
    const userID = localStorage.getItem('userId');

    const getBeans = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/beans/`, {
                headers: {
                    token: `Bearer ${token}`
                }
            })
            
           setMenuItems(res.data.coffeeBeans);

        } catch (err) {
            setError(err);
            console.log(err);
        }
    }

    useEffect(() => {
        getBeans();
    }, [])


    const updateBeans = async (beanData) => {
        let payload = {
            apiEndpoint: `/beans/${beanData._id}`,
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*'
            },
            body: {
                brand: beanData.brand,
                countryOfOrigin: beanData.countryOfOrigin,
                description: beanData.description,
                name: beanData.name,
                price: parseInt(beanData.price),
                roastProfile: beanData.roastProfile,
                roastType: beanData.roastType
            }
        }
        //console.log(payload);
        makeRequest(payload, (err, data) => {
            if (data) {
                setError(null);
                console.log(data);
                getBeans();
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
        <div>{console.log("rednered")}
            <Header />
            {
                token &&
                <div style={{ backgroundColor: '#1b1c23', width: '100%', margin: 0 }}>
                <Navbar />
                </div>
            }
            <h1>Manage Beans</h1>
            {
                error && <p className="error-message">{error}</p>
            }
            <div className="container neumorphism-card">
            <div className="beansList">
            <SingleBean/>
            {menuItems.map(content => (
                <SingleBean key={content._id} data={content} isAdmin={isAdmin} onClick={updateBeans}/>
            ))}
            </div>
            </div>
        </div>
    );
}

//Default props here to define empty function to lift state up
ManageBeans.defaultProps = {
    onChange: () => {}
}

export default ManageBeans;