// import React, { useState, useEffect,useContext} from 'react'
// import LeftNav from './LeftNav'
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';

// import { ProductContext } from '../../Store/ProductContextProvider';
// import { Link } from 'react-router-dom';
// export default function AdminProduct() {
//     var [product, setproduct] = useState([])
//     var {getAllProduct,deleteProduct} = useContext(ProductContext)
//     async function deleteRecord(_id) {
//         if(window.confirm("Are Your Sure to Delete that Item : ")){
//             var item = {
//                 _id:_id
//             }
//             var response = await deleteProduct(item)
//             if (response.result === "Done")
//                 getAPIData()
//             else
//                 alert(response.message)
//         }
//     }
//     async function getAPIData() {
//         var response = await getAllProduct()
//         if (response.result === "Done")
//             setproduct(response.data)
//         else
//             alert(response.message)
//     }
//     useEffect(() => {
//         getAPIData()
//     })
//     return (
//         <div className='container-fluid'>
//             <div className='row'>
//                 <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12'>
//                     <LeftNav />
//                 </div>
//                 <div className='col-xl-10 col-lg-9 col-md-8 col-sm-6 col-12'>
//                     <h5 className='background text-light text-center p-2'>Product Page <Link to="/admin-add-product" className='text-light'><AddIcon /></Link></h5>
//                     <div className='table-responsive'>
//                         <table className='table'>
//                             <tbody>
//                                 <tr>
//                                     <th>Id</th>
//                                     <th>Name</th>
//                                     <th>Maincategory</th>
//                                     <th>Subcategory</th>
//                                     <th>Brand</th>
//                                     <th>Color</th>
//                                     <th>Size</th>
//                                     <th>Base Price</th>
//                                     <th>Discount</th>
//                                     <th>Final Price</th>
//                                     <th>Stock</th>
//                                     <th></th>
//                                     <th></th>
//                                     <th></th>
//                                     <th></th>
//                                     <th></th>
//                                     <th></th>
//                                 </tr>
//                                 {
//                                     product.map((item, index) => {
//                                         return <tr key={index}>
//                                             <td>{item._id}</td>
//                                             <td>{item.name}</td>
//                                             <td>{item.maincategory}</td>
//                                             <td>{item.subcategory}</td>
//                                             <td>{item.brand}</td>
//                                             <td>{item.color}</td>
//                                             <td>{item.size}</td>
//                                             <td>&#8377;{item.baseprice}</td>
//                                             <td>{item.discount}%</td>
//                                             <td>&#8377;{item.finalprice}</td>
//                                             <td>{item.stock}</td>
//                                             <td><img src={`./public/images/${item.pic1}`} width="50px" height="50px" alt='' className="rounded"/></td>
//                                             <td><img src={`./public/images/${item.pic2}`} width="50px" height="50px" alt='' className="rounded"/></td>
//                                             <td><img src={`./public/images/${item.pic3}`} width="50px" height="50px" alt='' className="rounded"/></td>
//                                             <td><img src={`./public/images/${item.pic4}`} width="50px" height="50px" alt='' className="rounded"/></td>
//                                             <td><Link className='btn text-primary' style={{ border: "none" }} to={`/admin-update-product/${item._id}`}><EditIcon /></Link></td>
//                                             <td><button className='btn text-primary' style={{ border: "none" }} onClick={() => deleteRecord("1")}><DeleteForeverIcon /></button></td>
//                                         </tr>
//                                     })
//                                 }
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }


import React, { useState, useEffect,useContext} from 'react'
import LeftNav from './LeftNav'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import { ProductContext } from '../../Store/ProductContextProvider';
import { Link } from 'react-router-dom';
export default function AdminProduct() {
    var [product, setproduct] = useState([])
    var {getAllProduct,deleteProduct} = useContext(ProductContext)
    async function deleteRecord(_id) {
        if(window.confirm("Are Your Sure to Delete that Item : ")){
            var item = {
                _id:_id
            }
            var response = await deleteProduct(item) 
            if (response.result === "Done")
                getAPIData()
            else
                alert(response.message)
        }
    }
    async function getAPIData() {
        var response = await getAllProduct()
        if (response.result === "Done")
            setproduct(response.data)
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
                    <h5 className='background text-light text-center p-2'>Product Page <Link to="/admin-add-product" className='text-light'><AddIcon /></Link></h5>
                    <div className='table-responsive'>
                        <table className='table'>
                            <tbody>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Maincategory</th>
                                    <th>Subcategory</th>
                                    <th>Brand</th>
                                    <th>Color</th>
                                    <th>Size</th>
                                    <th>Base Price</th>
                                    <th>Discount</th>
                                    <th>Final Price</th>
                                    <th>Stock</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                {
                                    product.map((item, index) => {
                                        return <tr key={index}>
                                            <td>{item._id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.maincategory}</td>
                                            <td>{item.subcategory}</td>
                                            <td>{item.brand}</td>
                                            <td>{item.color}</td>
                                            <td>{item.size}</td>
                                            <td>&#8377;{item.baseprice}</td>
                                            <td>{item.discount}%</td>
                                            <td>&#8377;{item.finalprice}</td>
                                            <td>{item.stock}</td>
                                            <td><img src={`/public/images/${item.pic1}`} width="50px" height="50px" className="rounded"/></td>
                                            <td><img src={`/public/images/${item.pic2}`} width="50px" height="50px" className="rounded"/></td>
                                            <td><img src={`/public/images/${item.pic3}`} width="50px" height="50px" className="rounded"/></td>
                                            <td><img src={`/public/images/${item.pic4}`} width="50px" height="50px" className="rounded"/></td>
                                            <td><Link className='btn text-primary' style={{ border: "none" }} to={`/admin-update-product/${item._id}`}><EditIcon /></Link></td>
                                            <td><button className='btn text-primary' style={{ border: "none" }} onClick={() => deleteRecord(item._id)}><DeleteForeverIcon /></button></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
