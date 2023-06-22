import React, { useContext } from 'react'
import appContext from '../../context/context'
import Card from '../home/Card'
import Navbar from '../navbar/Navbar'

const CategoryPage = () => {
  // context
  const { categoryData } = useContext(appContext)

  

  return (
    <>
    <Navbar/>

      {categoryData && categoryData.children.map(datas =>
        
          <div key={datas.id}>

            <h1 style={{margin: "10px 5rem"}} >{datas.word}</h1>
            <div className='homeContainer'>
                {datas && datas.product.map(data => <Card key={data.id} id={data.id} title={data.title} price={data.price}  info={data.information} img={data.image} des={data.description} />)}
            </div>
          </div>
        
      )}



    </>
  )
}

export default CategoryPage
