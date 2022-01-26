import React, { useEffect , useState } from "react"
import { useDispatch , useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { EditUserAction } from "../action/EditUser";

const AllUser = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userdata } = useSelector((state) => {
        return state.addUserReduser
    })
    const [ users , setUser ] = useState([]);
    useEffect(() => {
        console.log(userdata);
        console.log(userdata);
        if(!userdata) {
            return
        }
        setUser(userdata)
    },[userdata])
    const updateUser = (item) => {
        dispatch(EditUserAction(item))
        navigate("/edituser")
    }
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>email</th>
                        <th>phone</th>
                        <th>DOB</th>
                        <th>EDIT</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((item) => {
                       return (
                        <tr>
                            <td>{item.data.name}</td>
                            <td>{item.data.email}</td>
                            <td>{item.data.phone}</td>
                            <td>{item.data.date}</td>
                            <td><button onClick={() => {updateUser(item)}}>Update</button></td>
                        </tr>
                        )
                    })
                }
                </tbody>
            </table>        
        </>
    )
}

export default AllUser