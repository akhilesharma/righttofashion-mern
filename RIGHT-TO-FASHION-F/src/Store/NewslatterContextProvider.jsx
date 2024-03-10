import React, { createContext } from "react";

export const NewslatterContext = createContext()
async function addNewslatter(item) {
    var response = await fetch("/newslatter", {
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
async function getAllNewslatter() {
    var response = await fetch("/newslatter", {
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username"),
            "role": localStorage.getItem("role")
        }
    })
    return await response.json()
}
async function deleteNewslatter(item){
    var response = await fetch("/newslatter/"+item._id, {
        method:"delete",
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username"),
            "role": localStorage.getItem("role")
        }
    })
    return await response.json()
}
export default function NewslatterContextProvider(props) {
    return (
        <NewslatterContext.Provider value={{
            addNewslatter: addNewslatter,
            getAllNewslatter:getAllNewslatter,
            deleteNewslatter:deleteNewslatter,
        }}>
            {props.children}
        </NewslatterContext.Provider>
    )
}