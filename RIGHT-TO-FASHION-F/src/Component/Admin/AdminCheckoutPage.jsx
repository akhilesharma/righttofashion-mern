import React, { useContext, useState,useEffect } from 'react'
import LeftNav from './LeftNav'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link } from 'react-router-dom';

import { CheckoutContext } from '../../Store/CheckoutContextProvider';
export default function AdminCheckoutPage() {
    var [checkout,setcheckout]=useState([])
    var { getAllCheckout } = useContext(CheckoutContext)
    
    async function getAPIData() {
        var response = await getAllCheckout()
        if (response.result === "Done")
            setcheckout(response.data)
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
                    <h5 className='background text-light text-center p-2'>Checkout List Page</h5>
                    <table className='table'>
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <th>Date</th>
                                <th>Payment Mode</th>
                                <th>Order Status</th>
                                <th>Payment Status</th>
                                <th></th>
                            </tr>
                            {
                                checkout.map((item, index) => {
                                    return <tr key={index}>
                                        <td>{item._id}</td>
                                        <td>{`${new Date(item.date).getDate()}/${new Date(item.date).getMonth()}/${new Date(item.date).getFullYear()} ${new Date(item.date).getHours()}:${new Date(item.date).getMinutes()}:${new Date(item.date).getSeconds()}`}</td>
                                        <td>{item.mode}</td>
                                        <td>{item.status}</td>
                                        <td>{item.paymentstatus}</td>
                                        <td><Link className='btn text-primary' style={{ border: "none" }} to={`/admin-single-checkout/${item._id}`}><RemoveRedEyeIcon /></Link></td>
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
