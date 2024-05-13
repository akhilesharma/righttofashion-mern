import React, { createContext } from "react";

export const BrandContext = createContext()
async function addBrand(item) {
    var response = await fetch("/brand", {
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
async function getAllBrand() {
    var response = await fetch("/brand", {
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username"),
            "role": localStorage.getItem("role")
        }
    })
    return await response.json()
}
async function getBrand(item) {
    var response = await fetch("/brand/"+item._id, {
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username"),
            "role": localStorage.getItem("role")
        }
    })
    return await response.json()
}
async function updateBrand(item){
    var response = await fetch("/brand/"+item._id,{
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
async function deleteBrand(item){
    var response = await fetch("/brand/"+item._id, {
        method:"delete",
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username"),
            "role": localStorage.getItem("role")
        }
    })
    return await response.json()
}
export default function BrandContextProvider(props) {
    return (
        <BrandContext.Provider value={{
            addBrand: addBrand,
            getAllBrand:getAllBrand,
            getBrand:getBrand,
            deleteBrand:deleteBrand,
            updateBrand:updateBrand
        }}>
            {props.children}
        </BrandContext.Provider>
    )
}