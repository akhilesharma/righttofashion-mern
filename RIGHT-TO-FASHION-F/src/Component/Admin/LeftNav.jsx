import React from 'react'
import { Link } from 'react-router-dom'

export default function LeftNav() {
  return (
      <>
          <div className="list-group">
             <h5 className='background text-light text-center p-2'>Menu</h5>
              <Link to="/admin" className="list-group-item list-group-item-action">Home</Link>
              <Link to="/admin-user" className="list-group-item list-group-item-action">User</Link>
              <Link to="/admin-maincategory" className="list-group-item list-group-item-action">Maincategory</Link>
              <Link to="/admin-subcategory" className="list-group-item list-group-item-action">Subcategory</Link>
              <Link to="/admin-brand" className="list-group-item list-group-item-action">Brand</Link>
              <Link to="/admin-product" className="list-group-item list-group-item-action">Product</Link>
              <Link to="/admin-checkout" className="list-group-item list-group-item-action">Checkout</Link>
              <Link to="/admin-contact" className="list-group-item list-group-item-action">Contact</Link>
              <Link to="/admin-newsletter" className="list-group-item list-group-item-action">Newsletter</Link>
             
          </div>
  </>
    
  )
}
