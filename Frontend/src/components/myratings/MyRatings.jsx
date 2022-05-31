import "./myratings.css";
import ViewStars from '../coffeeDisplay/ViewStars';
import Navbar from '../navbar/Navbar';
import SingleRating from "./SingleRating";
import Header from "../header/Header";
import { makeRequest } from '../../api/requests';
import { useEffect, useState } from 'react';
import axios from 'axios';

function MyRatings(props) {

    const userToken = localStorage.getItem('userToken');
    const userID = localStorage.getItem('userId');

    const [values, setValues] = useState([]);
    const [error, setError] = useState("");

    const getMyRatings = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/ratings?userId=${userID}`, {
                headers: {
                    token: `Bearer ${userToken}`
                }
            })
            setValues(res.data);
        } catch (err) {
            setError(err);
            console.log(err);
        }
    }

    useEffect(() => {
        getMyRatings();
    }, [])

    const updateRating = async (newRating, ratingData) => {
        let payload = {
            apiEndpoint: `/ratings/${ratingData._id}`,
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${userToken}`,
                'Access-Control-Allow-Origin': '*'
            },
            body: {
                brewId: ratingData.brewId._id,
                rating: parseInt(newRating.newRating),
                userId: ratingData.userId
            }
        }

        makeRequest(payload, (err, data) => {
            if (data) {
                setError(null);
                getMyRatings();
                //console.log(data);
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

        getMyRatings();
    }

    return (
        <div>
            <Header />

            {
                userToken && <div style={{
                    width: '100%',
                    backgroundColor: '#1b1c23',
                    margin: 0
                }}>
                    <Navbar />
                </div>
            }
            <h1>My ratings</h1>
            <div className="containerInner neumorphism-card  container" style={{color: "#d9d9d9"}}>
              {values.length == 0 ? (<h1>You have no ratings</h1>) : ""}
              {values.map(content => (
                <SingleRating key={content._id} data={content} onClick={updateRating}/>
              ))}

            </div>
        </div>
    )
}


export default MyRatings;