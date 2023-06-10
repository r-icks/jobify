import Wrapper from "../assets/wrappers/RegisterPage"
import { Logo, FormRow, Alert } from "../components"
import { useState, useEffect } from "react"
import { useAppContext } from "../context/appContext.js"

import {useNavigate, userNavigate} from "react-router-dom"

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: false,
}

export const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);

  const {isLoading, showAlert, displayAlert, setupUser, user} = useAppContext();

  const handleChange = (e) => {
    setValues(
      {
        ...values,
        [e.target.name]:e.target.value
      }
    )
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const {name , email, password, isMember} = values; 
    console.log(values);
    if(!email || !password || (!isMember && !name)){
      displayAlert();
      return
    }
    const currentUser = {name, email, password}
    if(isMember){
        setupUser({currentUser,
        endPoint: "login",
        alertText: "Logged in! Redirecting..."})
    }
    else{
      setupUser({currentUser,
      endPoint: "register",
      alertText: "User created! Redirecting..."})
    }
  } 

  useEffect(()=>{
    if(user){
      setTimeout(()=>{
        navigate('/')
      }, 3000)
    }
  }, [user, navigate])

  const toggleMember = () => {
    setValues({...values, isMember: !values.isMember});
  }

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3> {values.isMember ? "Login" : "Register"} </h3>

        {showAlert && <Alert />}

        {
          !values.isMember && 
        <FormRow 
        handleChange={handleChange} 
        type="text" 
        value={values.name} 
        name="name"/>
        }
                
        <FormRow 
        handleChange={handleChange} 
        type="email" 
        value={values.email} 
        name="email"/>

        <FormRow 
        handleChange={handleChange} 
        type="password" 
        value={values.password} 
        name="password"/>

        <button type="submit" className="btn btn-block" disabled={isLoading}>
            submit
        </button>

        <p>
        {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register": "Login"}
          </button>
        </p>

      </form>
    </Wrapper>
  )
}