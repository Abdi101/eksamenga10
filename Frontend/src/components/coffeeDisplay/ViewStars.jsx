import React, { useState } from 'react';
import StarRating from "../starrating/StarRating";
import { Star, StarBorder } from '@mui/icons-material';

function ViewStars(props) {
    const userToken = localStorage.getItem('userToken');

    const [show, setShow] = useState(false);
    const [rateValue, setRateValue] = useState('');

    const handleRate = () =>{
        props.handleRating(rateValue);
        setShow(!show);
    }

    return (
        <>
            <div style={{
                flexDirection: "column",
                display: "flex",
                marginBottom: "4rem",
                alignItems: "center",
                justifyContent: "center",
            }} className="container neumorphism-card">
                <h2 style={{ textAlign: "left" }}>Brew Recipe</h2>
                <div style={{
                    width: "100%",
                    padding: "20px",
                    display: "flex",
                    alignItems: "center",
                }}>
                    <div style={{
                        flex: "1",
                        display: "flex",
                        marginBottom: "20px",
                        fontSize: "1.3rem",
                        justifyContent: "space-around",
                    }}>
                        <span><b>Coffee: </b>{props.coffeeInfo.typeOfCoffee}</span>
                        <span><b>Grinding Settings: </b>{props.coffeeInfo.grindingSettings}</span>
                        <span><b>Water: </b>{props.coffeeInfo.litersBrewed>0 ? props.coffeeInfo.litersBrewed+"L" : props.coffeeInfo.litersBrewed}</span>
                        {console.log()}
                        <StarRating {...props.rating}/>

                    </div>
                </div>

                {userToken &&
                    <div style={{display: "flex", flexDirection: "row", width: "inherit", justifyContent: "center"}}>
                        {show && <input
                            type="number"
                            min="1" max="5"
                            placeholder="1-5"
                            onChange={(e) => { setRateValue( e.target.value ) }}
                            style={{
                                padding: "10px",
                                textAlign: "center",
                                width: "unset"
                            }}
                        />}
                        <button onClick={handleRate} className="ratingButton">Rate This Brew</button>
                    </div>
                }
            </div>
        </>
    )
}

export default ViewStars;