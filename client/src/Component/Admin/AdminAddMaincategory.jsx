import React, { useState,useContext } from 'react'
import LeftNav from './LeftNav'
import { useNavigate } from 'react-router-dom';
import { MaincategoryContext } from '../../Store/MaincategoryContextProvider';
export default function AdminAddMaincategory() {
    var [name, setname] = useState("")
    var {addMaincategory} =useContext(MaincategoryContext)
    var navigate=useNavigate()
    function getData(e) {
        setname(e.target.value)
    }
    async function postData(e) {
        e.preventDefault()
         var item = {
                name:name
        }
        
var response=await addMaincategory(item)
           
        if (response.result === "Done")
            navigate("/admin-maincategory")
            else
            alert(response.message)
    }
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12'>
                    <LeftNav />
                </div>
                <div className='col-xl-10 col-lg-9 col-md-8 col-sm-6 col-12'>
                    <h5 className='background text-light text-center p-2'>Maincategory Page </h5>
                    <form onSubmit={postData}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" name='name' onChange={getData} placeholder="Enter maincategory name" />
                        </div>

                        <button type="submit" className="btn background text-light text-center w-100">Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

