import React, { createContext } from "react";

export const SubcategoryContext = createContext()
async function addSubcategory(item) {
    var response = await fetch("/subcategory", {
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
async function getAllSubcategory() {
    var response = await fetch("/subcategory", {
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username"),
            "role": localStorage.getItem("role")
        }
    })
    return await response.json()
}
async function getSubcategory(item) {
    var response = await fetch("/subcategory/"+item._id, {
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username"),
            "role": localStorage.getItem("role")
        }
    })
    return await response.json()
}
async function updateSubcategory(item){
    var response = await fetch("/subcategory/"+item._id,{
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
async function deleteSubcategory(item){
    var response = await fetch("/subcategory/"+item._id, {
        method:"delete",
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username"),
            "role": localStorage.getItem("role")
        }
    })
    return await response.json()
}
export default function SubcategoryContextProvider(props) {
    return (
        <SubcategoryContext.Provider value={{
            addSubcategory: addSubcategory,
            getAllSubcategory:getAllSubcategory,
            getSubcategory:getSubcategory,
            deleteSubcategory:deleteSubcategory,
            updateSubcategory:updateSubcategory
        }}>
            {props.children}
        </SubcategoryContext.Provider>
    )
}