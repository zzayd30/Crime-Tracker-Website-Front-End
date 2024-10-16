import React from 'react'
import { Link } from 'react-router-dom'
const CrimeTableData = (props) => {
    console.log(props)
    let i = 0;
    return (
        <tr>
            <th><Link to={`/crimes/${props.CrimeId}`}>{props.index}</Link></th>
            <td>{props.CrimeId}</td>
            <td>{props.ReporterName}</td>
            <td>{props.CrimeType}</td>
            <td>{props.Location}</td>
            <td>{props.Date}</td>
            <td>{props.Time}</td>
            <td>{props.Description}</td>
        </tr>

    )
}

export default CrimeTableData
