import { useEffect, useState } from "react";
import Header from "../header/Header";
import "../myratings/myratings.css"
import Navbar from "../navbar/Navbar";
import axios from "axios";
import SingleBrewHistory from './SingleBrewHitory';

const BrewHistory = () => {

  const [brew, setBrew] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getAllBrews = async () => {
      const res = await axios.get("http://localhost:3001/api/brews", {
        headers: {
          token: `Bearer ${localStorage.getItem("userToken")}`
        }
      });
      console.log(res.data)
      setBrew(res.data.brew);
    }
    getAllBrews();
  }, []);

  // Get average rating for all the brew
  const [ratings, setRatings] = useState([])
  useEffect(() => {
    window.scrollTo(0, 0);
    const getAllRatings = async () => {
      const res = await axios.get("http://localhost:3001/api/ratings/all", {
        headers: {
          token: `Bearer ${localStorage.getItem("userToken")}`
        }
      });
      console.log(res.data)
      setRatings(res.data);
    }
    getAllRatings();
  }, []);


  // Get average rating for all the brews
  const averageRating = (ratings) => {
    let sum = 0;
    let count = 0;
    ratings.forEach(rating => {
      sum += rating.rating;
      count++;
    });
    return sum / count;
  }

  useEffect(() => {
    averageRating(ratings);
  }, [ratings]);

  const brewsNotVotedFor = (ratings) => {
    let brews = [];
    brew.forEach(brew => {
      if (!ratings.find(rating => rating.brewId === brew._id)) {
        brews.push(brew);
      }
    });
    return brews;           
  }


  return (
    <>
      <Header />
      <div
        style={{
          backgroundColor: '#1b1c23',
          width: '100%',
          margin: 0
        }}>
        <Navbar />
      </div>
      <h1>Brew history</h1>
      <div className="containerInner container neumorphism-card" style={{ marginTop: "20px", color: "#d9d9d9" }}>
        <SingleBrewHistory />
        <SingleBrewHistory />
        <SingleBrewHistory />
        <SingleBrewHistory />
      </div>
      <div style={{
        margin: "20px auto",
        width: "50%",
        borderRadius: "10px",
        textAlign: "center",
        color: "#d9d9d9",
        backgroundColor: "#1b1c23",
        height: "auto"
      }}>
        <h2>Brews:</h2>
        {/* <div>
          {brew.reduce((a, b) => a + b.rating, 0) / brew.length}
        </div> */}


        {brew.map((brw, index) => (
          <div key={index}>
            <h3>{brw._id}</h3>
          </div>
        ))}


        <h2>Average Ratings:</h2>
        {/* <div>
          {brew.reduce((a, b) => a + b.rating, 0) / brew.length}
        </div> */}


        {ratings.map((rating, index) => (
          <div key={index}>
            <h3>{rating.rating}</h3>
          </div>
        ))}


        <h2>Brews Voted For:</h2>
        {ratings.map((rating, index) => (
          <div key={index}>
            <h3>{rating.brewId}</h3>
          </div>
        ))}
              
        <h2>Brews Not Voted For:</h2>
        {brewsNotVotedFor(ratings).map((brew, index) => (
          <div key={index}>
            <h3>{brew._id}</h3>
          </div>
        ))}

        {/* {ratings.reduce((a, b) => a + b.ratings, 0) / ratings.length} */}
      </div>


    </>
  )
}

export default BrewHistory;
