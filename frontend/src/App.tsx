import { Link } from 'react-router-dom'
import React from "react";

export default function App(){
  return (
    <div style={{ padding: 20 }}>
      <h1>WBD User Tracking</h1>
      <nav>
        <Link to='/'>Search</Link> | <Link to='/analytics'>Analytics</Link>
      </nav>
      <hr/>
      <div id="content">Open routes: /, /user/:userId, /analytics</div>
    </div>
  )
}
