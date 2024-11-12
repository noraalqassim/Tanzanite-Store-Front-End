
import React from 'react'

import Dashboard from "../components/dashboard/Dashboard";
export default function DashboardPage(prop) {
    const {userData}=prop;
  return (
    <div>
        <Dashboard userData={userData}/>
    </div>
  )
}
