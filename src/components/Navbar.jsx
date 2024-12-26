import '../styles/Navbar.css'

function Navbar() {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    return (<ul className="navBar">
        <h2 className='appName' > Facility Management System</h2>
        <li><a href="/request">Request</a></li>
        <li><a href="#">Stock</a></li>
        <li><a href="#">Budget</a></li>
        <div className='userInfoNavBar'>
            <li><a href="/manage">{userInfo.fullName}</a> </li>
            <li><a href="#">{userInfo.department.departmentName}</a></li>
        </div>

    </ul>)
}
export default Navbar