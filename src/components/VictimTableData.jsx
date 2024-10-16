import React from 'react'
import { Link } from 'react-router-dom'
const VictimTableData = (props) => {
    console.log("This is props", props)
    return (
        <tr>
            <th><Link to={`/crimes/${props.CrimeId}`}>{props.index}</Link></th>
            <td>{props.VictimId?props.VictimId:"NULL"}</td>
            <td>{props.VictimName?props.VictimName:"NULL"}</td>
            <td>{props.Age?props.Age:"NULL"}</td>
            <td>{props.Gender?props.Gender:"NULL"}</td>
            <td>{props.Height?props.Height:"NULL"}</td>
            <td>{props.Weight?props.Weight:"NULL"}</td>
        </tr>

    )
}

export default VictimTableData
