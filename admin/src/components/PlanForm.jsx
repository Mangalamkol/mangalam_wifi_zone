import React, {useState} from 'react'
import client from '../api/client'

export default function PlanForm({plan,onSave,onCancel}){
  const [name,setName] = useState(plan.name || '')
  const [price,setPrice] = useState(plan.price || '')
  const [duration,setDuration] = useState(plan.duration || '')
  const [err,setErr] = useState(null)

  async function submit(e){
    e.preventDefault()
    try{
      const method = plan._id ? 'patch' : 'post'
      const url = plan._id ? `/admin/plans/${plan._id}` : '/admin/plans'
      const {data} = await client[method](url, {name,price,duration})
      onSave(data)
    }catch(e){ setErr(e.response?.data?.message || e.message) }
  }

  return(
    <form onSubmit={submit} className="p-4 bg-gray-100 rounded mb-4">
      <h3 className="text-lg mb-2">{plan._id ? 'Edit' : 'New'} Plan</h3>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full p-2 border mb-2" />
      <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price" type="number" className="w-full p-2 border mb-2" />
      <input value={duration} onChange={e=>setDuration(e.target.value)} placeholder="Duration (days)" type="number" className="w-full p-2 border mb-2" />
      <button type="submit" className="bg-green-600 text-white p-2 rounded mr-2">Save</button>
      <button type="button" onClick={onCancel} className="text-gray-600">Cancel</button>
    </form>
  )
}