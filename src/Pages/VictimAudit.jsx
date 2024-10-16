import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import { useUserStore } from '../store/store';
import VictimAuditTable from '../components/VictimAuditTable';
const VictimAudit = () => {
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
        fetch(`/api/victimAudit`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(data => data.json())
            .then(data => {
                console.log(data)
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
                <h1 className='mt-8 text-4xl text-center'>Victim Audit</h1>
                {/* Crimes */}
                <div className='card-container'>
                    {!isLoading
                        ? (<VictimAuditTable key={10} victims={victims} />)
                        : (<Loader />)
                    }
                </div>
            </div>
        </>
    )
}

export default VictimAudit
