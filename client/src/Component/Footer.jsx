import React, { useState, useContext } from 'react'

import { NewslatterContext } from '../Store/NewslatterContextProvider'
export default function Footer() {
    var [newslatter, setnewslatter] = useState("")
    var { addNewslatter } = useContext(NewslatterContext)
    function getData(e) {
        setnewslatter(e.target.value)
    }
    async function postData(e) {
        e.preventDefault()
        var response = await addNewslatter({ email: newslatter })
        alert(response.message)
    }
    return (
        <div className='background text-center text-light p-3 mt-2'>
            <p>copyright@fashiomart.com</p>
            <div className='row'>
                <div className='col-md-3 col-1'></div>
                <div className='col-md-6 col-10'>
                    <form onSubmit={postData}>
                        <div className="mb-3">
                            <input type="email" required className="form-control" name="example" onChange={getData} placeholder='Enter Your Email id to Subscribe our Newslatter Service' />
                        </div>
                        <button type="submit" className="btn btn-light w-100">Subscribe</button>
                    </form>
                </div>
            </div>
            <div className='col-md-3 col-1'></div>
        </div>
    )
}
