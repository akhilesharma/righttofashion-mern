import React, { useState, useEffect, useContext } from 'react'
import LeftNav from './LeftNav'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import { BrandContext } from "../../Store/BrandContextProvider"
import LoupeIcon from '@mui/icons-material/Loupe';
import EditIcon from '@mui/icons-material/Edit';
export default function AdminBrand() {
    var [brand, setbrand] = useState([])
    var { getAllBrand, deleteBrand } = useContext(BrandContext)
    async function deleteRecord(_id) {
        if (window.confirm("Are You Sure to delete thid item.")) {
            var item = {
                _id: _id
            }
            var response = await deleteBrand(item)
            if (response.result === "Done")
                getAPIData()
            else
                alert(response.message)
        }
    }
    async function getAPIData() {
        var response = await getAllBrand()
        if (response.result === "Done")
            setbrand(response.data)
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
                    <h5 className='background text-light text-center p-2'>Brand Page <Link to="/admin-add-brand"><LoupeIcon /></Link></h5>
                    <table className='table'>
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                            </tr>
                            {
                                brand.map((item, index) => {
                                    return <tr key={index}>
                                        <td>{item._id}</td>
                                        <td>{item.name}</td>
                                        <td><Link className='btn text-primary' style={{ border: "none" }} to={`/admin-update-brand/${item._id}`}  ><EditIcon /></Link></td>

                                        <td><button className='btn text-primary' style={{ border: "none" }} onClick={() => deleteRecord(item._id)} ><DeleteOutlineIcon /></button></td>
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
