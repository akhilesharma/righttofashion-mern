import React, { createContext } from "react";
const baseURL = process.env.REACT_APP_BASE_URL;
export const ContactContext = createContext();
async function addContact(item) {
  var response = await fetch(`${baseURL}/contact`, {
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
async function getAllContact() {
  var response = await fetch(`${baseURL}/contact`, {
    headers: {
      authorization: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      role: localStorage.getItem("role"),
    },
  });
  return await response.json();
}
async function getContact(item) {
  var response = await fetch(`${baseURL}/contact/` + item._id, {
    headers: {
      authorization: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      role: localStorage.getItem("role"),
    },
  });
  return await response.json();
}
async function updateContact(item) {
  var response = await fetch(`${baseURL}/contact/` + item._id, {
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
async function deleteContact(item) {
  var response = await fetch(`${baseURL}/contact/` + item._id, {
    method: "delete",
    headers: {
      authorization: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      role: localStorage.getItem("role"),
    },
  });
  return await response.json();
}
export default function ContactContextProvider(props) {
  return (
    <ContactContext.Provider
      value={{
        addContact: addContact,
        getAllContact: getAllContact,
        getContact: getContact,
        deleteContact: deleteContact,
        updateContact: updateContact,
      }}>
      {props.children}
    </ContactContext.Provider>
  );
}
