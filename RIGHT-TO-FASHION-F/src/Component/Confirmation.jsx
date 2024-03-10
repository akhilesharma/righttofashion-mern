import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Confirmation() {
  let Navigate = useNavigate()
  let od = localStorage.getItem("orderid")
  useEffect(() => {
    if (!od)
      Navigate('/shop/All/All/All/None')
  }, [])
  return (
    <div className='background text-light text-center py-4 my-4'>
      <p>Your Order id {od} has been placed successfully!!!!!!</p>
      <p>Thanks for shopping with us!!!!!!</p>
      <p>You can track your order in profile page section.</p>
      <p>Happy Shopping!!!!!!</p>
    </div>
  )
}
