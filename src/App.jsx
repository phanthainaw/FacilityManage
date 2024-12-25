import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './styles/App.css';
import Request from "./components/Request/Request";
import User from "./components/User/user";
import LogIn from "./components/LogIn/LogIn";
import ManageAdmin from "./components/Admin/ManageAdmin.jsx";

function App() {
  const username = 'Phan Thái Nam';
  const department = 'Human Resources';
  return (
    <Router>
      <Routes>
        <Route path="/request" element={<Request username={username} department={department}/>}/>
        <Route path="/manage" element={<User username={username} department={department}/>}/>
        <Route path="/" element={<LogIn/>} />
        <Route path="/admin" element={<ManageAdmin/>}/>
      </Routes>
    </Router>

  )
}

export default App;
