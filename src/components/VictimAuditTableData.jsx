import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
const VictimTableData = (props) => {
    console.log("This is test", props)
    return (
        <tr>
            <th>{props.index}</th>
            <td>{props.VictimId ? props.VictimId : "NULL"}</td>
            <td>{props.UserName ? props.UserName : "NULL"}</td>
            <td>{props.VictimName ? props.VictimName : "NULL"}</td>
            <td>{props.TypeOfChange ? props.TypeOfChange : "NULL"}</td>
            <td>{props.Date ? moment(props.Date).format('DD-MM-YYYY') : "NULL"}</td>
        </tr>

    )
}

export default VictimTableData
