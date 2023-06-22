import React, { useContext } from 'react'
import CartItemsRow from './CartItemsRow'
import "./CartTable.css"
import appContext from '../../context/context'

const CartTable = () => {
    const { cartData} = useContext(appContext)

    // const setCartData_localStorage = async()=>{
    //     const data = await JSON.parse( localStorage.getItem("currUser"))
    //     // console.log("data", data)
    //     if(data){
    //         // console.log("initialy")
    //         setCartData(data.cart_items)
    //     }
    // }

    // useEffect(() => {

    //     // set cart data on reload
    //     setCartData_localStorage()
    // }, []);

    return (
        <>
            <table className="table table-light table-borderless table-hover text-center mb-0 my-3 cartTable">
                <thead className="table-dark">
                    <tr>
                        <th>Products</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Remove</th>
                    </tr>
                </thead>

                <tbody className="align-middle">
                    {}
                    {cartData && cartData.map(data => <CartItemsRow key={data.id} id={data.id} title={data.title} price={data.price} quantity={data.quantity} img={data.img} />)}

                </tbody>
            </table>


        </>
    )
}

export default CartTable
