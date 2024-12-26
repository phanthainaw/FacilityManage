import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons"
import '/src/styles/LogIn/LogIn.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendLogInRequest} from "../../services/HTTP.js";

function LogIn() {
    const navigate = useNavigate();

    const [logInInfo, setLogInInfo] = useState({
        email: "",
        password: "",
    })

    function onLogInInfoChange(e) {
        const { name, value } = e.target;
        setLogInInfo({...logInInfo, [name]: value});

    }

    async function getUserInfo() {
        const data = await sendLogInRequest(logInInfo.email, logInInfo.password);
        if(data){
            sessionStorage.setItem('userInfo', JSON.stringify(data));
            if(data.role==='ROLE_ADMIN'){
                navigate('/admin');
            } else navigate('/request')
        } else alert('log in failed');
    }

    return (
        <div className="logInContainer">
            <div className="logInForm">
                <h2 className="logInTitle">Facility Management</h2>
                <div className="inputGroup">
                    <FontAwesomeIcon icon={faEnvelope} className="icon" />
                    <input onChange={onLogInInfoChange} name="email" className="logInInput" value={logInInfo.email} type="text" placeholder="Username" />
                </div>
                <div className="inputGroup">
                    <FontAwesomeIcon icon={faLock} className="icon" />
                    <input onChange={onLogInInfoChange} name="password" className="logInInput" value={logInInfo.password} type="password" placeholder="Password" />
                </div>
                <button onClick={getUserInfo} className="logInButton"><b>Log In</b></button>
            </div>
        </div>
    );
}

export default LogIn