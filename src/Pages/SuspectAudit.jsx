import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import { useUserStore } from '../store/store';
import SuspectAuditTable from '../components/SuspectAuditTable';
const SuspectAudit = () => {
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
        fetch(`/api/suspectAudit`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(data => data.json())
            .then(data => {
                console.log(data)
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
                <h1 className='mt-8 text-4xl text-center'>Suspect Audit</h1>
                {/* Crimes */}
                <div className='card-container'>
                    {!isLoading
                        ? (<SuspectAuditTable key={10} suspects={suspects} />)
                        : (<Loader />)
                    }
                </div>
            </div>
        </>
    )
}

export default SuspectAudit
