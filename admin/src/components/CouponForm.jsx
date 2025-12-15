import React, {useState} from 'react'
import client from '../api/client'

export default function CouponForm({coupon,onSave,onCancel}){
  const [code,setCode] = useState(coupon.code || '')
  const [discount,setDiscount] = useState(coupon.discount || '')
  const [expiry,setExpiry] = useState(coupon.expiry ? coupon.expiry.slice(0,10) : '')
  const [err,setErr] = useState(null)

  async function submit(e){
    e.preventDefault()
    try{
      const method = coupon._id ? 'patch' : 'post'
      const url = coupon._id ? `/admin/coupons/${coupon._id}` : '/admin/coupons'
      const {data} = await client[method](url, {code,discount,expiry})
      onSave(data)
    }catch(e){ setErr(e.response?.data?.message || e.message) }
  }

  return(
    <form onSubmit={submit} className="p-4 bg-gray-100 rounded mb-4">
      <h3 className="text-lg mb-2">{coupon._id ? 'Edit' : 'New'} Coupon</h3>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <input value={code} onChange={e=>setCode(e.target.value)} placeholder="Code" className="w-full p-2 border mb-2" />
      <input value={discount} onChange={e=>setDiscount(e.target.value)} placeholder="Discount (%)" type="number" className="w-full p-2 border mb-2" />
      <input value={expiry} onChange={e=>setExpiry(e.target.value)} placeholder="Expiry (YYYY-MM-DD)" type="date" className="w-full p-2 border mb-2" />
      <button type="submit" className="bg-green-600 text-white p-2 rounded mr-2">Save</button>
      <button type="button" onClick={onCancel} className="text-gray-600">Cancel</button>
    </form>
  )
}