import React, { useContext, useState, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { CartContext } from '../Store/CartContextProvider'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    var [cart, setcart] = useState([])
    var [total, settotal] = useState([])
    var [shipping, setshipping] = useState([])
    var [final, setfinal] = useState([])
    var { getAllCart, deleteCart, updateCart, getCart } = useContext(CartContext)
    var navigate = useNavigate()
    async function deleteRecord(_id) {
        if (window.confirm("Are You Sure to delete thid item.")) {
            var item = {
                _id: _id
            }
            var response = await deleteCart(item)
            if (response.result === "Done")
                getAPIData()
            else
                alert(response.message)
        }
    }
    async function update(_id, op) {
        var response = await getCart({ _id: _id })
        var cart = response.data
        if (op === "DEC" && cart.qty == 1)
            return
        else if (op === "DEC") {
            cart.qty = cart.qty - 1
            cart.total = cart.total - cart.price
        }
        else {
            cart.qty = cart.qty + 1
            cart.total = cart.total + cart.price
        }
        response = await updateCart(cart)
        if (response.result === "Done")
            getAPIData()
        else
            alert(response.alert)
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

        

    }
    useEffect(() => {
        getAPIData()
    }, [])
    return (
        <>
            {cart.length !== 0 ? <div className="container-fluid">
                <div className='table-responsive'>
                    <table className='table table-striped table-hover'>
                        <tbody>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Color</th>
                                <th>Size</th>
                                <th>Price</th>
                                <th></th>
                                <th>Qty</th>
                                <th></th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                            {
                                cart.map((item, index) => {
                                    return <tr key={index}>
                                        <td><img src={item.pic ? `/public/images/${item.pic}` : ""} alt='' className="rounded" style={{ width: "100px", height: "75px" }}></img></td>
                                        <td>{item.name}</td>
                                        <td>{item.color}</td>
                                        <td>{item.size}</td>
                                        <td>&#8377;{item.price}</td>
                                        <td><button className='btn text-primary' style={{ border: "None" }} onClick={() => update(item._id, "DEC")}><RemoveIcon /></button></td>
                                        <td>{item.qty}</td>
                                        <td><button className='btn text-primary' style={{ border: "None" }} onClick={() => update(item._id, "INC")}><AddIcon /></button></td>
                                        <td>&#8377;{item.total}</td>
                                        <td><button className='btn text-primary' style={{ border: "None" }} onClick={() => deleteRecord(item._id)}><DeleteIcon /></button></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item md={6} xs={12}>
                        </Grid>
                        <Grid item md={6} xs={12}>
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
                                    {
                                        cart.length > 0 ?
                                            <tr>
                                                <th colSpan={2}><Link to="/checkout" className='btn background text-light w-100 btn-sm'>Checkout</Link></th>
                                            </tr>
                                            : ""
                                    }
                                </tbody>
                            </table>
                        </Grid>
                    </Grid>
                </Box>
            </div> : <div className='container' style={{ minHeight: "60vh" }}>
                <h4>No Item In Cart</h4><Link className='btn btn-primary btn-sm  w-100 mt-2 text-light text-center ' to="/Shop/All/All/All/None">Visit To Shop</Link></div>}
        </>
    )
}
