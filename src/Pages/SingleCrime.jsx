import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { useUserStore } from '../store/store'
import Error from '../components/Error'

import CrimeDetails from '../components/CrimeDetails'
import EvidenceDetails from '../components/EvidenceDetails'
import SuspectsDetails from '../components/SuspectsDetails'
import VictimDetails from '../components/VictimDetails'

const SingleCrime = () => {
    const { token, role, setCrimeId } = useUserStore();
    const [crime, setCrime] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const { CrimeId } = useParams();
    console.log(CrimeId);
    const getData = async () => {
        console.log(token)
        fetch(`/api/crimes/${CrimeId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(data =>
                data.json()
            )
            .then((data) => {
                console.log("This is data", data.data)
                if (data.success) {
                    setCrime(data.data);
                    setCrimeId(data.data.CrimeId)
                    setIsLoading(false);
                }
                else {
                    setError(true);
                    setErrorMsg("Unable to find the crime Record");
                    console.log("This is error", errorMsg);
                    setIsLoading(false);
                }
            })
            .catch(err => console.log("This is err", err));
    }
    useEffect(() => {
        getData();
        console.log("TEST", crime?.Victims?.length, crime?.Suspects?.length)
    }, [])
    return (
        <>
            {isLoading
                ? <Loader />
                : error ? (<Error msg={errorMsg} />) : (
                    <>
                        <h1 className='text-3xl my-4 text-center'>Details</h1>
                        <div className="flex flex-col w-full lg:flex-row ">
                            <div className="align-baseline card bg-base-300 rounded-box w-[45vw] mx-auto my-4 px-8  max-h-[80vh] overflow-auto">
                                <div>
                                    <h1 className='text-2xl text-center'>Crime Details</h1>
                                    <CrimeDetails ReporterName={crime.ReporterName} Location={crime.Location} CrimeType={crime.CrimeType} Date={crime.Date} Time={crime.Time} Description={crime.Description} HandledBy={crime.HandledBy} />
                                </div>
                                {crime?.Evidences?.length !== 0 && <div className="divider"></div>}
                                <div className='flex items-center justify-center flex-col'>
                                    {crime?.Evidences?.length === 0
                                        ? (<h1 className='text-2xl text-center'>No Evidence Specified</h1>)
                                        : (
                                            <>
                                                <h1 className='text-2xl text-center'>Evidence</h1>
                                                <div className='grid grid-cols-2 gap-x-8 gap-y-2'>
                                                    {crime?.Evidences?.map((suspect, index) => <EvidenceDetails key={index} index={index} EvidenceType={suspect.EvidenceType} CollectedBy={suspect.CollectedBy} Description={suspect.EvidenceType} />)}
                                                </div>
                                            </>
                                        )}
                                    {role === "admin" && <Link to={`/evidence/add-evidence/${CrimeId}`} className='btn btn-info'>Add Evidences</Link>}
                                </div>
                            </div>
                            <div className="divider lg:divider-horizontal"></div>

                            <div className="align-baseline card bg-base-300 rounded-box w-[45vw] mx-auto my-4 px-8  max-h-[80vh] overflow-auto">
                                {crime?.Victims?.length === 0 && crime?.Suspects?.length === 0 ? (
                                    <div className='my-auto flex flex-col items-center jusitfy-center'>
                                        <h1 className='text-2xl text-center '>No Suspects and Victims Mentioned</h1>
                                        <div className='flex gap-4'>
                                            {role === "admin" && <Link to={`/suspects/add-suspect/${CrimeId}`} className='btn btn-info'>Add Suspect</Link>}
                                            {role === "admin" && <Link to={`/victims/add-victim/${CrimeId}`} className='btn btn-info'>Add Victim</Link>}
                                        </div>
                                    </div>) : <div>

                                    <div className='my-8 flex flex-col gap-y-4 items-center justify-center'>
                                        {
                                            crime?.Suspects?.length === 0 ? (<h1 className='text-2xl text-center my-4'>No Suspects Mentioned</h1>) : <><h1 className='text-2xl text-center my-4'>Suspects Details</h1>
                                                <div className='grid grid-cols-2 gap-x-8 gap-y-2'>
                                                    {crime?.Suspects?.map((suspect, index) => <SuspectsDetails key={index} index={index} SuspectName={suspect.SuspectName} Age={suspect.Age} Gender={suspect.Gender} Height={suspect.Height} Weight={suspect.Weight} SuspectId={suspect.SuspectId} CrimeId={CrimeId} />)}
                                                </div>
                                            </>}
                                        {role === "admin" && <Link to={`/suspects/add-suspect/${CrimeId}`} className='btn btn-info'>Add Suspect</Link>}</div>
                                    <div className="divider"></div>

                                    <div className='flex flex-col gap-y-4 items-center justify-center'>
                                        {crime?.Victims?.length === 0 ? (<h1 className='text-2xl text-center my-4'>No Victims Mentioned</h1>) : <><h1 className='text-2xl text-center my-4'>Victims Details</h1>
                                            <div className='grid grid-cols-2 gap-x-8 gap-y-2'>
                                                {crime?.Victims?.map((victim, index) => <VictimDetails key={index} index={index} VictimName={victim.VictimName} Age={victim.Age} Gender={victim.Gender} Height={victim.Height} Weight={victim.Height} VictimId={victim.VictimId} CrimeId={CrimeId} />)}
                                            </div>
                                        </>
                                        }
                                        {role === "admin" && <Link to={`/victims/add-victim/${CrimeId}`} className='btn btn-info'>Add Victim</Link>}</div>

                                </div>}
                            </div>
                        </div >
                    </>)}
        </>
    )
}

export default SingleCrime