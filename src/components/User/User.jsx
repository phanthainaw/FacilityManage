import Navbar from "../Navbar"
import '../../styles/User/User.css'
function User(props){
    
    return <div>
        <Navbar username={props.username} department={props.department}/>
        <div className="userContainer">
            <div className="userProfile">
                <img className="userAvatar" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="" />
                <div className="userInfo"></div>
            </div>
            <div>hello</div>
        </div>
        </div>
}

export default User