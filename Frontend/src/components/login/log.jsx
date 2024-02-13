import React from "react";
import Logo from "../../assets/Logo.png"
import Slogan from "../../assets/Raggruppa 22.png"
import { Link, Route } from "react-router-dom";
function Login() {
    return (
        //sfondo
        <div className="log_background">
        
            {/*logo*/}
            <img src={Logo} alt="Tomatime" className='logo_login' />
            {/*slogan e form */}
            <img src={Slogan} alt="time to focus for a break" className='slogan' />

        <form class="log" method="post">
        
            <h1 class="login">LOGIN</h1>
        
            {/* input email */}
            <div class="email">
                <input type="input" class="form__field" placeholder="Email" name="email" id='email' required />
                <label for="email" class="form__label">Email</label>
            </div>
        
            {/* input password */}
            <div class="password">
                <input type="input" class="form__field" placeholder="Password" name="password" id='password' required />
                <label for="password" class="form__label">Password</label>
            </div>
        
            {/* bottone */}
            <button className="log_button" type="submit" ><Link to={"http://localhost:5173/home"} >LOGIN</Link></button>
        
        </form>
        </div>
    )
}

export default Login;