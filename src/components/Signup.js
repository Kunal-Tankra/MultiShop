import React, { useContext, useEffect, useRef, useState } from 'react'
import "./Signup.css"
import { v4 as uuid } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';
import appContext from '../context/context';

const Signup = () => {
    // context
    const {setCurrUser , currUser} = useContext(appContext)

    // navigate to home page with react router
    const navigate = useNavigate()

    // data of all users
    const [usersData, setUsersData] = useState([]);


    // get/set data initially
    const getInitialData = async () => {
        let data = await JSON.parse(localStorage.getItem('users'))  //get

        

        if (data === null) {
            // console.log("setting data []")
            localStorage.setItem("users", JSON.stringify([]))  //set
        }
        else {
            // console.log("setting data ", data)
            localStorage.setItem("users", JSON.stringify(data))  //set
            setUsersData(data)
        }
        
    }


    
    
    
    useEffect(() => {
        getInitialData()
    }, []);

    useEffect(() => {
        if(!currUser){

            navigate("/signUp")
        }
        else{
            navigate("/")
        }
    }, [currUser]);

    // ref for form
    let signUpForm = useRef(null)

    // handle the submit form
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = signUpForm.current

        const userName = form['name'].value
        const userEmail = form['email'].value
        const userNum = form['number'].value
        const userPass = form['password'].value
        const userId = uuid()

        // check if already exists
        for (const user of usersData) {
            if (user.email === userEmail) {
                alert("already exists")
                return;
            }
        }


        // reset values
        form['name'].value = ''
        form['email'].value = ''
        form['number'].value = ''
        form['password'].value = ''

        //set curr user all data
        const currUser_data = {
            user_id: userId,
            name: userName,
            email: userEmail,
            mob: userNum,
            password: userPass,
            cart_items: []
        }
        setUsersData([...usersData, currUser_data])

        // redirect to home page
        setTimeout(() => {
            navigate("/")
        },);
        setCurrUser(currUser_data)
        localStorage.setItem("currUser", JSON.stringify(currUser_data))

    }
    
    // set in local storage after data updates
    useEffect(() => {
        console.log("users data setting", usersData)
        localStorage.setItem("users", JSON.stringify(usersData))
    }, [usersData]);
    
    



    return (
        <>
            <form onSubmit={handleSubmit} className='form' ref={signUpForm} >
                <h1>MULTI SHOP</h1>
                <h4>Sign UP</h4>
                <hr />
                <div className="form-group my-4 ">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Name" name='name' required />
                </div>
                <div className="form-group  my-4">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" name='email' required />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-4" >
                    <label htmlFor="exampleInputEmail1">Mob No.</label>
                    <input type="text" pattern="[0-9]{10}" maxLength={10} className="form-control" aria-describedby="emailHelp" placeholder="Mob. Number" name='number' required />
                </div>
                <div className="form-group  my-4">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" autoComplete="on" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' required />
                </div>
                <button type="submit" className="btn btn-primary" >Sign Up</button>
                <Link className='loginLink my-3' to="/login">Already have an account</Link>
            </form>
        </>
    )
}

export default Signup
