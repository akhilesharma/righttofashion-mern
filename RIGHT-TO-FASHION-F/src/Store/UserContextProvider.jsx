import React, { createContext } from "react";

export const UserContext = createContext()
async function addUser(item) {
    var response = await fetch("/user", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(item)
    })
    return await response.json()
}
async function getAllUser() {
    var response = await fetch("/user", {
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username"),
            "role": localStorage.getItem("role")
        }
    })
    return await response.json()
}
async function getUser() {
    var response = await fetch("/user/"+localStorage.getItem("userid"), {
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username"),
            "role": localStorage.getItem("role")
        }
    })
    return await response.json()
}
async function updateUser(item) {
    console.log(item);
    var response = await fetch("/user/"+localStorage.getItem("userid"),{
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
async function deleteUser(item){
    var response = await fetch("/user/"+item._id, {
        method:"delete",
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username"),
            "role": localStorage.getItem("role")
        }
    })
    return await response.json()
}
export default function UserContextProvider(props) {
    return (
        <UserContext.Provider value={{
            addUser: addUser,
            getAllUser:getAllUser,
            getUser:getUser,
            deleteUser:deleteUser,
            updateUser:updateUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}