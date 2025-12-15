import React, {useEffect, useState} from 'react'
import client from '../api/client'

export default function Logs(){
  const [logs,setLogs] = useState([])
  useEffect(()=>{ client.get('/admin/logs').then(r=>setLogs(r.data)).catch(()=>{}) },[])
  return (
    <div>
      <h1 className="text-2xl mb-4">Logs</h1>
      <div className="space-y-2 font-mono text-sm">
        {logs.map((l,i)=> <div key={i}>{l}</div>)}
      </div>
    </div>
  )
}