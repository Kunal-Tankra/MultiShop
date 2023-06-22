import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import appContext from '../context/context';

const ProtectedRoute = (props) => {
    const { Component } = props

    // context
    const {currUser} = useContext(appContext)

    const navigate = useNavigate()

    useEffect(() => {
        if(!currUser){

            navigate("/signUp")
        }
        else{
            navigate("/")
        }
    }, [currUser]);

    return (
        <>
           <Component/>
        </>
    )
}

export default ProtectedRoute
