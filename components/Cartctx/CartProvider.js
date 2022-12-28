 

 import React, { useReducer,useEffect } from 'react'
import Cartcontext from './Cartcontext';
import Cookies from 'js-cookie'
const defaultstate={
    items:Cookies.get('Cart') ? JSON.parse(Cookies.get('Cart')) : [],
    totalamount:Cookies.get('total') ? JSON.parse(Cookies.get('total')) : 0
    
}
const Reducer=(state,action)=>{
    if(action.type==='ADD'){
        const updatetotalamount=state.totalamount*1 + parseInt(action.payload.price + 0.01);
        let updateitems;
        if(state.items.find((item)=>item.id===action.payload.id)){
            updateitems=state.items.map((item)=>(
                item.id===action.payload.id ? {...item,amount:item.amount+1} : item

            ))
        }
        else{
            action.payload.amount=1;
            
            updateitems=state.items.concat(action.payload)
        }
        return{
            totalamount:updatetotalamount,
            items:updateitems
        }

    }
    if(action.type==='ADDDETAIL'){
        const updatetotalamount=state.totalamount + parseInt(action.payload.price + 0.01 ) * parseInt(action.payload.amount);
        let updateitems;
        if(state.items.find((item)=>item.id===action.payload.id)){
            updateitems=state.items.map((item)=>(
                item.id===action.payload.id ? {...item,amount:item.amount+item.amount} : item

            ))
        }
        else{
            // action.payload.amount=1;
            updateitems=state.items.concat(action.payload)
        }
        return{
            totalamount:updatetotalamount,
            items:updateitems
        }

    }
    if(action.type==='REMOVE'){
        const existingCartindex=state.items.findIndex((item)=>item.id === action.payload);
        const existingCartitem=state.items[existingCartindex];
        const updatetotalamount=state.totalamount-parseInt(existingCartitem.price + 0.01);
        let updateitems;
        if(existingCartitem.amount===1){
            updateitems=state.items.filter((item)=>item.id !== action.payload);
        }
        else{
            let updateitem={...existingCartitem,amount:existingCartitem.amount - 1};
            updateitems=[...state.items];
            updateitems[existingCartindex]=updateitem;
        }
        return({
            items:updateitems,
            totalamount:updatetotalamount,
        })
    }
    if(action.type==='CLEAR'){
        const existingCartindex=state.items.findIndex((item)=>item.id === action.payload);
        const existingCartitem=state.items[existingCartindex];
        let updatetotalamount=state.totalamount - (parseInt(existingCartitem.price + 0.01) * parseInt(action.payload1.amount));
        let updateitems=state.items.filter((item)=>item.id !== action.payload);
        return({
            items:updateitems,
            totalamount: updatetotalamount,
        })
        


    }

}
 
 const CartProvider = (props) => {

    const [cartState,dispatch]=useReducer(Reducer,defaultstate)
    const additemcart=(item)=>{
        dispatch({type:'ADD',payload:item})
        // setItems((prevExpenses) => {
        //     return [item, ...prevExpenses];
        //   });

    }
    const additemcartDetail=(item)=>{
        dispatch({type:'ADDDETAIL',payload:item})
        // setItems((prevExpenses) => {
        //     return [item, ...prevExpenses];
        //   });

    }
    const removeitemcart=(id)=>{
        dispatch({type:'REMOVE',payload:id})
    }
    const clear=(item,id)=>{
        dispatch({type:'CLEAR',payload:id,payload1:item})
    }

    const Cart={
        items:cartState.items,
        totalamount:cartState.totalamount,
        addItem:additemcart,
        addDetail:additemcartDetail,
        removeItem:removeitemcart,
        clear


    }
    useEffect(()=>{
        // localStorage.setItem('Cart',JSON.stringify(cartState.items))
        Cookies.set('Cart',JSON.stringify(cartState.items))
        Cookies.set('total',JSON.stringify(cartState.totalamount))

        // localStorage.setItem('total',JSON.stringify(Cartstate.totalamount))

    },[cartState])


   return (
    <Cartcontext.Provider value={Cart}>
        {props.children}
    </Cartcontext.Provider>
   
   )
 }
 export default CartProvider;
 