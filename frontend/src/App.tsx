import React from "react";
import { Link, Outlet } from 'react-router-dom';

export default function App(){
  return (
    <div className="container">
      <header>
        <h1>WBD User Tracking</h1>
        <nav>
          <Link to='/'>Search</Link> | <Link to='/analytics'>Analytics</Link>
        </nav>
      </header>
      <main style={{ marginTop: 16 }}>
        <div className="card">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
