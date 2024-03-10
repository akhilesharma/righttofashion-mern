import React, { createContext } from "react";

export const ProductContext = createContext()
async function addProduct(item) {
    var response = await fetch("/product", {
        method: "post",
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username"),
            "role": localStorage.getItem("role")
        },
        body: item
    })
    return await response.json()
}
async function getAllProduct() {
    var response = await fetch("/product", {
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username"),
            "role": localStorage.getItem("role")
        }
    })
    return await response.json()
}
async function getProduct(item) {
    var response = await fetch("/product/"+item._id, {
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username"),
            "role": localStorage.getItem("role")
        }
    })
    return await response.json()
}
async function updateProduct(item,_id){
    var response = await fetch("/product/"+_id,{
        method:"put",
        headers:{
            "authorization":localStorage.getItem("token"),
            "username":localStorage.getItem("username"),
            "role":localStorage.getItem("role")
        },
        body:item
    })
    return await response.json()
}
async function deleteProduct(item){
    var response = await fetch("/product/"+item._id, {
        method:"delete",
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username"),
            "role": localStorage.getItem("role")
        }
    })
    return await response.json()
}
export default function ProductContextProvider(props) {
    return (
        <ProductContext.Provider value={{
            addProduct: addProduct,
            getAllProduct:getAllProduct,
            getProduct:getProduct,
            deleteProduct:deleteProduct,
            updateProduct:updateProduct
        }}>
            {props.children}
        </ProductContext.Provider>
    )
}