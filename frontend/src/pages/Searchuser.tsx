import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import React from "react";

export default function SearchUser(){
  const [userId, setUserId] = useState('')
  const nav = useNavigate()
  return (
    <div>
      <h2>Search User</h2>
      <input value={userId} onChange={e=>setUserId(e.target.value)} placeholder='userId'/>
      <button onClick={()=>nav(`/user/${userId}`)}>View Journey</button>
    </div>
  )
}
