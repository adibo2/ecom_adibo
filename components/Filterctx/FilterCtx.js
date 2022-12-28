import React from "react";
const FilterCtx=React.createContext({
    filter:'',
    setfilter:'',
    changefilter:(type)=>{},

})
export default FilterCtx;