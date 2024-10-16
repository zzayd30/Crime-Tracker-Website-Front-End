import React, { useEffect, useState } from 'react'
import CrimeTableData from './CrimeTableData'
import moment from 'moment'
import CrimeTableHeader from './CrimeTableHeader'
const CrimeTables = ({ crimes }) => {
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        setFlag(crimes.length === 0);
    }, [crimes])
    return (
        <div className="overflow-x-auto flex flex-col items-center justify-center" >
            <table className="table table-zebra">
                <CrimeTableHeader columns={"CrimeId,ReporterName,CrimeType,Location,Date,Time,Description"} />
                {!flag && <tbody >
                    {
                        crimes.map((crimes, index) => <CrimeTableData index={index} key={crimes.CrimeId} columns={"CrimeId,ReporterName,CrimeType,Location,Date,Time,Description"} CrimeId={crimes.CrimeId} ReporterName={crimes.ReporterName} CrimeType={crimes.CrimeType} Location={crimes.Location} Date={moment(crimes.Date).format("DD-MM-YYYY")} Time={moment(crimes.Time).format("H:MM A")} Description={crimes.Description} Route={"crimes"} routeTo={crimes.CrimeId} />)
                    }
                </tbody>}
            </table>
            {flag && <h1 className='text-2xl text-center'>No Data Found</h1>}
        </div >

    )
}


export default CrimeTables
