import React, { useState } from 'react'
import { fetchingAllLiveJourney } from '../global/api';
import LiveListItem from '../components/card/LiveListItem';
import _ from "lodash"
import Loader from '../components/loaders/Loader';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

const Alllist = () => {
    const [value, setValue] = useState('');
    const { data, error,isLoading } = useQuery('fetchingAllLiveJourney', fetchingAllLiveJourney)
    const navigate=useNavigate()

    if (error) return <>{console.log(error)}</>
    if (isLoading) return <Loader text="Loading..." />

    return (
        <div>
            <div className='p-12'>
                <div className='flex justify-between mb-4'>
                    <p className='text-5xl font-bold'>all Journeys</p>
                    <div>
                        <input
                            placeholder='Filter by ID'
                            className='standardInput'
                            value={value}
                            onChange={(e) => setValue(e.target.value)} />
                        <button className="basicDarkButton  mt-2"
                            style={{ background: "var(--base-color)", border: "2px solid var(--base-color)", color: "white" }}
                        >Search</button>
                        <button className='basicDarkButton ml-2'
                            onClick={()=>navigate("/createjourney")}
                            style={{ border: "2px solid var(--base-color)", background: "white", color: "var(--base-color)" }}
                        >
                            Create Journey
                        </button>
                    </div>
                </div>
                {
                    _.map(_.filter(data, x => { return x.journey.journeyId.toString().includes(value) }), (item, idx) => {
                        return <LiveListItem key={idx} {...item} />
                    })
                }
            </div>
        </div>
    )
}

export default Alllist