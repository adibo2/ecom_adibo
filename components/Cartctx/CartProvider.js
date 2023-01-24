 

 import React, { useReducer,useEffect } from 'react'
import Cartcontext from './Cartcontext';
import Cookies from 'js-cookie'
const defaultstate={
    items:Cookies.get('Cart') ? JSON.parse(Cookies.get('Cart')) : [],
    totalamount:Cookies.get('total') ? JSON.parse(Cookies.get('total')) : 0
    
}
const Reducer=(state,action)=>{
    if(action.type==='ADD'){
        // const updatetotalamount=state.totalamount*1 + parseInt(action.payload.reduce((a, c) => a + c.amount * c.price, 0).toFixed(2));
        let updateitems;
        // if(state.items.find((item)=>item.id===action.payload.id)){
        //     updateitems=state.items.map((item)=>(
        //         item.id===action.payload.id ? {...item,amount:item.amount+1} : item

        //     ))
        // }
        if(state.items.find((item)=>item.id===action.payload.id)){
            updateitems=state.items.map((item)=>{
                if(item.amount+action.payload.amount <= item.stock)
                {
                    return item.id===action.payload.id ? {...item,amount:item.amount+action.payload.amount,subtotal:item.subtotal+action.payload.subtotal} : item
                }
                else{
                    return item.id===action.payload.id ? {...item,amount:item.stock} : item

                }
                

        })
        }
        else{
            action.payload.amount=1;
            
            updateitems=state.items.concat(action.payload)
        }
        return{
            items:updateitems,
            totalamount:updateitems.reduce((a, c) => a + c.amount * c.price, 0).toFixed(2)*1,
        }

    }
    if(action.type==='ADDDETAIL'){
        let updatetotalamount;
        console.log(state.items.map((item)=>(item)))

        
        updatetotalamount=  state.totalamount +  (parseInt(action.payload.price + 0.01 ) * parseInt(action.payload.amount));
        updatetotalamount=state.items.reduce((a, c) => a + c.subtotal, 0)
        let updateitems;
        if(state.items.find((item)=>item.id===action.payload.id)){
            updateitems=state.items.map((item)=>{
                if(item.amount+action.payload.amount <= item.stock)
                {
                    return item.id===action.payload.id ? {...item,amount:item.amount+action.payload.amount,subtotal:item.subtotal+action.payload.subtotal} : item
                }
                else{
                    return item.id===action.payload.id ? {...item,amount:item.stock} : item

                }
                

        })
        }
        else{
            action.payload.amount=action.payload.amount;
            updateitems=state.items.concat(action.payload)
        }
        return{
            items:updateitems,
            totalamount:updateitems.reduce((a, c) => a + c.amount * c.price, 0).toFixed(2)*1,
        }

    }
    if(action.type==='REMOVE'){
        const existingCartindex=state.items.findIndex((item)=>item.id === action.payload);
        const existingCartitem=state.items[existingCartindex];
        const updatetotalamount=state.totalamount-parseInt(existingCartitem.price);
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
        let updatetotalamount=state.totalamount - (parseInt(existingCartitem.price) * parseInt(action.payload1.amount));
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
    const additemcartDetail=(item,count)=>{
        dispatch({type:'ADDDETAIL',payload:item,payloadcount:count})
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
 