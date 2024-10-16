import React, { useEffect, useState } from 'react'
import VictimTable from '../components/VictimTable'
import Loader from '../components/Loader';
import { useUserStore } from '../store/store';
const Victims = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState("VictimName");
    const [search, setSearch] = useState("");
    const [searchBy, setSearchBy] = useState("VictimName");
    const handleSearchChange = (e) => {
        setSearchBy(e.target.value);
    }
    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    }
    const { token } = useUserStore();
    const [victims, setVictims] = useState([]);
    const getData = async () => {
        fetch(`/api/victims?sort=${sortBy}&${searchBy}=${search}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(data => data.json())
            .then(data => {
                // console.log(data)
                setVictims(data.data)
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
                <h1 className='mt-8 text-4xl text-center'>Victim Details</h1>
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
                                <option>VictimName</option>
                                <option>VictimId</option>
                            </select>
                            <div className="indicator">
                                <button className="btn join-item">Search</button>
                            </div>
                        </div>
                        <div>
                            <select className="select select-bordered" onChange={handleSortChange}>
                                <option>VictimName</option>
                                <option>Age</option>
                                <option>Gender</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* Crimes */}
                <div className='card-container'>
                    {!isLoading
                        ? (<VictimTable key={10} victims={victims} />)
                        : (<Loader />)
                    }
                </div>
            </div>
        </>
    )
}

export default Victims
