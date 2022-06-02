import { Star, StarBorder } from '@mui/icons-material';
import React, { useState } from 'react'
import axios from 'axios';
import moment from "moment";
import StarRating from "../starrating/StarRating";
import RateBrew from "./RateBrew";


const SingleBrewHistory = (props) => {
    const brew = props.brew;
    const [showInput, setShowInput] = useState(false);

    const handleNewRating = async () => {
        setShowInput(!showInput)
        const res = axios.post("http://localhost:3001/api/ratings", {
            headers: {
                token: `Bearer ${localStorage.getItem("userToken")}`
            }
        })
        console.log(res.data);
    }

    const handleUpdate = (data) =>{
        props.updateBrew(data);
    }

    return (
        <div  className="brew-hist-info">
            <span><b>Brewed:</b><br/> {moment((brew.createdAt)).fromNow()}</span>
            <span><b>Brew name:</b><br/> {brew.coffeeBeanId.name} </span>
            <span><b>Grams:</b><br/> {brew.gramsOfCoffee} </span>
            <span><b>water:</b><br/> {brew.litresOfWater} </span>
            <span><b>grinding level:</b><br/> {brew.grindingSettings} </span>
            {brew.rating? <StarRating rating={brew.rating}/> : <RateBrew brew={brew} update={handleUpdate}/>}
        </div>
    )
}

export default SingleBrewHistory;
