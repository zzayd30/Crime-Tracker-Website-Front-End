import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import React from 'react'
import { useUserStore } from '../store/store'
import { Link } from 'react-router-dom'

const VictimDetails = (props) => {
    const { token, UserId, setIsAlert, setAlertMsg, setAlertType } = useUserStore();
    const deleteSupsect = async () => {
        console.log("delete")
        await fetch(`/api/victims/${props.VictimId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(data => data.json())
            .then(data => {
                if (data.success) {
                    setIsAlert(true);
                    setAlertType("success")
                    setAlertMsg(data.message)
                }
                else {
                    setIsAlert(true);
                    setAlertType("error")
                    setAlertMsg(data.message)
                }
            })
    }
    const { role } = useUserStore();
    return (
        <div className='p-6 card w-72 bg-base-200 shadow-xl rounded-2xl'>
            <h1>Victim #{props.index + 1}</h1>
            <div className='flex flex-col gap-y-2 gap-x-8 my-4'>
                <div className='flex items-baseline justify-start gap-x-4'>
                    <h1 className='text-md font-semibold'>Victims Name:</h1>
                    <p className='text-md'>{props.VictimName ? props.VictimName : "Not Specified"}</p>
                </div>
                <div className='flex items-baseline justify-start gap-x-4'>
                    <h1 className='text-md font-semibold'>Age:</h1>
                    <p className='text-md'>{props.Age ? props.Age : "Not Specified"}</p>
                </div>
                <div className='flex items-baseline justify-start gap-x-4'>
                    <h1 className='text-md font-semibold'>Gender:</h1>
                    <p className='text-md'>{props.Gender ? props.Gender : "Not Specified"}</p>
                </div>
                <div className='flex items-baseline justify-start gap-x-4'>
                    <h1 className='text-md font-semibold'>Weight:</h1>
                    <p className='text-md'>{props.Weight ? props.Weight : "Not Specified"}</p>
                </div>
                <div className='flex items-baseline justify-start gap-x-4 col-span-2'>
                    <h1 className='text-md   font-semibold'>Height:</h1>
                    <p className='text-md'>{props.Height ? props.Height : "Not Specified"}</p>
                </div>
            </div>
            {role === "admin" && <div className='flex gap-x-4'><Link to={`/victims/edit-victim/${props.CrimeId}/${props.VictimId}`} className='btn btn-info btn-square'><FontAwesomeIcon icon={faEdit} /></Link>
                <button onClick={() => document.getElementById('my_modal_2').showModal()} className='btn btn-error'><FontAwesomeIcon icon={faTrashAlt} /></button></div>}
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Warning!</h3>
                    <p className="py-4">Are you sure you want to Delete?</p>
                    <div className="modal-action">
                        <form method="dialog flex">
                            <button onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('my_modal_2').close()
                            }} className="btn mx-4 btn-warning">Cancel</button>
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-error" onClick={deleteSupsect}>Delete</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default VictimDetails
