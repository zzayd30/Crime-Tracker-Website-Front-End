import React, { useEffect, useState } from 'react'
import AdminNavbar from '../components/AdminNavbar'
import SuspectAudit from './SuspectAudit'
import VictimAudit from './VictimAudit'
import { useUserStore } from '../store/store'

const Admin = () => {
  const { table, setTable } = useUserStore();
  useEffect(() => {
    console.log(table)
  }, [table])
  return (
    <div>
      <AdminNavbar setTable={setTable} />
      {
        table === "SuspectAudit" ? <SuspectAudit /> : <VictimAudit />

      }
    </div>
  )
}

export default Admin
