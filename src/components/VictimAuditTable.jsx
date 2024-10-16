import React, { useEffect, useState } from 'react'
import VictimAuditTableData from './VictimAuditTableData'
import VictimAuditTableHeader from './VictimAuditTableHeader';
const VictimAuditTable = ({ victims }) => {
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        setFlag(victims.length === 0);
    }, [victims])
    return (
        <div className="overflow-x-auto flex flex-col items-center justify-center">
            <table className="table table-zebra">
                {/* head */}
                <VictimAuditTableHeader />
                {!flag && <tbody >
                    {
                        victims.map((victims, i) => <VictimAuditTableData key={i} index={i} VictimId={victims.VictimId} VictimName={victims.VictimName} TypeOfChange={victims.TypeOfChange} UserName={victims.Username} Date={victims.Date} />)
                    }
                </tbody>}
            </table>
            {flag && <h1 className='text-2xl text-center'>No Data Found</h1>}
        </div>
    )
}

export default VictimAuditTable
