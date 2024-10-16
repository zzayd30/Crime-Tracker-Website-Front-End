import React, { useEffect, useState } from 'react'
import { useUserStore } from '../store/store'
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';

const EditVictim = () => {
    const { VictimId, CrimeId } = useParams();
    const navigate = useNavigate();
    const { token, UserId, setIsAlert, setAlertMsg, setAlertType } = useUserStore();

    const [VictimName, setVictimName] = useState("")
    const [Age, setAge] = useState(0);
    const [Gender, setGender] = useState("");
    const [Height, setHeight] = useState("")
    const [Weight, setWeight] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const UpdateSuspect = async () => {
        const data = {
            VictimName: VictimName,
            Age: Age,
            Gender: Gender,
            Height: Height,
            Weight: Weight,
            VictimId: VictimId
        }
        console.log("THis is data in edit", data)
        await fetch('/api/victims/edit-victim', {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(data => data.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    setIsAlert(true)
                    setAlertType("success")
                    setAlertMsg(data.message)
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
    const getData = async () => {
        console.log("IN edit Suspect")
        await fetch(`/api/victims/${VictimId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(data => data.json())
            .then(data => {
                if (!data.success) {
                    setIsAlert(true)
                    setAlertType("error")
                    setAlertMsg(data.message)
                    return;
                }
                console.log(data.data)
                setVictimName(data.data.VictimName)
                setAge(data.data.Age)
                setGender(data.data.Gender)
                setHeight(data.data.Height)
                setWeight(data.data.Weight)
                setIsLoading(false)
            })
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            {isLoading ? (<Loader />) : (<div className="flex flex-col gap-y-8 h-[100vh] justify-center items-center" >
                <h1 className="text-2xl font-semibold text-center md:text-4xl">Edit Suspect</h1>
                <input
                    type="text"
                    className="input input-bordered input-info w-full max-w-[20rem]"
                    id="name"
                    placeholder="Enter Victim Name"
                    value={VictimName}
                    onChange={(e) => setVictimName(e.target.value)}
                />
                <input
                    type="number"
                    className="input input-bordered input-info w-full max-w-[20rem]"
                    id="age"
                    placeholder="Enter Victim Age"
                    value={Age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <input
                    type="text"
                    className="input input-bordered input-info w-full max-w-[20rem]"
                    id="gender"
                    placeholder="Enter Victim Gender"
                    value={Gender}
                    onChange={(e) => setGender(e.target.value)}
                />
                <input
                    type="text"
                    className="input input-bordered input-info w-full max-w-[20rem]"
                    id="height"
                    placeholder="Enter Victim Height"
                    value={Height}
                    onChange={(e) => setHeight(e.target.value)}
                />
                <input
                    type="text"
                    className="input input-bordered input-info w-full max-w-[20rem]"
                    id="weight"
                    placeholder="Enter Victim Weight"
                    value={Weight}
                    onChange={(e) => setWeight(e.target.value)}
                />
                <button onClick={UpdateSuspect} className="btn btn-active btn-success text-xl text-white">
                    Update
                </button>
            </div >)
            }
        </>
    )
}

export default EditVictim