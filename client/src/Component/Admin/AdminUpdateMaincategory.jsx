import React, { useState,useEffect,useContext } from 'react'
import LeftNav from './LeftNav'
import { useNavigate, useParams } from 'react-router-dom';
import { MaincategoryContext } from '../../Store/MaincategoryContextProvider';
export default function AdminUpdateMaincategory() {
    var [name, setname] = useState("")
    var navigate = useNavigate()
    var { _id } = useParams()
     var {getMaincategory,updateMaincategory}=useContext(MaincategoryContext)
    function getData(e) {
        setname(e.target.value)
    }
   async function postData(e) {
        e.preventDefault()
         var item = {
             name: name,
             _id:_id
            }
           
           var response = await updateMaincategory(item)
            if (response.result === "Done")
                navigate("/admin-maincategory")
            else
                alert(response.message)
    }
    async function getAPIData() {
        var item = {
             _id:_id
         }
          var response = await getMaincategory(item)
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
                    <h5 className='background text-light text-center p-2'>Maincategory Page </h5>
                    <form onSubmit={postData}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" name='name' onChange={getData} placeholder="Enter maincategory name"value={name} />
                        </div>

                        <button type="submit" className="btn background text-light text-center w-100">Update</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
