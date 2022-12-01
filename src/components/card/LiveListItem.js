import _ from 'lodash'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const LiveListItem = (props) => {
    const { journey, convoy } = props
    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate(`/detailedview?journeyId=${journey.journeyId}`)}
            className='my-2 cursor-pointer p-4 rounded shadow border-2 hover:shadow-xl hover:border-sky-500'>
            <div className='font-semibold grid grid-cols-[30px,100px,1fr,1fr,1fr,1fr,1fr] justify-items-center'>
                <p>{journey.journeyId}</p>
                <p>{journey.convoySize}</p>
                <p>{journey.journeyName}</p>
                <p>{journey.journeyStartLocation}</p>
                <p>{journey.journeyEndLocation}</p>
                <p>{journey.journeyStartTime}</p>
                <p className='text-center'>{journey.journeyPurpose}</p>
                {/* <p className='text-right'>{journey.journeyComplete}</p> */}
            </div>

        </div>
    )
}

export default LiveListItem