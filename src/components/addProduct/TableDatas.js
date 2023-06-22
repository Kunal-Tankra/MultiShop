import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import appContext from '../../context/context'
// import handleFetch from '../../FetchFunc'

const TableDatas = ({idx, data, fetchAllProducts, formRef, setId_updateProduct, setCategory_updateProduct }) => {
    // context
    // const {setShowProduct} = useContext(appContext)
    // navigate
    // const navigate = useNavigate()

    // const handleShow = ()=>{
    //     setShowProduct(data)
    //     navigate("/showProduct")

    // }

    // delete product..
    const handleDelete = () => {
        const url = `${process.env.REACT_APP_API_URL}/api/v1/product/${data.id}/`
        fetch(url, {
            method: 'DELETE',
        }).then(() => fetchAllProducts())

    }

    // update product
    const handleUpdate = () => {
        setId_updateProduct(data.id)
        setCategory_updateProduct(data.category)
        // console.log(data)

        const currForm = formRef.current


        // form inputs
        currForm.title.value = data.title
        currForm.price.value = data.price
        currForm.des.value = data.description
        currForm.info.value = data.information
        currForm.category.value = data.category.id


    }

    return (
        <>
            <tr>
                <th scope="row">{idx}</th>
                <td><img style={{ width: "40px" }} src={`${data.image}`} alt="img" /></td>
                <td>{data.title}</td>
                <td>{data.category.word}</td>
                <td>{data.price}</td>
                <td>{data.description}</td>
                <td> <button onClick={handleDelete} type='button' className="btn btn-danger"  >Delete</button></td>
                <td> <button onClick={handleUpdate} type='button' className="btn btn-info"  >Update</button></td>
            </tr>
        </>
    )
}

export default TableDatas
