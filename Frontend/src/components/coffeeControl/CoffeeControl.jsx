import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CoffeeButton from '../coffeeButton/CoffeeButton';
import Thermos from '../thermos/Thermos';
import { makeRequest } from '../../api/requests';
import DropDownMenu from './DropDownMenu';
import './CoffeeControl.css';
import Header from '../header/Header';
import Navbar from '../navbar/Navbar';

const CoffeeControl = (props) => {

    const [menuItems, setMenuItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [brew, setBrew] = useState({
        coffeeBeanId: null,
        grindingSettings: "",
        gramsOfCoffee: "",
        litresOfWater: null,
        typeOfCoffee: ""
    });
    const navigate = useNavigate();

    const token = localStorage.getItem("userToken")

    useEffect(() => {
        if (!token) navigate('/login');
        let payload = {
            apiEndpoint: '/beans',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`
            },
        }

        setIsLoading(true);

        makeRequest(payload, (err, data) => {
            if (data) {
                setIsLoading(false);
                setError(null);
                setMenuItems(data.coffeeBeans);
                console.log(menuItems);
            } else {
                setIsLoading(false);
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
    }, [])

    const handleOnClick = (newLiters) => {
        console.log("CoffeeControl (handleClick): ", newLiters);
        setBrew({ ...brew, litresOfWater: newLiters, litersBrewed: newLiters })
        props.onChange({ ...brew, litresOfWater: newLiters, litersBrewed: newLiters });
    }

    const updateBrew = (brewAttribute) => {
        setBrew({ ...brew, ...brewAttribute });
    }

    return (
        <div>
            <Header />
            {token && <div style={{
                backgroundColor: '#1b1c23',
                width: '100%',
                margin: 0
            }}>
                <Navbar />
            </div>}
            <h1>Prepare Coffee</h1>
            {error && <p className="error-message">{error}</p>}
            <div className="container neumorphism-card">
            <div className="CoffeeControl">
                <Thermos {...props} />

                <div className="flex-columns">
                    {isLoading ? "Loading..." : (
                        <DropDownMenu
                            items={
                                {
                                    list: menuItems,
                                    option: "Type of Coffee",
                                    placeholder: "choose type",
                                    attribute: "coffeeBeanId",
                                    beanName: "typeOfCoffee"
                                }}
                            updateBrew={updateBrew}
                            brew={brew}
                        />)
                    }

                    {brew.coffeeBeanId && (
                        <DropDownMenu
                            items={
                                {
                                    list: [1, 2, 4, 5, 6, 7],
                                    option: "Choose Grinding Level",
                                    placeholder: "Choose Grinding Level",
                                    attribute: "grindingSettings",
                                    beanName: "typeOfCoffee"
                                }}
                            updateBrew={updateBrew}
                            brew={brew}
                        />)
                    }

                    {
                        brew.grindingSettings && (
                            <label className="control-label">
                                <span>Grams of Coffee</span>
                                <input
                                    type="text"
                                    placeholder="300"
                                    value={brew.gramsOfCoffee}
                                    autoFocus={true}
                                    onChange={(e) => { setBrew({ ...brew, gramsOfCoffee: e.target.value }) }}
                                    style={{backgroundColor: "#2b2c38", border: "1px solid #343543", color: "#f6f6f6"}}
                                />
                            </label>
                        )
                    }


                   {brew.gramsOfCoffee && <><CoffeeButton litersToBrew='2.2' onClick={handleOnClick} />
                    <CoffeeButton litersToBrew='1.1' onClick={handleOnClick} />
                    <CoffeeButton litersToBrew='0.5' onClick={handleOnClick} /> </>}
                    {/* {
                        brew.gramsOfCoffee && (
                            <>
                                <CoffeeButton litersToBrew='2.2' onClick={handleOnClick} />
                                <CoffeeButton litersToBrew='1.1' onClick={handleOnClick} />
                                <CoffeeButton litersToBrew='0.5' onClick={handleOnClick} />
                            </>
                        )
                    } */}

                </div>
                <p style={{"gridRow": "2 / 3", "gridColumn": "1 / 3"}}>
                    <Link to="/">
                        View Brewed Coffee Info &rarr;
                    </Link>

                </p>
            </div>
        </div>
        </div>
    );
}

//Default props here to define empty function to lift state up
CoffeeControl.defaultProps = {
    onChange: () => { }
}

export default CoffeeControl;

