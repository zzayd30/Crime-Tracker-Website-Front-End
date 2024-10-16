import React, { useEffect, useState } from 'react'
import SuspectTable from '../components/SuspectTable'
import Loader from '../components/Loader';
import { useUserStore } from '../store/store';
const Suspects = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState("SuspectName");
    const [search, setSearch] = useState("");
    const [searchBy, setSearchBy] = useState("SuspectName");
    const handleSearchChange = (e) => {
        setSearchBy(e.target.value);
    }
    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    }
    const { token } = useUserStore();
    const [suspects, setSuspects] = useState([]);
    const getData = async () => {
        fetch(`/api/suspects?sort=${sortBy}&${searchBy}=${search}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(data => data.json())
            .then(data => {
                // console.log(data)
                setSuspects(data.data)
                setIsLoading(false)
            })
    }
    useEffect(() => {
        console.log(sortBy, search, searchBy)
        getData();
    }, [sortBy, search, searchBy])
    return (
        <>
            <div className='flex items-center justify-center flex-col gap-y-8 min-h-screen'>
                <h1 className='mt-8 text-4xl text-center'>Suspect Details</h1>
                <div className='flex items-center justify-around w-full'>
                    <div className='flex align-items justify-center gap-x-2'>
                        <div className="join">
                            <div>
                                <div>
                                    <input className="input input-bordered join-item" placeholder="Search" onChange={e => setSearch(e.target.value)}
                                        value={search} />

                                </div>
                            </div>
                            <select className="select select-bordered join-item" onChange={handleSearchChange}>
                                <option>SuspectName</option>
                                <option>SuspectId</option>
                            </select>
                            <div className="indicator">
                                <button className="btn join-item">Search</button>
                            </div>
                        </div>
                        <div>
                            <select className="select select-bordered" onChange={handleSortChange}>
                                <option>SuspectName</option>
                                <option>Age</option>
                                <option>Gender</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* Crimes */}
                <div className='card-container'>
                    {!isLoading
                        ? (<SuspectTable key={10} suspects={suspects} />)
                        : (<Loader />)
                    }
                </div>
            </div>
        </>
    )
}

export default Suspects
