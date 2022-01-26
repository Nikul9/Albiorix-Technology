import logo from './logo.svg';
import './App.css';
import { Route , Routes , BrowserRouter } from "react-router-dom"
import AddNewUser from "./page/addUser"
import AllUser from './page/AllUser';
import { useDispatch } from 'react-redux';
import { AddUser } from './action/adduserAction';
import EditUser from './page/editUser';
function App() {
  const data = JSON.parse(localStorage.getItem("user"))
  const dispatch = useDispatch()
  dispatch(AddUser(data))
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<AddNewUser />} />
            <Route exact path="/alluser" element={<AllUser />} />
            <Route exact path="/edituser" element={<EditUser />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
