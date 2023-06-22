import React from 'react'

const SelectCategory = ({id,word}) => {
  return (
    <>
       <option value={id} >{word}</option>
    </>
  )
}

export default SelectCategory
