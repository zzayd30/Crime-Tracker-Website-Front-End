import React, { useEffect, useState } from 'react'
import { useUserStore } from '../store/store'
import { useNavigate, useParams } from 'react-router-dom';

const AddVictims = () => {
    const { CrimeId } = useParams();
    const navigate = useNavigate();
    const { token, UserId, setIsAlert, setAlertMsg, setAlertType } = useUserStore();

    const [VictimName, setVictimName] = useState("")
    const [Age, setAge] = useState(0);
    const [Gender, setGender] = useState("");
    const [Height, setHeight] = useState("")
    const [Weight, setWeight] = useState("");
    const AddEvidence = async () => {
        const data = {
            CrimeId: CrimeId,
            VictimName: VictimName,
            Age: Age,
            Gender: Gender,
            Height: Height,
            Weight: Weight
        }
        console.log("THis is data", data)
        await fetch('/api/victims/add-victim', {
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
                    navigate('/crimes/' + CrimeId);
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
            <h1 className="text-2xl font-semibold text-center md:text-4xl">Add a Victim</h1>
            <input
                type="text"
                className="input input-bordered input-info w-full max-w-[20rem]"
                id="text"
                placeholder="Enter Victim Name"
                value={VictimName}
                onChange={(e) => setVictimName(e.target.value)}
            />
            <input
                type="number"
                className="input input-bordered input-info w-full max-w-[20rem]"
                id="text"
                placeholder="Enter Victim Age"
                value={Age}
                onChange={(e) => setAge(e.target.value)}
            />
            <input
                type="text"
                className="input input-bordered input-info w-full max-w-[20rem]"
                id="text"
                placeholder="Enter Victim Gender"
                value={Gender}
                onChange={(e) => setGender(e.target.value)}
            />
            <input
                type="text"
                className="input input-bordered input-info w-full max-w-[20rem]"
                id="text"
                placeholder="Enter Victim Height"
                value={Height}
                onChange={(e) => setHeight(e.target.value)}
            />
            <input
                type="text"
                className="input input-bordered input-info w-full max-w-[20rem]"
                id="text"
                placeholder="Enter Victim Weight"
                value={Weight}
                onChange={(e) => setWeight(e.target.value)}
            />
            <button onClick={AddEvidence} className="btn btn-active btn-success text-xl text-white">
                Add Victim
            </button>
        </div>
    )
}

export default AddVictims
