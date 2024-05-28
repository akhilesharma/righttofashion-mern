import React, { createContext } from "react";
const baseURL = process.env.REACT_APP_BASE_URL;
export const MaincategoryContext = createContext();
async function addMaincategory(item) {
  var response = await fetch(`${baseURL}/maincategory`, {
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
async function getAllMaincategory() {
  var response = await fetch(`${baseURL}/maincategory`, {
    headers: {
      authorization: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      role: localStorage.getItem("role"),
    },
  });
  return await response.json();
}
async function getMaincategory(item) {
  var response = await fetch(`${baseURL}/maincategory/` + item._id, {
    headers: {
      authorization: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      role: localStorage.getItem("role"),
    },
  });
  return await response.json();
}
async function updateMaincategory(item) {
  var response = await fetch(`${baseURL}/maincategory/` + item._id, {
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
async function deleteMaincategory(item) {
  var response = await fetch(`${baseURL}/maincategory/` + item._id, {
    method: "delete",
    headers: {
      authorization: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      role: localStorage.getItem("role"),
    },
  });
  return await response.json();
}
export default function MaincategoryContextProvider(props) {
  return (
    <MaincategoryContext.Provider
      value={{
        addMaincategory: addMaincategory,
        getAllMaincategory: getAllMaincategory,
        getMaincategory: getMaincategory,
        deleteMaincategory: deleteMaincategory,
        updateMaincategory: updateMaincategory,
      }}>
      {props.children}
    </MaincategoryContext.Provider>
  );
}
