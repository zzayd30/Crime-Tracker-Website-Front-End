import React from 'react'
import moment from 'moment'

const CrimeDetails = (props) => {
    return (
        <div className='grid grid-cols-2 gap-y-4 gap-x-12 my-4'>
            <div className='flex items-baseline justify-start gap-x-4'>
                <h1 className='text-xl font-semibold'>Reporter Name:</h1>
                <p className='text-xl'>{props.ReporterName ? props.ReporterName : "Not Specified"}</p>
            </div>
            <div className='flex items-baseline justify-start gap-x-4'>
                <h1 className='text-xl font-semibold'>Location:</h1>
                <p className='text-xl'>{props.Location ? props.Location : "Not Specified"}</p>
            </div>
            <div className='flex items-baseline justify-start gap-x-4'>
                <h1 className='text-xl font-semibold'>Crime Type:</h1>
                <p className='text-xl'>{props.CrimeType ? props.CrimeType : "Not Specified"}</p>
            </div>
            <div className='flex items-baseline justify-start gap-x-4'>
                <h1 className='text-xl font-semibold'>Status:</h1>
                <p className='text-xl'>{props.Status ? props.CrimeType : "Not Specified"}</p>
            </div>
            <div className='flex items-baseline justify-start gap-x-4'>
                <h1 className='text-xl font-semibold'>Date:</h1>
                <p className='text-xl'>{props.Date ? moment(props.Date).format("DD-MM-YYYY") : "Not Specified"}</p>
            </div>
            <div className='flex items-baseline justify-start gap-x-4'>
                <h1 className='text-xl font-semibold'>Time:</h1>
                <p className='text-xl'>{props.Time ? moment(props.Time).format("H:MM A") : "Not Specified"}</p>
            </div>
            <div className='flex items-baseline justify-start gap-x-4 col-span-2'>
                <h1 className='text-xl   font-semibold'>Handled By:</h1>
                <p className='text-xl'>{props.HandledBy ? props.HandledBy : "Not Specified"}</p>
            </div>
            <div className='flex flex-col items-start justify-start gap-x-4 my-2 col-span-2'>
                <h1 className='text-xl font-semibold'>Description:</h1>
                <p className='text-xl ml-12 mt-2'>{props.Description ? props.Description : "Not Specified"}</p>
            </div>
        </div>
    )
}

export default CrimeDetails
