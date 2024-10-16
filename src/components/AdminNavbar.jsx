import React from 'react'
import { Link } from 'react-router-dom'
import { useUserStore } from '../store/store'

const AdminNavbar = () => {
    const { setTable } = useUserStore();
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-center hidden lg:flex mx-auto">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to={"/"}>Home</Link></li>
                    <li><button onClick={() => setTable("SuspectAudit")}>Suspect Audit</button></li>
                    <li><button onClick={() => setTable("VictimAudit")}>Victim Audit</button></li>
                </ul>
            </div>
        </div>
    )
}

export default AdminNavbar
