import React, { useContext, useEffect, useRef, useState } from 'react'
import handleFetch from "../../FetchFunc"
import SelectCategory from './SelectCategory';
import appContext from '../../context/context';
import Navbar from '../navbar/Navbar';

const CreateCategory = () => {
    const formRef = useRef(null)

    // context
    const { allCategory } = useContext(appContext)

    const [catChildren, setcatChildren] = useState(undefined);
    const [type_category, setType_category] = useState(undefined);


    // handle create category function
    const handleCreateCategory = async (e) => {
        e.preventDefault()
        const form = formRef.current

        // inputs
        let parentId = parseInt(form.parent.value)
        if (isNaN(parentId)) {
            parentId = null
        }

        const category = form.category.value

        // const img = form.img.files[0];

        // change..................
        const catData = new FormData()
        if (parentId) {
            catData.append("parent", parentId)
        }
        catData.append("word", category)

        // if(img){
        //     catData.append("image", img)
        // }


        // POST REQ
        await fetch(`${process.env.REACT_APP_API_URL}/api/v1/category/`, {
            method: "POST",
            body: catData,
            // change..................
            // headers: {
            //     "Content-type": "application/json"
            // }
        })

        // getAllCategory()

        // set inputs
        form.category.value = ""
        // form.parent.value = "----"

        // update all children
        const children = await handleFetch(`${process.env.REACT_APP_API_URL}/api/v1/category/${parentId}/`).catch(err => console.log(err))
        setcatChildren(children.children)
    }

    // handle select parent 
    const handleSelectParent = async () => {
        const form = formRef.current

        const selectedParId = parseInt(form.parent.value)
        console.log(selectedParId)

        if (!isNaN(selectedParId)) {
            // get the type
            let type = await handleFetch(`${process.env.REACT_APP_API_URL}/api/v1/category/${selectedParId}/`).catch(err => console.log(err))
            if (type) {
                setcatChildren(type.children)
            }
        }

        const parent = form.parent.options[form.parent.selectedIndex].text
        console.log(parent, "parent")
        if (parent !== "----") {

            setType_category({
                ...type_category,
                type: parent
            })
        }
    }

    // select category function
    const handleSelectCategory = () => {
        const form = formRef.current;


        const category = form.category.options[form.category.selectedIndex].text

        setType_category({
            ...type_category,
            category
        })
        console.log(category, "category")

    }

    useEffect(() => {
        // call for first time
        handleSelectParent()
    }, []);

    // useEffect(() => {
    //     console.log(catChildren, "all children")
    // }, [catChildren]);







    return (

        <>
            <Navbar />
            <form className='form my-4' onSubmit={handleCreateCategory} ref={formRef} encType="multipart/form-data">
                <h1>Select Type & Category</h1>

                <div className="form-group my-3">
                    <label htmlFor="exampleFormControlSelect1">Select Type</label>
                    <select defaultValue={"----"} name="parent" className="form-control" onChange={handleSelectParent} id="exampleFormControlSelect1">
                        <option value={"----"} >----</option>
                        {allCategory && allCategory.map(cat => <SelectCategory key={cat.id} id={cat.id} word={cat.word} />)}
                    </select>
                </div>

                <div className="form-group my-3">
                    <label htmlFor="exampleFormControlSelect3">Select Category</label>
                    <select defaultValue={"----"} name="category" onChange={handleSelectCategory} className="form-control" id="exampleFormControlSelect3">
                        <option value={"----"} >----</option>
                        {catChildren && catChildren.map(cat => <SelectCategory key={cat.id} id={cat.id} word={cat.word} />)}
                    </select>
                </div>


                {/* <label htmlFor="customFile1">Choose Image</label>
                <input name="img" type="file" className="form-control " id="customFile1" /> */}



                <button type="submit" name='createBtn' className="btn btn-secondary ">Create</button>
            </form>

            {/* category table */}
            {
                type_category &&
                <div style={{ margin: " 0 350px" }}>

                    <table className="table ">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col" >Type</th>
                                <th scope="col">Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {catChildren && catChildren.map((cat, idx) => <CategoryTableRow key={cat.id} ind={idx + 1} data={cat} />)} */}
                            <tr>
                                <th scope="row">1</th>
                                <td>{type_category.type}</td>
                                <td>{type_category.category}</td>
                            </tr>

                        </tbody>
                    </table>


                </div>
            }
        </>
    )
}

export default CreateCategory
