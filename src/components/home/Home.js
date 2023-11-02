import React, { useEffect, useState } from 'react'
import Card from './Card'
import "./Home.css"
import Carousel from './Carousel'
import handleFetch from '../../FetchFunc'
import Navbar from '../navbar/Navbar'
// import appContext from '../../context/context'

const Home = () => {
    const [allProducts, setAllProducts] = useState(undefined);
    const [err, setErr] = useState(null);

    // context
    // const {setCartData} = useContext(appContext)

    // const setCartData_localStorage = async()=>{
    //     const data = JSON.parse( localStorage.getItem("currUser"))
    //     if(data){

    //         setCartData(data.cart_items)
    //     }
    // }

    const setAllProducts_reload = async () => {
        // fetch all products
        let data = await handleFetch(`${process.env.REACT_APP_API_URL}/api/v1/product/`).catch(err => setErr(err.message))
        setAllProducts(data.results)

    }

    useEffect(() => {
        setAllProducts_reload()
console.log("hello")
        // set cart data on reload
        // setCartData_localStorage()
    }, []);





    return (
        <>
            <Navbar />
            <Carousel />

            <div className='homeContainer'>
                {allProducts && allProducts.map(data => <Card key={data.id} id={data.id} title={data.title} price={data.price} oldPrice={data.old_price} info={data.information} img={data.image} des={data.description} />)}

                {/* loading */}
                {(!err && !allProducts) && <h1>loading...</h1>}

                {err && <h1>{err}</h1>}
            </div>
        </>
    )
}

export default Home
