import { useEffect, useState } from 'react'
import axios from 'axios'
import React from "react";

export default function Analytics(){
  const [topPages, setTopPages] = useState<any[]>([])
  useEffect(()=>{
    axios.get('/api/analytics/top-pages').then(r=>setTopPages(r.data)).catch(()=>{})
  },[])
  return (
    <div>
      <h2>Analytics</h2>
      <h3>Top Pages</h3>
      <ol>
        {topPages.map((p:any,i:number)=>(<li key={i}>{p._id} — {p.count}</li>))}
      </ol>
    </div>
  )
}
