import React from 'react';
import { loginUrl } from '../../config/spotify';
import "./Login.css";

const Login = () => {
    return (
        <section className="login">
            <img src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="Spotify Logo"/>
            <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
        </section>
    )
}

export default Login;
