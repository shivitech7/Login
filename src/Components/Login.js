import React, { useState } from 'react';
import axios from 'axios'
import './Login.css';
import Dashbord from './Dashbord';

const Login = () => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [loggedIn, setLoggedIn] = useState(false);

    const loginUser = async () => {
        console.log("inside loginUser");
        const Body = {
            "uid": username,
            "password": password,
            "blocked": 0
        }

        await axios.post('https://myphysio.digitaldarwin.in/api/login/', Body)
            .then(async (res) => {
                console.log("response: ", res);
                if (res.data) {
                    console.log("successful")
                    localStorage.setItem("userData", JSON.stringify(res.data));
                    setLoggedIn(true);
                }
            })
            .catch((err) => {
                console.log("api connection failed! ", err);
            })
    }
    return (
        <div>
            {
                !loggedIn ?
                    <div className="login_container">
                        <div className="form_title">
                            <h1>PHYSIOAI</h1>
                            <h1>Welcome Back!</h1>
                        </div>
                        <div className="form_container">
                            <div className="form">
                                <div className="form_field">
                                    <h3>Username</h3><br />
                                    <input onChange={(e) => { setUserName(e.target.value) }} className="form_input" />
                                </div>
                                <div className="form_field">
                                    <h3>Password</h3><br />
                                    <input onChange={(e) => { setPassword(e.target.value) }} className="form_input" />
                                </div>
                                <div className="form_bottom">
                                    <p>Forgot Password?</p>
                                    <button onClick={() => { loginUser() }} type="submit" name="Login">Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <Dashbord />
            }
        </div>
    )
}

export default Login;