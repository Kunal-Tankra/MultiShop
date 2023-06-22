import React from 'react'
import DetailsCard from './DetailsCard'
import "./ItemDetails.css"
import Navbar from '../navbar/Navbar'

const ShopDetails = () => {

  return (
    <>
    <Navbar/>
    <div className='shopDetails_container'>
      <DetailsCard/>
    </div>
    </>
  )
}

export default ShopDetails
