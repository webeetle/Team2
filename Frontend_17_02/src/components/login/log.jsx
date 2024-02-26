import React, {useEffect, useState} from "react";
import axios from "axios";
import Logo from "../../assets/Logo.png"
import Slogan from "../../assets/Raggruppa 22.png"
import Home from "../Home/Home";
import { Link, Route, useNavigate } from "react-router-dom";
function Login() {
    


const fetchLogin = async () => {
    const Log = {email, passwordUser};
    const response = await axios.post(`http://192.168.1.11:3000/users`,Log);
    const results = response.status;
    if (results == 200) {
        console.log("log", Log);
        <Home user={() => { email, passwordUser }} />//controlla
        navigate('/home')
    }
    }
    
const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [passwordUser, setPasswordUser] = useState("");
    return (
        //sfondo
        <div className="log_background">
        
            {/*logo*/}
            <img src={Logo} alt="Tomatime" className='logo_login' />
            {/*slogan e form */}
            <img src={Slogan} alt="time to focus for a break" className='slogan' />

        <form class="log" method="post" onSubmit={(e)=>{e.preventDefault()
        fetchLogin()}}>
        
            <h1 class="login" >LOGIN</h1>
        
            {/* input email */}
            <div class="email">
                <input type="input" class="form__field" placeholder="Email" name="email" id='email'onChange={e => {setEmail(e.target.value)}} required />
                <label for="email" class="form__label">Email</label>
            </div>
        
            {/* input password */}
            <div class="password">
                <input type="input" class="form__field" placeholder="Password" onChange={e => {setPasswordUser(e.target.value)}} name="password" id='password' required />
                <label for="password" class="form__label">Password</label>
            </div>
        
            {/* bottone */}
            <button className="log_button" type="submit"
             >LOGIN</button>
        
        </form>
        </div>
    )
}

export default Login;