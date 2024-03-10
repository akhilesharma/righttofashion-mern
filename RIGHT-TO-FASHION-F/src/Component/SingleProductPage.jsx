import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Paper } from '@mui/material'
import { CartContext } from '../Store/CartContextProvider';
import { WishlistContext } from '../Store/WishlistContextProvider';
import { ProductContext } from '../Store/ProductContextProvider';
import Carousel from 'react-material-ui-carousel'


export default function SingleProductPage() {
    var [product, setproduct] = useState({})
    var { getProduct } = useContext(ProductContext)
    var { addCart, getAllCart } = useContext(CartContext)
    var { addWishlist, getAllWishlist } = useContext(WishlistContext)
    var { _id } = useParams()
    var navigate = useNavigate()

    var items = [
        {
            pic: product.pic1
        },
        {
            pic: product.pic2
        },
        {
            pic: product.pic3
        },
        {
            pic: product.pic4
        },


    ]
    function Item(props) {
        return (
            <Paper>
                <img src={props.item.pic ? `/public/images/${props.item.pic}` : ""} width="100%" height="500px" alt='' />
            </Paper>
        )
    }
    async function addToCart() {
        if (!localStorage.getItem("login"))
        navigate("/login")
        else {
            var response = await getAllCart()
           if (response.data && response.data.find((item) => item.userid === localStorage.getItem("userid") && item.productid === _id) === undefined) {
                let item = {
                    userid: localStorage.getItem("userid"),
                    productid: product._id,
                    name: product.name,
                    color: product.color,
                    size: product.size,
                    maincategory: product.maincategory,
                    subcategory: product.subcategory,
                    brand: product.brand,
                    price: product.finalprice,
                    qty: 1,
                    total: product.finalprice,
                    pic: product.pic1
                }

                response = await addCart(item)
                if (response.result === "Done")
                    navigate("/cart")
                else
                    alert("response.message")
            }
        else
            navigate("/cart")
        }
    }
    async function addToWishlist() {
        var response = await getAllWishlist()
        if (response.result === "Fail")
            navigate("/login")
        if (response.data && response.data.find((item) => item.userid === localStorage.getItem("userid") && item.productid === _id) === undefined) {
            let item = {
                userid: localStorage.getItem("userid"),
                productid: product._id,
                name: product.name,
                color: product.color,
                size: product.size,
                maincategory: product.maincategory,
                subcategory: product.subcategory,
                brand: product.brand,
                price: product.finalprice,
                pic: product.pic1
            }

            response = await addWishlist(item)
            if (response.result === "Done")
                navigate("/profile")
            else
                alert("response.message")
        }
        else
            navigate("/profile")
    }
    async function getAPIData() {
        var item = {
            _id: _id
        }
        var response = await getProduct(item)
        if (response.result === "Done")
            setproduct(response.data)
        else
            alert(response.message)
    }
    useEffect(() => {
        getAPIData()
    }, [])
    return (
        <div className='container-fluid'>  <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>

                <Grid item md={6} xs={12}>
                    <Carousel>
                        {
                            items.map((item, i) => <Item key={i} item={item} />)
                        }
                    </Carousel>
                </Grid>
                <Grid item md={6} xs={12}>
                    <h5>Product Detail</h5>
                    <div className='table-responsive'>
                        <table className='table table-striped table-hover'>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>{product.name}</td>
                                </tr>
                                <tr>
                                    <th>Maincategory</th>
                                    <td>{product.maincategory}</td>
                                </tr>
                                <tr>
                                    <th>Subcategory</th>
                                    <td>{product.subcategory}</td>
                                </tr>
                                <tr>
                                    <th>Brand</th>
                                    <td>{product.brand}</td>
                                </tr>
                                <tr>
                                    <th>Baseprice</th>
                                    <td>&#8377;{product.baseprice}</td>
                                </tr>
                                <tr>
                                    <th>Discount</th>
                                    <td>{product.discount}%</td>
                                </tr>
                                <tr>
                                    <th>Finalprice</th>
                                    <td>&#8377;{product.finalprice}</td>
                                </tr>
                                <tr>
                                    <th>Color</th>
                                    <td>{product.color}</td>
                                </tr>
                                <tr>
                                    <th>Size</th>
                                    <td>{product.size}</td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td>{product.description}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <button className='btn background text-light text-center btn-sm' style={{ width: "49%" }} onClick={addToCart} >Add to cart</button>
                        <button className='btn background text-light text-center btn-sm' style={{ width: "49%" }} onClick={addToWishlist} >Add to wishlist</button>
                    </div>
                </Grid>
            </Grid>
        </Box></div>
    );
}