import React, { createContext } from "react";

export const CartContext = createContext()
async function addCart(item) {
    var response = await fetch("/cart", {
        method: "post",
        headers: {
            "content-type": "application/json",
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username"),
            "role": localStorage.getItem("role")
        },
        body: JSON.stringify(item)
    })
    return await response.json()
}
async function getAllCart() {
    var response = await fetch("/cartAll/"+localStorage.getItem("userid"), {
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username"),
            "role": localStorage.getItem("role")
        }
    })
    return await response.json()
}
async function getCart(item) {
    var response = await fetch("/cart/"+item._id, {
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username"),
            "role": localStorage.getItem("role")
        }
    })
    return await response.json()
}
async function updateCart(item){
    var response = await fetch("/cart/"+item._id,{
        method:"put",
        headers:{
            "content-type":"application/json",
            "authorization":localStorage.getItem("token"),
            "username":localStorage.getItem("username"),
            "role":localStorage.getItem("role")
        },
        body:JSON.stringify(item)
    })
    return await response.json()
}
async function deleteCart(item){
    var response = await fetch("/cart/"+item._id, {
        method:"delete",
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username"),
            "role": localStorage.getItem("role")
        }
    })
    return await response.json()
}
async function deleteAllCart(item) {
    var response = await fetch("/cartAll/"+localStorage.getItem("userid"), {
        method: "delete",
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username"),
            "role": localStorage.getItem("role")
        }
    })
    return await response.json()
}
export default function CartContextProvider(props) {
    return (
        <CartContext.Provider value={{
            addCart: addCart,
            getAllCart:getAllCart,
            getCart:getCart,
            deleteCart:deleteCart,
            updateCart: updateCart,
            deleteAllCart: deleteAllCart
        }}>
            {props.children}
        </CartContext.Provider>
    )
}