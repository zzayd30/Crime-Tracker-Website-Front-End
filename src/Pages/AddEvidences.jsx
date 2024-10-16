import React, { useEffect, useState } from 'react'
import { useUserStore } from '../store/store'
import { useNavigate, useParams } from 'react-router-dom';

const AddEvidences = () => {
  const { CrimeId } = useParams();
  const navigate = useNavigate();
  const { token, UserId, setIsAlert, setAlertMsg, setAlertType } = useUserStore();

  const [EvidenceType, setCrimeType] = useState("")
  const [Description, setDescription] = useState("")
  const [CollectedBy, setCollectedBy] = useState("");
  const AddEvidence = async () => {
    const data = {
      CrimeId: CrimeId,
      EvidenceType: EvidenceType,
      Description: Description,
      CollectedBy: CollectedBy
    }
    console.log("THis is data", data)
    await fetch('/api/evidences/add-evidences', {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(data => data.json())
      .then(data => {
        if (data.success) {
          setIsAlert(true)
          setAlertType("success")
          setAlertMsg(data.msg)
          navigate('/crimes/' + data.CrimeId);
        }
        else {
          setIsAlert(true)
          setAlertType("error")
          setAlertMsg(data.message)
        }
      })
      .catch(err => console.log(err))
  }
  return (
    <div className="flex flex-col gap-y-8 h-[100vh] justify-center items-center">
      <h1 className="text-2xl font-semibold text-center md:text-4xl">Add a Evidence</h1>
      <input
        type="text"
        className="input input-bordered input-info w-full max-w-[20rem]"
        id="text"
        placeholder="Enter Evidence Types"
        value={EvidenceType}
        onChange={(e) => setCrimeType(e.target.value)}
      />
      <input
        type="text"
        className="input input-bordered input-info w-full max-w-[20rem]"
        id="text"
        placeholder="Enter Description"
        value={Description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        className="input input-bordered input-info w-full max-w-[20rem]"
        id="text"
        placeholder="Enter Officer Name"
        value={CollectedBy}
        onChange={(e) => setCollectedBy(e.target.value)}
      />
      <button onClick={AddEvidence} className="btn btn-active btn-success text-xl text-white">
        Add Evidence
      </button>
    </div>
  )
}

export default AddEvidences
