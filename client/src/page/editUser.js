import React, { useEffect, useState } from "react"
import ErrorHeandler from "../Widgets/ErrorLable"
import {Controller, useForm} from 'react-hook-form'
import {joiResolver} from '@hookform/resolvers/joi'
import Joi from 'joi'
import { useDispatch , useSelector } from "react-redux"
import { joiUpdatedMessage } from "../Utils/Apputils"
import { AddUser } from "../action/adduserAction"    
import moment from "moment";
import { useNavigate } from "react-router-dom"

const EditUser = () => {
        const { selectedUser } = useSelector((state) => {
            return state.selectedUserReduser        
        })
        const { userdata } = useSelector((state) => {
            return state.addUserReduser
        })
        const dispatch = useDispatch()
        const navigate = useNavigate();
        const [user , setUser] = useState({})
        const [allUser , setAllUser ] = useState([])
        const {handleSubmit , formState , setValue , control } = useForm({
                
                resolver : joiResolver(
                Joi.object({
                    email : Joi.string()
                                    .email({ tlds: {allow: false} })
                                    .required()
                                    .label("Email")
                                    .messages(joiUpdatedMessage),
                    name : Joi.string().required().min(3).max(20).label("Name").messages(joiUpdatedMessage),
                //   date : Joi.date().min("2001-01-01").required().messages(joiUpdatedMessage),
                   phone : Joi.string().length(10).pattern(/^[0-9]+$/).required(),
                })
                ),
        })
        // const oldData = JSON.parse(localStorage.getItem("user"))
        const onClickToSubmit = (data) => {
            if(selectedUser) {
                allUser[selectedUser.id - 1].data.name = data.name
                allUser[selectedUser.id - 1].data.email = data.email
                allUser[selectedUser.id - 1 ].data.phone = data.phone
            }
            
            // allUser.map((item) => {
            //     console.log(item.id + "      " + user.id);
            //     if(item.id == user.id) {
            //         console.log("item finded item");
            //         console.log(item);
            //         item.data.name = data.name
            //         item.data.email = data.email
            //         item.data.phone = data.phone
            //     }
            // })
            dispatch(AddUser(allUser))
            localStorage.removeItem("user")
            localStorage.setItem("user",JSON.stringify(allUser))
            navigate("/alluser")
        }
        useEffect(() => {
            console.log("selectedUser");
            console.log(selectedUser);
            if(!selectedUser) {
                return
            }
            setUser(selectedUser.data)
            console.log(user)
            
        },[selectedUser])
        useEffect(() => {
            if(!userdata) {
                return
            }
            setAllUser(userdata)
        },[userdata])
    return (
        <>
            <form onSubmit={handleSubmit(onClickToSubmit)}>
            <label>NAME</label>
            <Controller
                  name="name"
                  control={control}
                  render = {( {field:{value , onChange}}) => (
                      <>
                        <input
                           type="name"
                           placeholder="Name"
                           value={value}
                           onChange={e => {
                             onChange(e)
                           }}
                        />
                        <ErrorHeandler msg={formState.errors.name && formState.errors.name.message } />
                      </>
                  )}
                />
                <label>EMAIL</label>
                <Controller
                  name="email"
                  control={control}
                  render = {( {field:{value , onChange}}) => (
                      <>
                        <input
                           type="text"
                           placeholder="Email"
                           value={value}
                           onChange={e => {
                             onChange(e)
                           }}
                        />
                        <ErrorHeandler msg={formState.errors.email && formState.errors.email.message } />
                      </>
                  )}
                />
                {/* <Controller
                  name="date"
                  control={control}
                  render = {( {field:{value , onChange}}) => (
                      <>
                        <input
                           type="date"
                           placeholder="Date"
                           value={value}
                           onChange={e => {
                             onChange(e)
                           }}
                        />
                        <ErrorHeandler msg={formState.errors.date && formState.errors.date.message}/>
                      </>
                  )}
                /> */}
                <label>phone</label>
                <Controller
                  name="phone"
                  control={control}
                  render = {( {field:{value , onChange}}) => (
                      <>
                        <input
                           type="tel"
                           placeholder="Phone"
                           value={value}
                           onChange={e => {
                             onChange(e)
                           }}
                        />
                        <ErrorHeandler msg={formState.errors.phone && formState.errors.phone.message}/>
                      </>
                  )}
                />
                <button 
                     onClick={setValue("name" , user.name)} 
                     onClick={setValue("email" , user.email)} 
                     onClick={setValue("phone" , user.phone)}
                  //   onClick={setValue("date" , moment.utc(user.date).format('MM/DD/YYYY'))} 
                     type="submit" 
                >
                          Update
                </button>
            </form>
        </>
    )
}

export default EditUser