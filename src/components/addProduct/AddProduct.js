import React, { useContext, useEffect, useRef, useState } from 'react'
import appContext from '../../context/context';
import { useNavigate } from 'react-router-dom';
import ProductTable from './ProductTable';
import handleFetch from '../../FetchFunc';
import Navbar from '../navbar/Navbar';
// import ProductTable from './ProductTable'
// import { v4 as uuidv4 } from 'uuid';

const AddProduct = () => {
    // context
    const { category_id_name } = useContext(appContext)

    // all categories
    const [allParentCategory, setAllParentCategory] = useState([]);
    const [allCategory, setAllCategory] = useState([]);
    const [ShowCategory, setShowCategory] = useState([]);

    // all products...
    const [allProducts, setAllProducts] = useState([]);

    // currProduct id for update..
    const [id_updateProduct, setId_updateProduct] = useState();
    const [category_updateProduct, setCategory_updateProduct] = useState();

    // navigate
    const navigate = useNavigate()

    const formRef = useRef(null)

    // table data
    // const [products_data, setProducts_data] = useState([]);

    // used local storage..............................................
    // const submitForm = (e) => {
    //     e.preventDefault()
    //     const currForm = formRef.current;

    //     // create unique id
    //     const product_id = uuidv4()

    //     // form inputs
    //     const title = currForm.title.value
    //     const category = currForm.category.value
    //     const oldPrice = currForm.old_price.value
    //     const price = currForm.price.value
    //     const des = currForm.des.value
    //     const info = currForm.info.value

    //     const reader = new FileReader();
    //     reader.readAsDataURL(currForm.img.files[0])

    //     reader.addEventListener("load",()=>{
    //         const img = reader.result
    //         const currFormData = {
    //            title,
    //            category,
    //            img,
    //            oldPrice,
    //            price,
    //            des,
    //            info,
    //            product_id
    //        }



    //        // clear form inputs
    //        currForm.title.value = ""
    //        currForm.category.value = ""
    //        currForm.img.value = ""
    //        currForm.old_price.value = ""
    //        currForm.price.value = ""
    //        currForm.des.value = ""
    //        currForm.info.value = ""

    //        setProducts_data([...products_data, currFormData])

    //     })
    // }

    // // get data from local storage
    // const getData_localStorage = async () => {
    //     let data = await JSON.parse(localStorage.getItem("products"))

    //     if (!data) {
    //         localStorage.setItem("products", JSON.stringify([]))  //set
    //     }
    //     else {

    //         setProducts_data(data)
    //     }

    // }

    // useEffect(() => {
    //     getData_localStorage()

    // }, []);

    // // update local storage
    // useEffect(() => {
    //     localStorage.setItem("products", JSON.stringify(products_data))
    // }, [products_data]);

    // used api.........................................
    const submitForm = (e) => {
        e.preventDefault()
        const currForm = formRef.current;


        // form inputs
        const title = currForm.title.value
        const categoryId = currForm.category.value
        const price = currForm.price.value
        const des = currForm.des.value
        const info = currForm.info.value
        const img = currForm.img.files[0]

        let bodyData = new FormData()
        bodyData.append("title", title)

        // console.log(typeof(categoryId), "cate id")
        
        img && bodyData.append("image", img)
        bodyData.append("description", des)
        bodyData.append("price", price)
        bodyData.append("category", categoryId)
        bodyData.append("information", info)

        // POST
        fetch(`${process.env.REACT_APP_API_URL}/api/v1/product/`, {
            method: 'POST',
            body: bodyData
        }).then(res=>fetchAllProducts())
        .catch(err=>console.log(err))

        // redirect to create category
        // navigate("/createCategory")
    }

    // fetch all products
    const fetchAllProducts = () => {
        // fetching all products
        handleFetch(`${process.env.REACT_APP_API_URL}/api/v1/product/`)
            .then(data => setAllProducts(data))

    }

    // fetch all category
    const fetchallCategory = () => {
        // fetching all products
        handleFetch(`${process.env.REACT_APP_API_URL}/api/v1/category/`)
            .then(data => setAllCategory(data))

    }

    // fetch all parent category
    const fetchallParentCategory = () => {
        // fetching all products
        handleFetch(`${process.env.REACT_APP_API_URL}/api/v1/category1/`)
            .then(data => setAllParentCategory(data))

    }

    // handle update
    const handlePUT_btn = (e) => {
        e.preventDefault()
        const currForm = formRef.current;


        // form inputs
        const title = currForm.title.value
        const price = currForm.price.value
        const des = currForm.des.value
        const info = currForm.info.value
        const img = currForm.img.files[0]
        const currCategoryId = currForm.category.value

        const bodyData = new FormData()
        bodyData.append("title", title)
        bodyData.append("category", currCategoryId)
        bodyData.append("price", price)
        bodyData.append("description", des)
        bodyData.append("information", info)
        img && bodyData.append("image", img)


        

        // PUT
        fetch(`${process.env.REACT_APP_API_URL}/api/v1/product/${id_updateProduct}/`, {
            method: 'PUT',
            
            body: bodyData
        })
            .then(() => fetchAllProducts())
    }




    useEffect(() => {
        fetchAllProducts()
        fetchallCategory()
        fetchallParentCategory()
    }, []);


    useEffect(() => {
        // filter all category
        const filtered = allCategory.filter(cat=>{
            for (const p_cate of allParentCategory) {
                if(cat.id === p_cate.id){
                    return;
                }
            }

            return cat
        })
        setShowCategory(filtered)
        
    }, [allParentCategory, allCategory]);



    return (
        <>
        <Navbar/>
            <form className='form' onSubmit={submitForm} ref={formRef}>
                <div className="form- my-3">

                    <label htmlFor="exampleFormControlInput1">Title</label>
                    <input name="title" type="text" className="form-control" id="exampleFormControlInput1" placeholder="ex:- Title" required />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="exampleFormControlSelect1">Category</label>
                    {/* for local storage */}
                    {/* <select name="category" className="form-control" id="exampleFormControlSelect1">
                        <option>Pants</option>
                        <option>Shirts</option>
                        <option>T-Shirts</option>
                        <option>HeadPhones</option>
                        <option>Laptops</option>
                        <option>Mobiles</option>
                        <option>Soft Toys</option>
                        <option>Toys for Boys</option>
                        <option>Toys for Girls</option>
                    </select> */}

                    {/* for api */}
                    <select name="category" className="form-control" id="exampleFormControlSelect1">
                        <option value="---">---</option>
                        {ShowCategory.map(cate => <option key={cate.id} value={cate.id} >{cate.word}</option>)}

                    </select>

                </div>


                <label htmlFor="customFile1">Choose Image</label>
                <input name="img" type="file" className="form-control " id="customFile1"  />

                {/* <div className="form-outline my-3" style={{ width: "22rem" }}>
                    <label className="form-label" htmlFor="typeNumber">Old Price</label>
                    <input name="old_price" type="number" id="typeNumber" className="form-control" required />
                </div> */}
                <div className="form-outline my-3" style={{ width: "22rem" }}>
                    <label className="form-label" htmlFor="typeNumber">Price</label>
                    <input name="price" type="number" id="typeNumber" className="form-control" required />
                </div>

                <div className="form-group my-3">
                    <label htmlFor="exampleFormControlTextarea1">Description</label>
                    <textarea name="des" className="form-control" id="exampleFormControlTextarea1" rows="3" required></textarea>
                </div>

                <div className="form-group my-3">
                    <label htmlFor="exampleFormControlTextarea1">Information</label>
                    <textarea name="info" className="form-control" id="exampleFormControlTextarea2" rows="3" required></textarea>
                </div>

                <button type="submit" className="btn btn-success ">POST</button>
                <button type="submit" onClick={handlePUT_btn} className="btn btn-secondary mx-3">PUT</button>
            </form>

            {/* table */}
            <ProductTable p_data={allProducts} setCategory_updateProduct={setCategory_updateProduct} setId_updateProduct={setId_updateProduct} formRef={formRef} fetchAllProducts={fetchAllProducts} />
        </>
    )
}

export default AddProduct
