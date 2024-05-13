import React, { useState,useEffect } from 'react'
import LeftNav from './LeftNav'
import { useNavigate,useParams } from 'react-router-dom';
export default function AdminUpdateSubcategory() {
     var [name, setname] = useState("")
    var navigate = useNavigate()
    var {_id}=useParams()
    function getData(e) {
        setname(e.target.value)
    }
   async function postData(e) {
        e.preventDefault()
         var item = {
                name:name              
            }
            var response = await fetch("/subcategory/"+_id, {
                method: "put",
                headers: {
                    "content-type": "application/json",
                    "authorization":localStorage.getItem("token"),
                    "username":localStorage.getItem("username"),
                    "role":localStorage.getItem("role")
                },
                body:JSON.stringify(item)
            })
            response = await response.json()
            if (response.result === "Done")
                navigate("/admin-subcategory")
            else
                alert(response.message)
    }
    async function getAPIData() {
          var response = await fetch("/subcategory/"+_id, {
              
                headers: {
                   
                    "authorization":localStorage.getItem("token"),
                    "username":localStorage.getItem("username"),
                    "role":localStorage.getItem("role")
                }
            })
            response = await response.json()
            if (response.result === "Done")
               setname(response.data.name)
            else
                alert(response.message)
    }
    useEffect(() => {
        getAPIData()
    },[])
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12'>
                    <LeftNav />
                </div>
                <div className='col-xl-10 col-lg-9 col-md-8 col-sm-6 col-12'>
                    <h5 className='background text-light text-center p-2'>Subcategory Page </h5>
                    <form onSubmit={postData}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" name='name' value={name} onChange={getData} placeholder="Enter Subcategory name" />
                        </div>

                        <button type="submit" className="btn background text-light text-center w-100">Update</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
