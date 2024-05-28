import React, { createContext } from "react";
const baseURL = process.env.REACT_APP_BASE_URL;
export const CheckoutContext = createContext();
async function addCheckout(item) {
  var response = await fetch(`${baseURL}/checkout`, {
    method: "post",
    headers: {
      "content-type": "application/json",
      authorization: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      role: localStorage.getItem("role"),
    },
    body: JSON.stringify(item),
  });
  return await response.json();
}
async function getAllCheckout() {
  var response = await fetch(`${baseURL}/checkout`, {
    headers: {
      authorization: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      role: localStorage.getItem("role"),
    },
  });
  return await response.json();
}
async function getCheckout(item) {
  var response = await fetch(`${baseURL}/checkout/` + item._id, {
    headers: {
      authorization: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      role: localStorage.getItem("role"),
    },
  });
  return await response.json();
}
async function getCheckoutUser(item) {
  var response = await fetch(
    `${baseURL}/checkoutUser/` + localStorage.getItem("userid"),
    {
      headers: {
        authorization: localStorage.getItem("token"),
        username: localStorage.getItem("username"),
        role: localStorage.getItem("role"),
      },
    }
  );
  return await response.json();
}
async function updateCheckout(item) {
  var response = await fetch(`${baseURL}/checkout/` + item._id, {
    method: "put",
    headers: {
      "content-type": "application/json",
      authorization: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      role: localStorage.getItem("role"),
    },
    body: JSON.stringify(item),
  });
  return await response.json();
}
async function deleteCheckout(item) {
  var response = await fetch(`${baseURL}/checkout/` + item._id, {
    method: "delete",
    headers: {
      authorization: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      role: localStorage.getItem("role"),
    },
  });
  return await response.json();
}
export default function CheckoutContextProvider(props) {
  return (
    <CheckoutContext.Provider
      value={{
        addCheckout: addCheckout,
        getAllCheckout: getAllCheckout,
        getCheckout: getCheckout,
        deleteCheckout: deleteCheckout,
        updateCheckout: updateCheckout,
        getCheckoutUser: getCheckoutUser,
      }}>
      {props.children}
    </CheckoutContext.Provider>
  );
}
