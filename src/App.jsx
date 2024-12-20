import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './styles/App.css';
import Request from "./components/Request/Request";
import User from "./components/User/user";


function App() {
  const username = 'Phan Thái Nam';
  const department = 'Human Resources';
  return (
    <Router>
      <Routes>
        <Route path="/request" element={<Request username={username} department={department}/>}/>
        <Route path="/user" element={<User username={username} department={department}/>}/>
      </Routes>
    </Router>

  )
}

export default App;
