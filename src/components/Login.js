import React, { useContext, useEffect, useRef } from 'react'
import appContext from '../context/context'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()

    // context
    const {setCurrUser} = useContext(appContext)

    // ref for form
    let loginForm = useRef(null)

    // handle on login 
    const handleLogin = (e)=>{
        e.preventDefault()
        const form = loginForm.current

        const email = form.email.value
        const pass = form.password.value

        const usersData = JSON.parse(localStorage.getItem("users"))

        // searching for user
        for (const data of usersData) {
            if(data.email === email && data.password === pass){
                setCurrUser(data)
                navigate("/", {replace: true})
                localStorage.setItem("currUser", JSON.stringify(data))
                return
            }
        }

        // email or pass incorrect
        alert("email or password incorrect")
    }

    

    

    return (
        <>
            <form onSubmit={handleLogin} className='form' ref={loginForm}>
                <h2>log In</h2><hr/>
                <div className="form-group my-3">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email' required />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-grou my-3p">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" autoComplete="on" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' required/>
                </div>
                <button type="submit" className="btn btn-primary my-3 mx-2">Log In</button>
            </form>
        </>
    )
}

export default Login
