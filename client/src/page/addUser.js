import React from "react"
import ErrorHeandler from "../Widgets/ErrorLable"
import {Controller, useForm} from 'react-hook-form'
import {joiResolver} from '@hookform/resolvers/joi'
import Joi from 'joi'
import { useDispatch , useSelector } from "react-redux"
import { joiUpdatedMessage } from "../Utils/Apputils"
import { AddUser } from "../action/adduserAction" 
import { Link } from "react-router-dom"
  
const AddNewUser = () => {
        const dispatch = useDispatch()

        const {handleSubmit , formState , control } = useForm({
                resolver : joiResolver(
                Joi.object({
                    email : Joi.string()
                                    .email({ tlds: {allow: false} })
                                    .required()
                                    .label("Email")
                                    .messages(joiUpdatedMessage),
                    name : Joi.string().required().min(3).max(20).label("Name").messages(joiUpdatedMessage),
                   date : Joi.date().min("2001-01-01").required().messages(joiUpdatedMessage),
                   phone : Joi.string().length(10).pattern(/^[0-9]+$/).required(),
                })
                ),
        })
        const oldData = JSON.parse(localStorage.getItem("user"))
        const onClickToSubmit = (data) => {
            const user = []
            let id = 1;
            if(oldData !== null) {
                oldData.map((result) => {
                    user.push(result)
                })
                if(oldData.length > 0 ) {
                    id = oldData.length + 1;
                }
            }
           
            user.push({data , id : id})
            localStorage.removeItem("user")
            dispatch(AddUser(user))
            localStorage.setItem("user",JSON.stringify(user))
           
            console.log("asdasdasd" + user);
        }
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
                <label>DATE</label>
                <Controller
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
                />
                <label>PHONE</label>
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
                <button type="submit">
                          Add User
                </button>
                <br />
                <br />
                <Link to="/alluser" >
                <button type="button">
                          Show All User
                </button>
                </Link>
            </form>
        </>
    )
}

export default AddNewUser