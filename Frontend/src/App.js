import React, { useState } from 'react';
import CoffeeControl from './components/coffeeControl/CoffeeControl.jsx';
import CoffeeDisplay from './components/coffeeDisplay/CoffeeDisplay.jsx';
import ManageBeans from './components/manageBeans/ManageBeans.jsx';
import Header from './components/header/Header.jsx';
import Login from './components/login/Login.jsx';
import SignUp from './components/signup/Signup.jsx';
import moment from 'moment';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MyRatings from './components/myratings/MyRatings.jsx';
import BrewHistory from './components/brewhistory/BrewHistory.jsx';
import Users from './components/users/Users.jsx';

function App() {

  // Check if thereis a logged in user
  const user = localStorage.getItem('userToken');

  const [initialState, setInitialState] = useState(
    {
      coffee: {
        brewedAt: '2022-02-28T09:17:57.652Z',
        litersBrewed: '1.5'
      },
      accesstoken: null
    }
  )

  const handleNewCoffee = (newBrew) => {
    console.log("App.js -> New coffee!!!", newBrew);
    //New coffee ready. This is:
    //litersBrewed = newLitres
    //brewAt = current datew
    setInitialState({
      coffee: {
        ...newBrew,
        brewedAt: moment().toISOString()
      }
    });
  }

  const updateToken = (token) => {
    setInitialState({
      accesstoken: token
    })
  }




  return (
    <div className="App">
      <BrowserRouter>
        {/* <Header /> */}
        <main>
          <Routes>
            <Route path="/" element={<CoffeeDisplay />} />
            <Route
              path="/brew-updater"
              element={<CoffeeControl onChange={handleNewCoffee} />}
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