import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPlus, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons'
import CrimeTables from '../components/CrimeTables'
import { useUserStore } from '../store/store'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
const Crimes = () => {
    const [sortBy, setSortBy] = useState("crimeId");
    const [search, setSearch] = useState("");
    const [searchBy, setSearchBy] = useState("CrimeType");
    const [isLoading, setIsLoading] = useState(true);
    const [crimes, setCrimes] = useState({});
    const { token } = useUserStore();
    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    }
    const handleSearchChange = (e) => {
        setSearchBy(e.target.value);
    }
    const getData = async () => {
        const url = `/api/crimes?sort=${sortBy}&${searchBy}=${search}`;
        await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(data => data.json())
            .then(data => {
                setCrimes(data.data)
            })
            .catch(err => console.log(err))
        setIsLoading(false);
    }
    useEffect(() => {
        getData();
    }, [sortBy, search, searchBy])
    return (
        <div className='flex items-center justify-center flex-col gap-y-8'>
            <h1 className='mt-8 text-4xl text-center'>Crime Details</h1>
            <div className='flex items-center justify-around w-full'>
                <div className='flex items-center justify-center gap-x-4'>
                    <div data-tip="Add New Crime" className='tooltip'>
                        <Link to='/crimes/add-crime' className='btn btn-info btn-circle '>
                            <FontAwesomeIcon icon={faSquarePollVertical} />                        </Link>
                    </div>
                </div>
                <div className='flex align-items justify-center gap-x-2'>
                    <div className="join">
                        <div>
                            <div>
                                <input className="input input-bordered join-item" placeholder="Search" onChange={e => setSearch(e.target.value)}
                                    value={search} />

                            </div>
                        </div>
                        <select className="select select-bordered join-item" onChange={handleSearchChange}>
                            <option>CrimeType</option>
                            <option>ReporterName</option>
                            <option>Description</option>
                            <option>Location</option>
                        </select>
                        <div className="indicator">
                            <button className="btn join-item">Search</button>
                        </div>
                    </div>
                    <div>
                        <select className="select select-bordered" onChange={handleSortChange}>
                            <option>CrimeType</option>
                            <option>ReporterName</option>
                            <option>Date</option>
                        </select>
                    </div>
                </div>
            </div>
            {/* Crimes */}
            <div className='card-container'>
                {!isLoading
                    ? (<CrimeTables key={10} crimes={crimes} />)
                    : (<Loader />)
                }
            </div>
        </div>
    )
}

export default Crimes
