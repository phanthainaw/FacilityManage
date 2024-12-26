import '../styles/Navbar.css'
import {useEffect} from "react";

function Navbar() {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    useEffect(() => {console.log(userInfo)}, [])
    return (<ul className="navBar">
        <h2 className='appName' > Facility Management System</h2>
        <li><a href="/request">Request</a></li>
        {userInfo.role === "ROLE_ADMIN" && <li><a href="/admin">Admin</a></li>}
        <div className='userInfoNavBar'>
            <li><a href="/manage">{userInfo.fullName}</a> </li>
            <li><a href="#">{userInfo.department.departmentName}</a></li>
        </div>

    </ul>)
}
export default Navbar