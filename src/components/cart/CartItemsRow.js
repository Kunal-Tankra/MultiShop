import React, { useContext } from 'react'
import "./CartItemsRow.css"
import appContext from '../../context/context'
import handleFetch from '../../FetchFunc'
import { Link } from 'react-router-dom'

const CartItemsRow = ({id,title, price, quantity, img}) => {

    // context
    const {cartData, setCartData, currUser, setShowProduct, setCountItem} = useContext(appContext)

    // function onclick cancel
    const handleCancel = ()=>{
        // eslint-disable-next-line
        const deletedCartData = cartData.filter(data=>{
            if(data.id !== id){
                return data
            }
        })


        const localStorage_users = JSON.parse(localStorage.getItem("users"))
        
        const afterDelete = localStorage_users.map(user=>{
            if(currUser&& user.user_id === currUser.user_id){
                return {...user, cart_items: deletedCartData}
            }
            else{
                return user
            }
        })
    
        localStorage.setItem("users", JSON.stringify(afterDelete))
    
        // curr user
        localStorage.setItem("currUser", JSON.stringify({...currUser, cart_items: deletedCartData}))

        setCartData(deletedCartData)
    }

    // // after deleteing
    // useEffect(() => {

    //     console.log(cartData)


    // }, [cartData]);


    const fetchProduct = async ()=>{
        const data = await handleFetch(`${process.env.REACT_APP_API_URL}/api/v1/product/${id}/`)
        setShowProduct(data)
        setCountItem(quantity)

    }

    return (
        <>
            <tr className='cartItemsRow'>
                <td className="align-middle" ><Link to="/shopDetails"> <img src={img} onClick={fetchProduct}  alt="" style={{ width: "50px",float: "left" }} /></Link>{title}</td>
                <td className="align-middle bh-light">${price}</td>
                <td className="align-middle">
                    {quantity}
                </td>
                <td className="align-middle">${price*quantity}</td>
                <td className="align-middle"><button onClick={handleCancel} className="btn btn-sm btn-danger"><strong>X</strong></button></td>
            </tr>
        </>
    )
}

export default CartItemsRow
