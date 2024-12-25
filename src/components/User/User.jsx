import Navbar from "../Navbar"
import '/src/styles/User/User.css'
import { sendGetRequest } from '/src/services/HTTP.js'
import { useState, useEffect } from "react"

const UserInfo = JSON.parse(sessionStorage.getItem('userInfo'));

function User(props) {
    const [editInfo, setEditInfo] = useState(false)

    const [dashboardState, setDashboardState] = useState('member')

    const [userInfo, setUserInfo] = useState({ Name: UserInfo.fullName, Id: UserInfo.employeeID, Email: UserInfo.email, Position: UserInfo.position, Department: UserInfo.department.departmentName })

    const [stockInfo, setStockInfo] = useState([])

    const [memberInfo, setMemberInfo] = useState([])

    const userInfoKey = ['Id', 'Name', 'Email', 'Department', 'Position']

    async function getUserInfo() {
        const user = await sendGetRequest('http://localhost:8080/employees/1');
        setUserInfo({ Name: user.fullName, Id: user.employeeID, Email: user.email, Position: user.position, Department: user.department.departmentName })
    }
    async function getStockInfo() {
        const stock = await sendGetRequest('/requests/purchasedEquipment/department/currentuser');
        setStockInfo(stock)
        console.log(stock)
    }
    async function getMemberInfo() {
        const members = await sendGetRequest('http://localhost:8080/employees/department/'+ UserInfo.department.departmentID)
        setMemberInfo(members)
    }

    useEffect(() => {
        console.log(UserInfo)
        // getUserInfo()
        getStockInfo()
        getMemberInfo()
    }, []);


    const onUserInfoChange = (e) => {
        const { name, value } = e.target
        setUserInfo({ ...userInfo, [name]: value })
        setEditInfo(true)
    }

    return <div>
        <Navbar username={props.username} department={props.department} />
        <div className="userContainer">
            <div className="userProfile">
                <img className="userAvatar" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="" />
                <div className="userInfo">
                    {/* Conditional rendering to ensure userInfo is available before rendering */}
                    {userInfo ? (
                        userInfoKey.map((key) => (
                            <>
                                <p>{key}</p>
                                <input type="text" onChange={onUserInfoChange} name={key} value={userInfo[key]} />
                            </>
                        ))
                    ) : (
                        <p>Loading user info...</p> // Show loading message if userInfo is null
                    )}
                </div>
                {!editInfo || <button>Save </button>}
            </div>
            <div className="dashboard">
                <div><button onClick={() => { setDashboardState('member') }}>Member</button> <button onClick={() => { setDashboardState('stock') }}>Stock</button></div>
                {!(dashboardState === 'member') || <div className="departmentMemberInfo">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        { memberInfo && memberInfo.map(member => <tr>
                            <td>{member.employeeID}</td>
                            <td>{member.fullName}</td>
                            <td>{member.phoneNumber}</td>
                            <td>{member.email}</td>
                        </tr>)}
                    </table>
                </div>}
                {!(dashboardState === 'stock') || <div className="stockInfo">
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Description</th>
                                <th>Warranty</th>
                                <th>Supplier</th>
                            </tr>
                        </thead>
                        {stockInfo && stockInfo.map((equipment) => <tr>
                            <td>{equipment.equipment.equipmentID}</td>
                            <td>{equipment.equipment.equipmentName}</td>
                            <td>{equipment.equipment.currentPrice}</td>
                            <td>{equipment.quantity}</td>
                            <td>{equipment.equipment.equipmentDescription}</td>
                            <td>{equipment.equipment.purchasePeriod}</td>
                            <td>{equipment.equipment.supplier.supplierName}</td>
                        </tr>)
                        }
                    </table>
                </div>}
            </div>

            <div ><h1>Budget</h1>
                <h2>{UserInfo.department.budget}</h2>
            </div>

        </div>
    </div>
}

export default User