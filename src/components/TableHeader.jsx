import React from 'react'

const TableHeader = (props) => {
    return (
        <thead >
            <tr>
                <th></th>
                {props.columns.split(',').map(str => <td key={str}>{str}</td>)}
                <th></th>
            </tr>
        </thead >
    )
}

export default TableHeader
