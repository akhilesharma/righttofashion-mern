import React, { useContext, useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import pic from "../Asset/images/noimage.png"
import { WishlistContext } from '../Store/WishlistContextProvider';
import { CheckoutContext } from '../Store/CheckoutContextProvider';
import { UserContext } from '../Store/UserContextProvider';
import { Link, useNavigate } from 'react-router-dom';
export default function Profile() {
    var [wishlist, setwishlist] = useState([])
    var [order, setorder] = useState([])
    var [user, setuser] = useState({})
    var { getAllWishlist, deleteWishlist } = useContext(WishlistContext)
    var { getCheckoutUser } = useContext(CheckoutContext)
    var { getUser } = useContext(UserContext)
    var navigate = useNavigate()
    async function deleteRecord(_id) {
        if (window.confirm("Are Your Sure to Delete that Item : ")) {
            var item = {
                _id: _id
            }
            var response = await deleteWishlist(item)
            if (response.result === "Done")
                getAPIData()
            else
                alert(response.message)
        }
    }
    async function getAPIData() {
        var response = await getAllWishlist()
        if (response.result === "Fail")
            navigate("/login")

        setwishlist(response.data)

        response = await getCheckoutUser()
        setorder(response.data)

        response = await getUser()
        setuser(response.data)

    }
    useEffect(() => {
        getAPIData()
    }, [])
    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={6} xs={12} >
                    <img src={user?.pic ? `/public/images/${user?.pic}` : pic} className="w-100" height="505px" alt='' />
                </Grid>
                <Grid item md={6} xs={12} >
                    <h5 className='background text-light text-center p-2'>{user?.role} Profile Section</h5>
                    <table className='table'>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>{user?.name}</td>
                            </tr>
                            <tr>
                                <th>User Name</th>
                                <td>{user?.username}</td>
                            </tr>
                            <tr>
                                <th>Email Address</th>
                                <td>{user?.email}</td>
                            </tr>
                            <tr>
                                <th>Phone Number</th>
                                <td>{user?.phone}</td>
                            </tr>
                            <tr>
                                <th>House Or Building Number</th>
                                <td>{user?.addressline1}</td>
                            </tr>
                            <tr>
                                <th>Street Number or Near By</th>
                                <td>{user?.addressline2}</td>
                            </tr>
                            <tr>
                                <th>Locality</th>
                                <td>{user?.addressline3}</td>
                            </tr>
                            <tr>
                                <th>PIN CODE</th>
                                <td>{user?.pin}</td>
                            </tr>
                            <tr>
                                <th>City</th>
                                <td>{user?.city}</td>
                            </tr>
                            <tr>
                                <th>State</th>
                                <td>{user?.state}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Link to="/update-profile" className='btn background text-light text-center w-100 btn-sm'>Update Profile</Link>
                </Grid>
            </Grid>
            <h5 className='background text-light text-center p-2 mt-2'>Wishlist Section</h5>
            <div className="container-fluid">
                <div className='table-responsive'>
                    <table className='table table-striped table-hover'>
                        <tbody>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Maincategory</th>
                                <th>Subcategory</th>
                                <th>Brand</th>
                                <th>Color</th>
                                <th>Size</th>
                                <th>Price</th>
                                <th></th>
                                <th></th>
                            </tr>
                            {
                                wishlist?.map((item, index) => {
                                    return <tr key={index}>
                                        <td><img src={item.pic ? `/public/images/${item.pic}` : ""} className="rounded" style={{ width: "100px", height: "75px" }} alt=''></img></td>
                                        <td>{item.name}</td>
                                        <td>{item.maincategory}</td>
                                        <td>{item.subcategory}</td>
                                        <td>{item.brand}</td>
                                        <td>{item.color}</td>
                                        <td>{item.size}</td>
                                        <td>&#8377;{item.price}</td>
                                        <td><Link className='btn text-primary' style={{ border: "None" }} to={`/single-product-page/${item.productid}`}><ShoppingCartIcon /></Link></td>
                                        <td><button className='btn text-primary' style={{ border: "None" }} onClick={() => deleteRecord(item._id)}><DeleteIcon /></button></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <h5 className='background text-light text-center p-2 mt-2'>Order History Section</h5>
            <div className="container-fluid">
                {
                    order?.map((item, index) => {
                        return <div key={index} className='row'>
                            <div className='col-md-3 col-sm-6 col-12'>
                                <div className='table-responsive'>
                                    <table className='table table-striped table-light table-hover'>
                                        <tbody>
                                            <tr>
                                                <th>ID</th>
                                                <td>{item._id}</td>
                                            </tr>
                                            <tr>
                                                <th>User Id</th>
                                                <td>{item.userid}</td>
                                            </tr>
                                            <tr>
                                                <th>Payment Mode</th>
                                                <td>{item.mode}</td>
                                            </tr>
                                            <tr>
                                                <th>Order Status</th>
                                                <td>{item.status}</td>
                                            </tr>
                                            <tr>
                                                <th>Payment Status</th>
                                                <td>{item.paymentstatus}</td>
                                            </tr>
                                            <tr>
                                                <th>Total</th>
                                                <td>&#8377;{item.totalamount}</td>
                                            </tr>
                                            <tr>
                                                <th>Shipping</th>
                                                <td>&#8377;{item.shippingamount}</td>
                                            </tr>
                                            <tr>
                                                <th>Final Amount</th>
                                                <td>&#8377;{item.finalamount}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='col-md-9 col-sm-6 col-12'>
                                <div className='table-responsive'>
                                    <table className="table table-light table-responsive table-hover">
                                        <tbody>
                                            <tr>
                                                <th></th>
                                                <th>Name</th>
                                                <th>Color</th>
                                                <th>Size</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th>Total</th>
                                            </tr>
                                            { 
                                                item?.product?.map((p, index) => {
                                                    return <tr key={index}>
                                     
                                                        <td><img src={p.pic ? `/public/images/${p.pic}` : ""} width="50px" height="50px" className='rounded' /></td>
                                                        <td>{p.name}</td>
                                                        <td>{p.color}</td>
                                                        <td>{p.size}</td>
                                                        <td>&#8377;{p.price}</td>
                                                        <td>{p.qty}</td>
                                                        <td>&#8377;{p.total}</td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <hr style={{ border: "5px solid gray" }} />
                        </div>
                    })
                }
            </div>
        </>
    )
}
