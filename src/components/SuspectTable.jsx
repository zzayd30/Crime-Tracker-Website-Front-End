import React, { useEffect, useState } from 'react'
import SuspectTableData from './SuspectTableData'
import SuspectTableHeader from './SuspectTableHeader';
const SuspectTable = ({ suspects }) => {
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        setFlag(suspects.length === 0);
    }, [suspects])
    return (
        <div className="overflow-x-auto flex flex-col items-center justify-center">
            <table className="table table-zebra">
                {/* head */}
                <SuspectTableHeader />
                {!flag && <tbody >
                    {
                        suspects.map((suspects, i) => <SuspectTableData key={i} index={i} Age={suspects.Age} SuspectId={suspects.SuspectId} Gender={suspects.Gender} Height={suspects.Height} SuspectName={suspects.SuspectName} Weight={suspects.Weight} CrimeId={suspects.CrimeId} />)
                    }
                </tbody>}
            </table>
            {flag && <h1 className='text-2xl text-center'>No Data Found</h1>}
        </div>
    )
}

export default SuspectTable
