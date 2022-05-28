import { Star, StarBorder } from '@mui/icons-material';
import React from 'react'

const SingleBrewHistory = () => {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginBottom: "15px",
        }}>
            <div style={{
                marginRight: "10px"
            }}>28/02/2022</div>
            <div style={{
                backgroundColor: "#ccc",
                width: "100%",
                // backgroundColor: "#eee",
                padding: "20px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <div style={{
                    flex: "1",
                    display: "flex"
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
            {/* <button style={{
                color: "white",
                marginLeft: "10px",
                padding: "0 15px",
                backgroundColor: "#444",
                fontWeight: 600,
                fontSize: "17px",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
            }}>Edit</button> */}
        </div >
    )
}

export default SingleBrewHistory;
