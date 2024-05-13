import React, { createContext } from "react";

export const WishlistContext = createContext()
async function addWishlist(item) {
    var response = await fetch("/wishlist", {
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
async function getAllWishlist() {
    var response = await fetch("/wishlist/"+localStorage.getItem("userid"), {
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username"),
            "role": localStorage.getItem("role")
        }
    })
    return await response.json()
}
async function deleteWishlist(item){
    var response = await fetch("/wishlist/"+item._id, {
        method:"delete",
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username"),
            "role": localStorage.getItem("role")
        }
    })
    return await response.json()
}
export default function WishlistContextProvider(props) {
    return (
        <WishlistContext.Provider value={{
            addWishlist: addWishlist,
            getAllWishlist:getAllWishlist,
            deleteWishlist:deleteWishlist
        }}>
            {props.children}
        </WishlistContext.Provider>
    )
}