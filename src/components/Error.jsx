import React from 'react'

const Error = (props) => {
    return (
        <div className='flex items-center justify-center h-screen w-screen'>
            <h1 className='text-2xl text-center'>{props.msg?props.msg:"Some Error Occured"}</h1>
        </div>
    )
}

export default Error
