import React, { useState, useEffect, useContext } from 'react'
import { NewslatterContext } from '../../Store/NewslatterContextProvider';
import LeftNav from './LeftNav'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
export default function AdminNewslatter() {
  var [newslatter, setnewslatter] = useState([])
  var { getAllNewslatter, deleteNewslatter } = useContext(NewslatterContext)
  async function deleteRecord(_id) {
    if (window.confirm("Are Your Sure to Delete that Item : ")) {
      var item = {
        _id: _id
      }
      var response = await deleteNewslatter(item)
      if (response.result === "Done")
        getAPIData()
      else
        alert(response.message)
    }
  }
  async function getAPIData() {
    var response = await getAllNewslatter()
    if (response.result === "Done")
      setnewslatter(response.data)
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
          <h5 className='background text-light text-center p-2'>Newslatter List Page</h5>
          <table className='table'>
            <tbody>
              <tr>
                <th>Id</th>
                <th>Email Id</th>
                <th></th>
              </tr>
              {
                newslatter.map((item, index) => {
                  return <tr key={index}>
                    <td>{item._id}</td>
                    <td>{item.email}</td>
                    <td><button className='btn text-primary' style={{ border: "none" }} onClick={() => deleteRecord(item._id)}><DeleteForeverIcon /></button></td>
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
