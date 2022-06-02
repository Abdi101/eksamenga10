import React, { useState, useEffect } from 'react';
import CoffeeControl from './components/coffeeControl/CoffeeControl.jsx';
import CoffeeDisplay from './components/coffeeDisplay/CoffeeDisplay.jsx';
import ManageBeans from './components/manageBeans/ManageBeans.jsx';
import Header from './components/header/Header.jsx';
import Login from './components/login/Login.jsx';
import SignUp from './components/signup/Signup.jsx';
import moment from 'moment';
import { makeRequest } from './api/requests';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MyRatings from './components/myratings/MyRatings.jsx';
import BrewHistory from './components/brewhistory/BrewHistory.jsx';
import Users from './components/users/Users.jsx';
import axios from 'axios';


function App() {

  // Check if thereis a logged in user
  const user = localStorage.getItem('userToken');
  const [coffeRating, setCoffeRating] = useState({rating: ''});
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');

  const [initialState, setInitialState] = useState(
    {
      coffee: {
        brewedAt: '',
        litersBrewed: '',
        typeOfCoffee: '',
        grindingSettings: '',
        brewId: ''
      },
      accesstoken: null,
    }
  )

  const handleNewCoffee = (newBrew) => {
    console.log(newBrew);
    createBrew(newBrew);
    getLatestBrew();
  }

  const updateToken = (token) => {
    setInitialState({ ...initialState,
      accesstoken: token
    })
  }

  const getLatestBrew = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/brews/new`, {})
            const newestBrew = res.data.brew[0];
            console.log(newestBrew);
                setInitialState({ ...initialState,
          coffee: {
        brewedAt: newestBrew.createdAt,
        litersBrewed: newestBrew.litresOfWater,
        typeOfCoffee: newestBrew.coffeeBeanId.name,
        grindingSettings: newestBrew.grindingSettings,
        brewId: newestBrew._id
      }
        });
      getBrewRatings(newestBrew._id);
        } catch (err) {
            setError(err);
            console.log(err);
        }
    }

    const getBrewRatings = async (brewId) => {
      console.log(brewId);
        let payload = {
            apiEndpoint: `/ratings/brew/?brewId=${brewId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${user}`,
                'Access-Control-Allow-Origin': '*'
            }
        }
        //console.log(payload);
        makeRequest(payload, (err, data) => {
            if (data) {
              console.log(data);
              getAverage(data);
                setError(null);
            } else {
                console.log(err);
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

    const newRating = async (rating) => {
        let payload = {
            apiEndpoint: `/ratings/`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${user}`,
                'Access-Control-Allow-Origin': '*'
            },
            body: {
                brewId: initialState.coffee.brewId,
                rating: parseInt(rating),
                userId: userId
            }
        }
        console.log(payload);
        makeRequest(payload, (err, data) => {
            if (data) {
                setError(null);
                console.log(data);
                getLatestBrew();
            } else {
                console.log(err);
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

  const getAverage = (ratings)=> {
      let count = 0;
      let totalRating = 0;
      
      for (let i = 0; i < ratings.length; i++) {
        count++;
        totalRating += ratings[i].rating;
      }

      let ratingAVG = count ? Math.round(totalRating / count) : count;
      setCoffeRating({rating: ratingAVG});
  }

  useEffect(() => {
    getLatestBrew();
  }, []);

    const createBrew = async (brewData) => {
        let payload = {
            apiEndpoint: `/brews`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${user}`,
                'Access-Control-Allow-Origin': '*'
            },
            body: {
                coffeeBeanId: brewData.coffeeBeanId,
                gramsOfCoffee: brewData.gramsOfCoffee,
                grindingSettings: brewData.grindingSettings,
                litresOfWater: brewData.litersBrewed
            }
        }
        //console.log(payload);
        makeRequest(payload, (err, data) => {
            if (data) {
                setError(null);
                console.log(data);
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
    <div className="App">
      <BrowserRouter>
        {/* <Header /> */}
        <main>
          <Routes>
            <Route path="/" element={<CoffeeDisplay coffeeInfo={initialState.coffee} rating={coffeRating} createRating={newRating}/>} />
            <Route
              path="/brew-updater"
              element={<CoffeeControl onChange={handleNewCoffee} {...initialState.coffee}/>}
            />
            <Route
              path="/my-ratings"
              element={<MyRatings />}
            />
            <Route
              path="/brew-history"
              element={<BrewHistory />}
            />
            <Route
              path="/users"
              element={<Users />}
            />
            <Route
              path="/coffee-beans"
              element={<ManageBeans />}
            />
            <Route
              path="/login"
              element={<Login
              // updateToken={updateToken}
              // initialState={initialState}
              // setInitialState={setInitialState}
              />} />
            <Route path="/signup" element={<SignUp updateToken={updateToken} />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;