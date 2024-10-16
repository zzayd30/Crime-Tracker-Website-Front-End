import React from 'react'

const EvidenceDetails = (props) => {
    return (
        <div className='p-6 card w-[20rem] bg-base-200 shadow-xl rounded-2xl'>
            <h1>Evidence #{props.index + 1}</h1>
            <div className='flex flex-col gap-y-2 gap-x-8 my-4'>
                <div className='flex items-baseline justify-start gap-x-4'>
                    <h1 className='text-md font-semibold'>Evidence Type:</h1>
                    <p className='text-md'>{props.EvidenceType ? props.EvidenceType : "Not Specified"}</p>
                </div>
                <div className='flex items-baseline justify-start gap-x-4'>
                    <h1 className='text-md font-semibold'>Collected By:</h1>
                    <p className='text-md'>{props.CollectedBy ? props.CollectedBy : "Not Specified"}</p>
                </div>
                <div className='flex items-baseline justify-start gap-x-4'>
                    <h1 className='text-md font-semibold'>Description:</h1>
                    <p className='text-md'>{props.Description ? props.Description : "Not Specified"}</p>
                </div>
            </div>
        </div>
    )
}

export default EvidenceDetails
