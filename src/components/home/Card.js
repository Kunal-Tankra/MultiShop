import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import handleFetch from '../../FetchFunc'
import appContext from '../../context/context'

const Card = (props) => {
    const {id,title, price, img,des} = props

    // context
    const {setShowProduct, cartData, setCountItem} = useContext(appContext)

    const fetchProduct = async (id)=>{
        const data = await handleFetch(`${process.env.REACT_APP_API_URL}/api/v1/product/${id}/`)
        setShowProduct(data)

        if(cartData){

            for (const item of cartData) {
                if(id === item.id){
                    setCountItem(item.quantity)
                }
            }
            
        }
    }

    return (
        <>
            <div className="card" style={{ width: "18rem" }}>
                <img src={img} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">{des}</li>
                    <li className="list-group-item"><h5>$ {price}</h5></li>
                    {/* <li className="list-group-item"> <Rating name="half-rating-read" defaultValue={2.5} precision={0.1} readOnly /></li> */}
                </ul>
                <div className="card-body">
                    <Link to="/shopDetails" onClick={()=>fetchProduct(id)} className="card-link">Item Details</Link>
                </div>
            </div>
        </>
    )
}

export default Card
