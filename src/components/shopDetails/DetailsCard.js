import React, { useContext, useEffect } from 'react'
import "./DetailsCard.css"
// import { Rating } from '@mui/material'
import appContext from '../../context/context'

const DetailsCard = () => {
    // context
    const { currUser, showProduct, cartData, setCartData, countItem, setCountItem } = useContext(appContext)

    

    const handleCount = (inc_dec) => {
        if (inc_dec === "inc") {
            setCountItem(countItem + 1)
        }
        else {
            if (countItem > 0) {
                setCountItem(countItem - 1)
            }

        }
    }

    // add to cart btn
    const handleAddToCartBtn = () => {
        const itemData = {
            id: showProduct.id,
            img: showProduct.image,
            title: showProduct.title,
            price: showProduct.price,
            quantity: countItem 
        }


        // ....................................................................................................
        for (const item of cartData) {
            if (itemData.id === item.id && itemData.quantity === item.quantity) {  //don't add
                return
            }
            else if (itemData.id === item.id && itemData.quantity !== item.quantity) { //update


                setCartData(cartData.map(data => {
                    if (data.id === itemData.id) {
                        
                        return itemData
                    }

                    return data;
                }))

                return
            }
        }

        setCartData([...cartData, itemData])

        
    }

    const updateCartData = async () => {
        const allUsers = await JSON.parse(localStorage.getItem("users"))
        

        const updatedUsersData = allUsers&& allUsers.map(user=>{
            if(currUser && user.user_id === currUser.user_id){
                return  {...currUser, cart_items: cartData}
            }
            return user
        })
        
        
        localStorage.setItem("currUser", JSON.stringify( {...currUser, cart_items: cartData}))
        localStorage.setItem("users", JSON.stringify( updatedUsersData))

    }

    useEffect(() => {
        // update cart data 
        updateCartData()
    }, [cartData, currUser]);

    // const setCartData_localStorage = async()=>{
    //     const data = await JSON.parse( localStorage.getItem("currUser"))
    //     if(data){
    //         setCartData(data.cart_items)
    //     }

        
        
    // }

    // useEffect(() => {
        
    //     setCartData_localStorage()
    // }, []);

    useEffect(() => {
        setCountItem(0)

    }, []);

    


    return (
        <>
            <div className="card mb-3" style={{ maxWidth: "1450px" }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={showProduct.image} className="img-fluid rounded-start itemImg" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{showProduct.title}</h5>

                            {/* <p className="card-text">
                                <Rating name="half-rating-read" defaultValue={2.5} precision={0.1} readOnly />
                            </p> */}

                            <p className="card-text itemPrice">$ {showProduct.price}</p>

                            <p className="card-text">{showProduct.information}</p>

                            <div className="itemCount">
                                <button type="button" className="btn btn-outline-dark" onClick={() => handleCount("dec")}>-</button>
                                <span>{countItem}</span>
                                <button type="button" className="btn btn-outline-dark" onClick={() => handleCount("inc")}>+</button>
                            </div>

                            <button onClick={handleAddToCartBtn} type="button" className="btn btn-warning my-4 cartBtn" disabled={!currUser || countItem===0}>
                                <span className="material-symbols-outlined">
                                    add_shopping_cart
                                </span> Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailsCard
