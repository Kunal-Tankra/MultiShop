import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import appContext from '../../context/context'

const CategoryTableRow = ({ind, data}) => {
    // navigate 
    const navigate = useNavigate()

    // context
    const {setCategory_id_name} = useContext(appContext)

    // set category id

    const handleAddBtn = ()=>{
        navigate("/addProduct")

        // set category for add product
        setCategory_id_name({
            id: data.id,
            name: data.word
        })
    }

    return (
        <>

            <tr>
                <th scope="row">{ind}</th>
                <td>{data.word}</td>
                <td><button type='button' onClick={handleAddBtn} className="btn btn-info" style={{float: "right"}} >Add <strong>+</strong></button></td>
            </tr>
        </>
    )
}

export default CategoryTableRow
