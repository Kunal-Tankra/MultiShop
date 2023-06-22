import React, { useContext } from 'react'
import appContext from '../../context/context'
import Navbar from '../navbar/Navbar'

const ShowProduct = () => {
    const {showProduct} = useContext(appContext)

  return (
    <>
    <Navbar/>
      <form className='form'>
                <div className="form- my-3">
                    <h5>Title:</h5>
                    <h2>{showProduct.title}</h2>
                    <hr/>
                </div>
                <div className="form-group my-3">
                    <h5 >Category:</h5>
                    <h2>{showProduct.category}</h2>
                    <hr/>
                </div>


                <h5>Image:</h5>
                <img style={{width: "295px"}} src={showProduct.img} alt="img" />
                <hr/>

                <div className="form-outline my-3" style={{ width: "22rem" }}>
                    <h5>Old Price:</h5>
                    <h2>$ {showProduct.oldPrice}</h2>
                    <hr/>
                </div>
                <div className="form-outline my-3" style={{ width: "22rem" }}>
                    <h5>Price:</h5>
                    <h2>$ {showProduct.price}</h2>
                    <hr/>
                </div>

                <div className="form-group my-3">
                    <h5>Description:</h5>
                    <h2>{showProduct.des}</h2>
                    <hr/>
                </div>

                <div className="form-group my-3">
                    <h5>Information:</h5>
                    <h2>{showProduct.info}</h2>
                    
                </div>
            </form>
    </>
  )
}

export default ShowProduct
