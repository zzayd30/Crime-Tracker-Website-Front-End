import React from 'react'

const CrimeTableHeader = (props) => {
    return (
        <>
            <thead >
                <tr>
                    <th></th>
                    <td>CrimeId</td>
                    <td>ReporterName</td>
                    <td>CrimeType</td>
                    <td>Location</td>
                    <td>Date</td>
                    <td>Time</td>
                    <td>Description</td>
                    <th></th>
                </tr>
            </thead >
        </>
    )
}

export default CrimeTableHeader
