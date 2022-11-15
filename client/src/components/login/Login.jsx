import React, { useState, useContext } from 'react'
import "./Login.css"
import {MainContext} from '../../App';
import { loginUser } from '../../context/actions';
import { debounce } from '../../constants/debounce';
export default function Login() {
  const { dispatch } = useContext(MainContext)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [disable, setDisable] = useState(false)
  const handleChange = (target, value) => {
    setForm({
      ...form,
      [target]: value
    })
    setDisable(false)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;
    if (email.length && password.length)
     debounce(()=>{
       !disable && loginUser(dispatch)(email,password)
        !disable && setDisable(true)
      },350)
  }

  return (
    <form className="login-form" onSubmit={(e) => handleFormSubmit(e)}>
      <h1>Login</h1>
      <label>Email</label>
      <input className='input' name="email" type="email" required onChange={(e) => handleChange(e.target.name, e.target.value)} />
      <label>Password</label>
      <input className='input' name='password' type="password" required onChange={(e) => handleChange(e.target.name, e.target.value)} />
      {disable && <p className='login-error'>Change form inputs to enable submit</p>}
      <input className='btn submit-btn' type='submit' disabled={disable} />
    </form>
  )
}
