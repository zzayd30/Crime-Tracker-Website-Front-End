import React, { useEffect, useState } from 'react'
import SuspectAuditTableData from './SuspectAuditTableData'
import SuspectAuditTableHeader from './SuspectAuditTableHeader';
const SuspectAuditTable = ({ suspects }) => {
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        setFlag(suspects.length === 0);
    }, [suspects])
    return (
        <div className="overflow-x-auto flex flex-col items-center justify-center">
            <table className="table table-zebra">
                {/* head */}
                <SuspectAuditTableHeader />
                {!flag && <tbody >
                    {
                        suspects.map((suspects, i) => <SuspectAuditTableData key={i} index={i} SuspectId={suspects.SuspectId} SuspectName={suspects.SuspectName} TypeOfChange={suspects.TypeOfChange} UserName={suspects.Username} Date={suspects.Date} />)
                    }
                </tbody>}
            </table>
            {flag && <h1 className='text-2xl text-center'>No Data Found</h1>}
        </div>
    )
}

export default SuspectAuditTable
