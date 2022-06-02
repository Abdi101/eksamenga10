import { useEffect, useState } from "react";
import Header from "../header/Header";
import "../myratings/myratings.css"
import Navbar from "../navbar/Navbar";
import axios from "axios";
import SingleBrewHistory from './SingleBrewHistory';
import './BrewHistory.css';
import { makeRequest } from '../../api/requests';


const BrewHistory = () => {

  const [brews, setBrews] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [ratedBrews, setRatedBrews] = useState([]);
  const [update,setUpdate] = useState(null);
  const userID = localStorage.getItem('userId');
  const userToken = localStorage.getItem('userToken');
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllBrewsAndRatings();
  }, []);

  const getAllBrewsAndRatings = async () => {
    const brews = await axios.get("http://localhost:3001/api/brews",{
      headers: {
        token: `Bearer ${userToken}`
      }
    });

    const ratings = await axios.get("http://localhost:3001/api/ratings/all", {
      headers: {
        token: `Bearer ${userToken}`
      }
    });
    setBrews(brews.data.brew);
    setRatings(ratings.data);
    getAverage(brews.data.brew , ratings.data);
  }

  // get the average rating for each brew
  // loop through the brews as we check the ratings which are then added to the brew object
  const getAverage = (brews,ratings)=>{
    
    let brewsArray = brews;
    let ratingsArray = ratings;
    
    for(let brew of brewsArray){
      let count = 0;
      let totalRating = 0;
      for(let rating of ratingsArray){
        if(rating.brewId === brew._id){
          count++;
          totalRating += +rating.rating;
        }
      }

      brew.rating = count ? Math.round(totalRating / count) : count;
      count = 0;
      totalRating = 0;
    }

    setRatedBrews(brewsArray);
  }

  const updateBrew = (data) =>{
    console.log(data);
   /* let brews = ratedBrews;
    for(let brew of brews){
      if(brew._id === id){
        brew.rating = rating;
      }
    }
    setRatedBrews(brews);
    console.log(brews);
    setUpdate(id);*/
  }

    const createRating = async (data) => {
        console.log(data);
        let payload = {
            apiEndpoint: '/ratings/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${userToken}`,
                'Access-Control-Allow-Origin': '*'
            },
            body: {
                brewId: data.brewID,
                userId: userID,
                rating: data.rating
            }
        }
        console.log(payload);
        makeRequest(payload, (err, data) => {
            if (data) {
                setError(null);
                getAllBrewsAndRatings();
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
        {
          ratedBrews && (
            ratedBrews.map((brew,index)=>(
              <SingleBrewHistory brew={brew} updateBrew={createRating} key={index}/>
            ))
          )
        }
      </div>
      
    </>
  )
}

export default BrewHistory;