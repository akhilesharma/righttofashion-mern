import React, { useState, useContext, useEffect } from 'react'
import LeftNav from './LeftNav'

import { useNavigate } from 'react-router-dom';
import { BrandContext } from '../../Store/BrandContextProvider';
import { MaincategoryContext } from '../../Store/MaincategoryContextProvider';
import { SubcategoryContext } from '../../Store/SubcategoryContextProvider';
import { ProductContext } from '../../Store/ProductContextProvider';
export default function AdminAddProduct() {
    var [product, setproduct] = useState({
        name: "",
        maincategory: "",
        subcategory: "",
        brand: "",
        color: "",
        size: "",
        baseprice: "",
        discount: "",
        finalprice: "",
        stock: "In Stock",
        description: "This is Sample Product",
        pic1: "",
        pic2: "",
        pic3: "",
        pic4: ""
    })
    var [maincategory, setmaincategory] = useState([])
    var [subcategory, setsubcategory] = useState([])
    var [brand, setbrand] = useState([])
    var { getAllMaincategory } = useContext(MaincategoryContext)
    var { getAllSubcategory } = useContext(SubcategoryContext)
    var { getAllBrand } = useContext(BrandContext)
    var { addProduct } = useContext(ProductContext)
    var navigate = useNavigate()
    function getData(e) {
        var name = e.target.name
        var value = e.target.value
        setproduct((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    function getFile(e) {
        var name = e.target.name
        var value = e.target.files[0]
        setproduct((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        product.finalprice = parseInt(product.baseprice - product.baseprice * product.discount / 100)
        var formData = new FormData()
        formData.append('name', product.name)
        formData.append('maincategory', product.maincategory)
        formData.append('subcategory', product.subcategory)
        formData.append('brand', product.brand)
        formData.append('color', product.color)
        formData.append('size', product.size)
        formData.append('baseprice', product.baseprice)
        formData.append('discount', product.discount)
        formData.append('finalprice', product.finalprice)
        formData.append('stock', product.stock)
        formData.append('description', product.description)
        formData.append('pic1', product.pic1)
        formData.append('pic2', product.pic2)
        formData.append('pic3', product.pic3)
        formData.append('pic4', product.pic4)
        var response = await addProduct(formData)
        if (response.result === "Done")
            navigate("/admin-product")
        else
            alert(response.message)
    }
    async function getAPIData() {
        var response1 = await getAllMaincategory()
        setmaincategory(response1.data)
        var response2 = await getAllSubcategory()
        setsubcategory(response2.data)
        var response3 = await getAllBrand()
        setbrand(response3.data)
        setproduct((old) => {
            return {
                ...old,
                ['maincategory']: response1.data[0].name,
                ['subcategory']: response2.data[0].name,
                ['brand']: response3.data[0].name
            }
        })
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
                    <h5 className='background text-light text-center p-2'>Add Product Page</h5>
                    <form onSubmit={postData}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" onChange={getData} name="name" placeholder='Enter Product Name' />
                        </div>
                        <div className='row mb-3'>
                            <div className="col-md-3 col-sm-6 col-12">
                                <label className="form-label">Maincategory</label>
                                <select name='maincategory' onChange={getData} className="form-select">
                                    {
                                        maincategory.map((item, index) => {
                                            return <option key={index} value={item.name}>{item.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-3 col-sm-6 col-12">
                                <label className="form-label">Subcategory</label>
                                <select name='subcategory' onChange={getData} className="form-select">
                                    {
                                        subcategory.map((item, index) => {
                                            return <option key={index} value={item.name}>{item.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-3 col-sm-6 col-12">
                                <label className="form-label">Brand</label>
                                <select name='brand' onChange={getData} className="form-select">
                                    {
                                        brand.map((item, index) => {
                                            return <option key={index} value={item.name}>{item.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-3 col-sm-6 col-12">
                                <label className="form-label">Stock</label>
                                <select name='stock' onChange={getData} className="form-select">
                                    <option value="In Stock">In Stock</option>
                                    <option value="Out Of Stock">Out Of Stock</option>
                                </select>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className="col-sm-6 col-12">
                                <label className="form-label">Color</label>
                                <input type="text" className="form-control" onChange={getData} name="color" placeholder='Enter Product Color' />
                            </div>
                            <div className="col-sm-6 col-12">
                                <label className="form-label">Size</label>
                                <input type="text" className="form-control" onChange={getData} name="size" placeholder='Enter Product Size' />
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className="col-sm-6 col-12">
                                <label className="form-label">Base Price</label>
                                <input type="number" className="form-control" onChange={getData} name="baseprice" placeholder='Enter Product Base Price' />
                            </div>
                            <div className="col-sm-6 col-12">
                                <label className="form-label">Discount</label>
                                <input type="number" min={0} className="form-control" onChange={getData} name="discount" placeholder='Enter Discount On Product Base Price' />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea type="text" value={product.description} className="form-control" onChange={getData} name="discount" rows={5} placeholder='Enter Description' />
                        </div>
                        <div className='row mb-3'>
                            <div className="col-md-3 col-sm-6 col-12">
                                <label className="form-label">Pic1</label>
                                <input type="file" className="form-control" onChange={getFile} name="pic1" />
                            </div>
                            <div className="col-md-3 col-sm-6 col-12">
                                <label className="form-label">Pic2</label>
                                <input type="file" className="form-control" onChange={getFile} name="pic2" />
                            </div>
                            <div className="col-md-3 col-sm-6 col-12">
                                <label className="form-label">Pic3</label>
                                <input type="file" className="form-control" onChange={getFile} name="pic3" />
                            </div>
                            <div className="col-md-3 col-sm-6 col-12">
                                <label className="form-label">Pic4</label>
                                <input type="file" className="form-control" onChange={getFile} name="pic4" />
                            </div>
                        </div>
                        <button type="submit" className="btn background text-light w-100">Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
