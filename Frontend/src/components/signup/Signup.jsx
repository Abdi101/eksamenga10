import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { makeRequest } from '../../api/requests';
import Header from "../header/Header";
import "../login/Login.css";

function SignUp({ updateToken }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    function handleInputChange(e) {
        let newValue = e.target.value;
        switch (e.target.type) {
            case "email":
                setEmail(newValue)
                break;
            case "password":
                setPassword(newValue)
                break;
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        let payload = {
            apiEndpoint: '/users/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: { email, password }
        }

        setIsLoading(true);

        makeRequest(payload, (err, data) => {
            if (data) {
                setIsLoading(false);
                updateToken(data.token);
                navigate('/login');
            } else {
                setIsLoading(false);
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
            <h1>Create an Account</h1>
            <form className="signUpForm">
                {error && <p className="error-message">{error}</p>}
                <label className="loginLabel">
                    <span>Email</span>
                    <input
                        type="email"
                        autoComplete="false"
                        placeholder="example@mail.com"
                        value={email}
                        onChange={handleInputChange}
                    />
                </label>

                <label className="loginLabel">
                    <span>Password</span>
                    <input
                        type="password"
                        autoComplete="false"
                        placeholder="3 characters min-length"
                        value={password}
                        onChange={handleInputChange}
                    />
                </label>

                <p>Already have an Account: <Link to='/login'>Login</Link></p>

                <input
                    type="submit"
                    value={isLoading ? 'Loading...' : 'Signup \u2192'}
                    className="submit-btn"
                    onClick={handleSubmit}
                />
            </form>
        </>
    )
}

export default SignUp;