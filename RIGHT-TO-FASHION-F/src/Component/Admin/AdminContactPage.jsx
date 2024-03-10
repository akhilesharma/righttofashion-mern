import React, { useState, useEffect, useContext } from 'react'
import LeftNav from './LeftNav'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link } from 'react-router-dom';
import { ContactContext } from "../../Store/ContactContextProvider"
export default function AdminContactPage() {
    var [contact, setcontact] = useState([])
    var { getAllContact, deleteContact } = useContext(ContactContext)
    async function deleteRecord(_id) {
        if (window.confirm("Are You Sure to delete this item.")) {
            var item = {
                _id: _id
            }
            
            var response = await deleteContact(item)
            if (response.result === "Done")
                getAPIData()
            else
                alert(response.message)
        }
    }
    async function getAPIData() {
        var response = await getAllContact()
        if (response.result === "Done") {
            
            setcontact(response.data)
        }

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
                    <h5 className='background text-light text-center p-2'>Admin Contact Page</h5>
                    <table className='table'>
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email id</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                            {
                                
                                contact?.map((item, index) => {
                                    return <tr key={index}>
                                        <td>{item._id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.status}</td>
                                        <td><Link className='btn text-primary' style={{ border: "none" }} to={`/admin-single-contact/${item._id}`} ><RemoveRedEyeIcon /></Link></td>
                                        <td>{item.status !== "Active" ? <button className='btn text-primary' style={{ border: "none" }} onClick={() => deleteRecord(item._id)} ><DeleteOutlineIcon></DeleteOutlineIcon></button> : ""}</td>
                                    </tr>
                                })
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
