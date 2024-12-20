import '../styles/Navbar.css'

function Navbar(props) {
    return (<ul className="navBar">
        <h2 className='appName' > Facility Management System</h2>
        <li><a href="/request">Request</a></li>
        <li><a href="#">Stock</a></li>
        <li><a href="#">Budget</a></li>
        <div className='userInfo'>
            <li><a href="/user">{props.username}</a> </li>
            <li><a href="#">{props.department}</a></li>
        </div>

    </ul>)
}
export default Navbar