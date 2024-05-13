import React, { useContext, useState, useEffect } from 'react'
import LeftNav from './LeftNav'
import { UserContext } from '../../Store/UserContextProvider';
import pic from "../../Asset/images/user.jpg"
export default function AdminHome() {
    var [user, setuser] = useState({})
    var { getUser } = useContext(UserContext)
    async function getAPIData() {    
        let response = await getUser()
        setuser(response.data)
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
                    <h5 className='background text-light text-center p-2'>Admin Home Page</h5>
                    <div className='row'>
                        <div className='col-md-6 col-12'>
                            <img src={user.pic ? `/public/images/${user.pic}` :""} width="100%" height="370px" className='rounded' alt=''/>
                        </div>
                        <div className='col-md-6 col-12'>
                            <table className='table'>
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <td>{user.name}</td>
                                    </tr>
                                    <tr>
                                        <th>User name</th>
                                        <td>{user.username}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{user.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone</th>
                                        <td>{user.phone}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
