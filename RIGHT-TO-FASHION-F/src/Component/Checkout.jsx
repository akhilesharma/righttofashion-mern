import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../Store/UserContextProvider';
import { CartContext } from '../Store/CartContextProvider'
import { CheckoutContext } from '../Store/CheckoutContextProvider'
import { Link, useNavigate } from 'react-router-dom';
export default function Checkout() {
    let [ischeckout, setischeckout] = useState(true)
    let [orderdetail, setorderdetail] = useState({})
    var [mode, setmode] = useState("COD")
    var [cart, setcart] = useState([])
    var [total, settotal] = useState([])
    var [shipping, setshipping] = useState([])
    var [final, setfinal] = useState([])
    var [user, setuser] = useState({})
    var { getUser } = useContext(UserContext)
    var { addCheckout } = useContext(CheckoutContext)
    var { getAllCart, deleteAllCart } = useContext(CartContext)
    var navigate = useNavigate(useNavigate)
    function getData(e) {
        setmode(e.target.value)
    }
    async function addToCheckout() {
        var item = {
            userid: localStorage.getItem("userid"),
            totalamount: total,
            shippingamount: shipping,
            finalamount: final,
            product: cart,
            date: new Date(),
            paymentstatus:"Success"
        }
        var response = await addCheckout(item)
        if (response.result === "Done") {
            await deleteAllCart()
            if (mode === "COD") {
                setorderdetail(response.data)
                setischeckout(false)

            }

            else {
                localStorage.setItem("orderid", response.data._id)
                navigate("/payment/-1")
            }
        }
        else
            alert(response.message)
    }
    async function getAPIData() {
        var response = await getAllCart()
        if (response.result === "Fail")
            navigate("/login")
        setcart(response.data)
        var total = 0
        var shipping = 0
        for (let item of response.data) {
            total = total + item.total
        }
        if (total > 0 && total < 1000)
            shipping = 150
        settotal(total)
        setshipping(shipping)
        setfinal(total + shipping)


        response = await getUser()
        setuser(response.data)
    }
    useEffect(() => {
        getAPIData()
    }, [])
    return (
        <div className='container-fluid'>
            {
                ischeckout === true && <div className='row'>
                    <div className='col-md-6 col-12'>
                        <h5 className='background text-light text-center p-2'>Billing Details</h5>
                        <div className='table'>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>{user.name}</td>
                                </tr>
                                <tr>
                                    <th>User Name</th>
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
                                <tr>
                                    <th>House or Building no</th>
                                    <td>{user.addressline1}</td>
                                </tr>
                                <tr>
                                    <th>Street no or Near by</th>
                                    <td>{user.addressline2}</td>
                                </tr>
                                <tr>
                                    <th>Locality</th>
                                    <td>{user.addressline3}</td>
                                </tr>
                                <tr>
                                    <th>PIN CODE</th>
                                    <td>{user.pin}</td>
                                </tr>
                                <tr>
                                    <th>City</th>
                                    <td>{user.city}</td>
                                </tr>
                                <tr>
                                    <th>State</th>
                                    <td>{user.state}</td>
                                </tr>

                            </tbody>
                            <Link to="/update-profile" className='btn background text-light text-center w-100 btn-sm'>Update Profile</Link>
                        </div>
                    </div>
                    <div className='col-md-6 col-12'>
                        {cart.length !== 0 ? <div className='table-responsive'>
                            <table className='table table-striped table-hover'>
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
                                        cart.map((item, index) => {
                                            return <tr key={index}>
                                                <td><img src={item.pic ? `/public/images/${item.pic}` : ""} alt='' className="rounded" style={{ width: "100px", height: "75px" }}></img></td>
                                                <td>{item.name}</td>
                                                <td>{item.color}</td>
                                                <td>{item.size}</td>
                                                <td>&#8377;{item.price}</td>
                                                <td>{item.qty}</td>
                                                <td>&#8377;{item.total}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                            <table className='table table-striped table-hover'>
                                <tbody>
                                    <tr>
                                        <th>Total Amount</th>
                                        <td>&#8377;{total}</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping Amount</th>
                                        <td>&#8377;{shipping}</td>
                                    </tr>
                                    <tr>
                                        <th>Final Amount</th>
                                        <td>&#8377;{final}</td>
                                    </tr>
                                    <tr>
                                        <th>Mode Of Payment</th>
                                        <td>
                                            <select className='form-select' name='mode' onChange={getData}>
                                                <option value="COD">Cash On Delivery</option>
                                                <option value="Net Banking">NetBanking/Card/UPI</option>
                                            </select>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th colSpan={2}><button className='btn background text-light w-100 btn-sm' onClick={addToCheckout}>Place Order</button></th>
                                    </tr>

                                </tbody>
                            </table>
                        </div> :"No Item to Checkout"}
                    </div>
                </div>
            }
            {
                ischeckout === false && <div className='background text-light text-center py-4 my-4'>
                    <p>Your Order id {orderdetail?._id}  has been placed successfully!!!!!!</p>
                    <p>Thanks for shopping with us!!!!!!</p>
                    <p>You can track your order in profile page section.</p>
                    <p>Happy Shopping!!!!!!</p>
                </div>
            }
        </div>
    )
}


