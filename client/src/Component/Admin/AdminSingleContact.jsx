import React, { useState, useEffect, useContext } from 'react'
import LeftNav from './LeftNav'
import { useParams, useNavigate } from 'react-router-dom'
import { ContactContext } from "../../Store/ContactContextProvider"
export default function AdminSingleContact() {
    var [status, setstatus] = useState("Active")
    var { _id } = useParams()
    var [contact, setcontact] = useState([])
    var { getContact, deleteContact, updateContact } = useContext(ContactContext)
    var navigate = useNavigate()
    async function deleteRecord() {
        if (window.confirm("Are You Sure to delete thid item.")) {
            var item = {
                _id: _id
            }
            var response = await deleteContact(item)
            if (response.result === "Done")
                navigate("/admin-contact")
            else
                alert(response.message)
        }
    }
    async function updateRecord() {
        var response = await updateContact({ _id: _id, status: "Done" })
        if (response.result === "Done")
            getAPIData()
        else
            alert(response.message)
    }

    async function getAPIData() {
        var response = await getContact({ _id: _id })
        if (response.result === "Done")
            setcontact(response.data)
        else
            alert(response.message)
    }
    useEffect(() => {
        getAPIData()
    }, [])
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12'>
                    <LeftNav />
                </div>
                <div className='col-xl-10 col-lg-9 col-md-8 col-sm-6 col-12'>
                    <h5 className='background text-light text-center p-2'>Admin Single Contact Page</h5>
                    <table className='table'>
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <td>{contact._id}</td>
                            </tr>
                            <tr><th>Email id</th>
                                <td>{contact.email}</td>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <td>{contact.name}</td>
                            </tr>
                            <tr><th>Phone</th>
                                <td>{contact.phone}</td>
                            </tr>
                            <tr>
                                <th>Subject</th>
                                <td>{contact.subject}</td>
                            </tr>
                            <tr><th>Message</th>
                                <td>{contact.message}</td>
                            </tr>
                            <tr>
                                <th>Date</th>
                                <td>{new Date(contact.date).getDate()}/{new Date(contact.date).getMonth() + 1}/{new Date(contact.date).getFullYear()}</td>
                            </tr>
                            <tr> <th>Status</th>
                                <td>{contact.status}</td>
                            </tr>
                            <tr>
                                {
                                    contact.status === "Active" ?
                                        <th colSpan={2}><button onClick={updateRecord}>Change Status To Done</button></th>
                                        :
                                        <th colSpan={2}><button onClick={deleteRecord}>Delete</button></th>
                                }
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
