
import React, { useReducer, useState } from 'react'
import FilterCtx from './FilterCtx'
// const defaultstate={
//     filter:'Windows'
// }
// const filterReducer=()=>{

// }

const FilterProvider = (props) => {
    // const [filterstate,dispatch]=useReducer(filterReducer,defaultstate)
    const [filterstate,Setfilter]=useState("Windows")
    // const filter=(filter)=>{
    //   Setfilter(filter)

    // }

    // const Filter={
    //     filter:filterstate,
    //     setfilter:Setfilter
    //     // changefilter:filter
        
       


    // } 
  return (
    <FilterCtx.Provider value={{filterstate,Setfilter}}>
        {props.children}
    </FilterCtx.Provider>
  )
}

export default FilterProvider