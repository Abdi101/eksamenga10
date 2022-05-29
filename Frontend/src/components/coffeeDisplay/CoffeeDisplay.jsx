import React from 'react';
import Thermos from '../thermos/Thermos';
import CoffeeInfo from '../coffeeInfo/CoffeeInfo';
import ViewStars from './ViewStars';
import Navbar from '../navbar/Navbar';
import Header from '../header/Header';

function CoffeeDisplay(props) {
    console.log(props);
    const userToken = localStorage.getItem('userToken');

    return (
        <div>
            <Header />
            {userToken && <div style={{
                backgroundColor: '#1b1c23',
                width: '100%',
                margin: 0
            }}>
                <Navbar />
            </div>}

            <h1>Thermos Status</h1>
            <div id="top-container" className="container neumorphism-card">
                <Thermos {...props} />
                <CoffeeInfo {...props} />
            </div>
            <ViewStars {...props} />

        </div>
    )
}

export default CoffeeDisplay;