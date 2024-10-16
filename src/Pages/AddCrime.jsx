import React, { useEffect, useState } from 'react'
import { useUserStore } from '../store/store'
import { useNavigate } from 'react-router-dom';
import VictimDetails from '../components/VictimDetails';

const AddCrime = () => {
  const navigate = useNavigate();
  const { token, UserId, setIsAlert, setAlertMsg, setAlertType } = useUserStore();

  const [CrimeType, setCrimeType] = useState("")
  const [Location, setLocation] = useState("")
  const [Description, setDescription] = useState("")
  const [suspects, setSuspects] = useState("");
  const [victims, setVictims] = useState("");
  const [victimArray, setVictimArray] = useState([]);
  const [suspectsArray, setSuspectsArray] = useState([]);
  const handleChange = (e) => {
    setSuspects(e.target.value);
  }
  const report = async () => {
    const data = {
      ReporterId: UserId,
      CrimeType: CrimeType,
      Location: Location,
      Description: Description,
      Suspects: suspectsArray,
      Victims: victimArray
    }
    console.log("THis is data", data)
    await fetch('/api/crimes/add-crime', {
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
          setAlertMsg("Your Case has been reported successfully")
          navigate('/crimes/' + data.CrimeId);
        }
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    setSuspectsArray(suspects.split(','))
    setVictimArray(victims.split(','))
  }, [suspects, victims])
  return (
    <div className="flex flex-col gap-y-8 h-[100vh] justify-center items-center ">
      <h1 className="text-2xl font-semibold text-center md:text-4xl">Report a Crime</h1>
      <input
        type="text"
        className="input input-bordered input-info w-full max-w-[20rem]"
        id="text"
        placeholder="Enter CrimeType"
        value={CrimeType}
        onChange={(e) => setCrimeType(e.target.value)}
      />
      <input
        type="text"
        className="input input-bordered input-info w-full max-w-[20rem]"
        id="text"
        placeholder="Enter Location"
        value={Location}
        onChange={(e) => setLocation(e.target.value)}
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
        placeholder="Enter Suspects i.e Muaz,Cheema"
        value={suspects}
        onChange={handleChange}
      />
      <input
        type="text"
        className="input input-bordered input-info w-full max-w-[20rem]"
        id="text"
        placeholder="Enter Victims i.e Muaz,Cheema"
        value={victims}
        onChange={(e) => setVictims(e.target.value)}
      />
      <button onClick={report} className="btn btn-active btn-error text-xl text-white">
        Report
      </button>
    </div>
  )
}

export default AddCrime
