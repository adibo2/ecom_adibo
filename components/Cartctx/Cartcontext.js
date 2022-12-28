import React from'react';

const Cartcontext=React.createContext({
    items: [],
    totalamount: 0,
    addItem: (item)=>{},
    removeItem:(id)=>{},
    clear:(id)=>{}
})
export default Cartcontext;