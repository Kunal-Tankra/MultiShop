import React, { useEffect, useState } from "react";
import { createContext } from "react";
import handleFetch from "../FetchFunc";

const appContext = createContext()

const ContextAPI = ({children})=>{
    // states............................................
    // for show sign in page
    const [currUser, setCurrUser] = useState(null);

    // show product state
    const [showProduct, setShowProduct] = useState({});

    // category id for add product form
    const [category_id_name, setCategory_id_name] = useState(null);

    // all parent category
    const [allCategory, setAllCategory] = useState([]);

    // single category
    const [categoryData, setCategoryData] = useState(undefined);

    // cart data state
    const [cartData, setCartData] = useState([]);

    // count for a single item
    const [countItem, setCountItem] = useState(0)

    // states............................................

    // get all category
    const getAllCategory = async () => {
        let category = await handleFetch(`${process.env.REACT_APP_API_URL}/api/v1/category1/`).catch(err => console.log(err))
        setAllCategory(category)
    }

    // get curr user from local storage
    const getCurrUserData = async ()=>{
        const data = await JSON.parse( localStorage.getItem("currUser"))
        setCurrUser(data)
    }

    useEffect(() => {
        getCurrUserData()
        getAllCategory()
    }, []);

    return(
        <>
            <appContext.Provider value={{currUser,setCurrUser,showProduct, setShowProduct , category_id_name, setCategory_id_name, allCategory, setAllCategory, categoryData, setCategoryData, cartData, setCartData, countItem, setCountItem}}>
                {children}
            </appContext.Provider>
        </>
    )
}

export default appContext;
export {ContextAPI}