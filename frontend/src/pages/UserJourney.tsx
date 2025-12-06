import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import React from "react";

export default function UserJourney(){
  const { userId } = useParams();
  const [events, setEvents] = useState<any[]>([])
  useEffect(()=>{
    if(!userId) return
    axios.get(`/api/users/${userId}/journey`).then(r=>setEvents(r.data.events)).catch(()=>{})
  },[userId])

  return (
    <div>
      <h2>User Journey: {userId}</h2>
      <ul>
        {events.map((e,i)=>(<li key={i}>{e.eventType} - {new Date(e.timestamp).toLocaleString()}</li>))}
      </ul>
    </div>
  )
}
