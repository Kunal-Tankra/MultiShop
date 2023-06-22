import React, { useContext, useEffect } from 'react'
import "./Navbar.css"
import { Link, useNavigate } from 'react-router-dom'
import appContext from '../../context/context'
import { Avatar } from '@mui/material'
import handleFetch from "../../FetchFunc"

const Navbar = () => {
    // context
    const { currUser, setCurrUser, allCategory, setCategoryData, cartData, setCartData } = useContext(appContext)

    // navigate
    const navigate = useNavigate()

    const handleSignOut = () => {
        setCurrUser(null)
        navigate("/signUp", {replace: true})
        localStorage.setItem("currUser", JSON.stringify(null))
    }

    // handle cart btn
    const handleCartBtn = ()=>[
        navigate("/cart", {replace: true})
    ]

   
    // category btn functon
    const handleCategoryBtn = async(cateId)=>{
        const categoryData = await handleFetch(`${process.env.REACT_APP_API_URL}/api/v1/category/${cateId}/`).catch(err => console.log(err.message))
        setCategoryData(categoryData)
        navigate("/categoryPage")
    }

    // set cart data on relaod
    const setCartData_localStorage = async()=>{
        const data = await JSON.parse( localStorage.getItem("currUser"))
        if(data){
            setCartData(data.cart_items)
        }

        
        
    }

    useEffect(() => {
        
        setCartData_localStorage()
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">MULTI SHOP</Link>


                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    { allCategory && allCategory.map(cat=><li onClick={()=>handleCategoryBtn(cat.id)} style={{cursor: "pointer"}}  key={cat.id} ><span className="dropdown-item" >{cat.word}</span></li>)}
                                    
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>

                        </ul>

                    </div>
                    <Link to="/addProduct" ><button type="button" className="btn btn-success mx-3">Add Product</button> </Link> 



                    {currUser ?
                        <span onClick={handleCartBtn} id='cartIconBox'>
                            <span className="cartIcon material-symbols-outlined ">
                                shopping_cart
                            </span>
                            <span id='cartNumber' >
                                <strong>{cartData? cartData.length:0}</strong>
                            </span>
                        </span>

                        : <>
                            <Link to='/logIn'><button type="button" className="btn btn-primary">Log In</button></Link>
                            <Link to='/signUp'><button type="button" className="btn btn-primary mx-2">Sign Up</button></Link>
                        </>
                    }


                    {currUser && <ul className="navbar-nav mx-2">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle avatarContainer mx-3" href="/" id="navbarDropdownMenuLink2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {/* {console.log(currUser, "curr")} */}
                                <Avatar>{currUser && currUser.name[0].toUpperCase()}</Avatar>
                            <span className='userName' >{currUser && currUser.name}</span>
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink2">
                                <li><button onClick={handleSignOut} className="dropdown-item" >Sign Out</button></li>
                            </ul>
                        </li>

                    </ul>
                    }


                </div>
            </nav>


        </>
    )
}

export default Navbar
