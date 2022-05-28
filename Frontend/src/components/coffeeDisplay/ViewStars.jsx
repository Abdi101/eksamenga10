import React, { useState } from 'react';
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
            }}>
                <h2 style={{ textAlign: "left" }}>Brew Recipe</h2>
                <div style={{
                    backgroundColor: "#ccc",
                    width: "100%",
                    padding: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <div style={{
                        flex: "1",
                        display: "flex",
                        marginBottom: "20px"
                    }}>
                        <span>Coffee:</span>
                        <span style={{
                            fontWeight: 700,
                            marginRight: "10px",
                            marginLeft: "3px"
                        }}>Evergood Classic</span>
                        <span>Grinding Settings:</span>
                        <span style={{
                            fontWeight: 700,
                            marginRight: "10px",
                            marginLeft: "3px"
                        }}>7</span>
                        <span>Water:</span>
                        <span style={{
                            fontWeight: 700,
                            marginRight: "10px",
                            marginLeft: "3px"
                        }}>1.5l</span>
                        <span><Star /></span>
                        <span><Star /></span>
                        <span><Star /></span>
                        <span><Star /></span>
                        <span><StarBorder /></span>

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