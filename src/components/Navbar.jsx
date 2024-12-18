import '../styles/Navbar.css'

function Navbar() {
    return (<ul className="navBar">
        <h2 className='appName' > Facility Management System</h2>
        <li><a href="#">Request</a></li>
        <li><a href="#">Stock</a></li>
        <li><a href="#">Budget</a></li>
    </ul>)
}
export default Navbar