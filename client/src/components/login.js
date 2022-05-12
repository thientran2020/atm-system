import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../css/login.css';

async function loginUser(credentials) {
    return fetch('http://localhost:4040/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json())
}

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await loginUser({  
            "username": username,
            "password": password
        });

        if (response.message !== "Success") {
            alert(response.message)
            window.location.reload()
        }

        if (response.accessToken) {
            setToken(response.accessToken)
            localStorage.setItem('username', username);
            window.location.reload()
        }
    }

    return(
        <div className="login-container">
            <div className="app-header">
                <h1>SJSU ONLINE BANKING</h1>
            </div>
            <div className="div-container">
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Username</p>
                        <input type="text" 
                            onChange={e => setUserName(e.target.value)}/>
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" 
                            onChange={e => setPassword(e.target.value)}/>
                    </label>
                    <div>
                        <button id="login_button" type="submit">LOG IN</button>
                    </div>
                </form>
                <p><a href="/registration">Not registered yet? Register here!</a></p>
            </div>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}