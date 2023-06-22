import React from 'react'
import "./ProductTable.css"
import TableDatas from './TableDatas'

const ProductTable = ({ p_data,fetchAllProducts,formRef,setId_updateProduct, setCategory_updateProduct }) => {

    return (
        <div className='tableContainer'>

            <table className="table ">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Category</th>
                        <th scope="col">Price</th>
                        <th scope="col">Description</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Update</th>
                    </tr>
                </thead>
                <tbody>
                    {p_data.map((data, idx) => <TableDatas key={data.id} idx={idx+1} setCategory_updateProduct={setCategory_updateProduct} setId_updateProduct={setId_updateProduct}   formRef={formRef} fetchAllProducts={fetchAllProducts}  data={data} />)}
                </tbody>
            </table>
            {/* empty tag */}
            {p_data.length === 0 && <h1>Empty</h1>}
        </div>
    )
}

export default ProductTable
