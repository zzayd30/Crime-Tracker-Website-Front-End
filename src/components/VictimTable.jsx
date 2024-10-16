import React, { useEffect, useState } from 'react'
import VictimTableData from './VictimTableData'
import VictimTableHeader from './VictimTableHeader';
const VictimTable = ({ victims }) => {
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        setFlag(victims.length === 0);
    }, [victims])
    return (
        <div className="overflow-x-auto flex flex-col items-center justify-center">
            <table className="table table-zebra">
                {/* head */}
                <VictimTableHeader />
                {!flag && <tbody >
                    {
                        victims.map((victims, i) => <VictimTableData key={i} index={i} Age={victims.Age} VictimId={victims.VictimId} Gender={victims.Gender} Height={victims.Height} VictimName={victims.VictimName} Weight={victims.Weight} CrimeId={victims.CrimeId} />)
                    }
                </tbody>}
            </table>
            {flag && <h1 className='text-2xl text-center'>No Data Found</h1>}
        </div>
    )
}

export default VictimTable
