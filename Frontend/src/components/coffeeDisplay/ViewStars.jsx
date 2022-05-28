import React, { useState } from 'react';
import StarRating from "../starrating/StarRating";
import { Star, StarBorder } from '@mui/icons-material';

function ViewStars(props) {
    const userToken = localStorage.getItem('userToken');

    const [show, setShow] = useState(false);



    return (
        <>
            <div style={{
                flexDirection: "column",
                display: "flex",
                width: "60%",
                marginBottom: "40px",
                margin: "auto",
                alignItems: "center",
                justifyContent: "center",
                                    color: "black",
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
                        <span><b>Coffee: </b>Evergood Classic</span>
                        <span><b>Grinding Settings: </b>1</span>
                        <span><b>Water: </b>1.5l</span>
                        <StarRating/>

                    </div>
                </div>

                {userToken &&
                    <div>
                        <button
                            onClick={() => setShow(!show)}
                            style={{
                                width: "200px",
                                backgroundColor: "black",
                                color: "white",
                                padding: "10px 15px",
                                fontSize: "17px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                marginTop: "20px",
                                marginBottom: "15px",
                                margin: "auto",
                                marginTop: "20px"
                            }}>Rate This Brew</button>
                        {show && <input
                            type="text"
                            placeholder="Rate us"
                            style={{
                                width: '90%',
                                padding: "10px",
                                margin: "auto",
                                textAlign: "center",
                                marginBottom: "20px",
                                marginTop: "20px",
                            }}
                        />}
                    </div>
                }
            </div>
        </>
    )
}

export default ViewStars;