import _ from "lodash"
import { useQuery } from 'react-query';
import Loader from '../components/loaders/Loader';
import React, { useEffect, useState } from 'react'
import { InputSwitch } from 'primereact/inputswitch';
import { availableObjects, createJourney } from '../global/api';

const Createjourney = () => {


    const [selectedPair, setSelectedPair] = useState({ deviceId: "", vehicleNumber: "", vehiclePosition: 1 })
    const [availableDevices, setAvailableDevices] = useState([])
    const [availableCars, setAvailableCars] = useState([])
    const [checked2, setChecked2] = useState(false);
    const { isLoading, isError, data, error } = useQuery('availableObjects', availableObjects)
    const [formData, setFormData] = useState({
        convoySize: 2,
        journeyName: "",
        journeyStartLocation: "",
        journeyEndLocation: "",
        journeyStartTime: "",
        journeyPurpose: "",
        convoyList: []
    });
    const createANewJourney = async () => {
        const confirm = window.confirm("Please confirm ?");
        if (confirm) {
            console.log({ ...formData, journeyStartTime: new Date(formData.journeyStartTime).toISOString().replace('Z', '') })
            const response = await createJourney({ ...formData, journeyStartTime: new Date(formData.journeyStartTime).toISOString().replace('Z', '') })
            console.log(response)
        }
    }



    useEffect(() => {
        if (data) {
            setAvailableDevices(data.devices)
            setAvailableCars(data.vehicles)
            setFormData({
                ...formData, convoyList: [{ deviceId: data.devices[0].deviceName, vehicleNumber: data.vehicles[0].vehicleNumber, vehiclePosition: 1 },
                { deviceId: data.devices[1].deviceName, vehicleNumber: data.vehicles[1].vehicleNumber, vehiclePosition: 2 }]
            })
        }
    }, [data])
    if (isError) return <>{console.log(error)}asdfa</>
    if (isLoading) return <Loader text="Loading..." />

    return (
        <div className='p-12'>
            <p className='text-5xl font-bold mb-4'>create Journey</p>
            <div className='grid grid-cols-2 '>
                <input
                    placeholder='Convoy size'
                    type="text"
                    value={formData.convoySize}
                    onChange={(e) => setFormData({ ...formData, convoySize: e.target.value })}
                    className='standardInput' />
                <input
                    placeholder='Journey Name'
                    value={formData.journeyName}
                    onChange={(e) => setFormData({ ...formData, journeyName: e.target.value })}
                    type="text"
                    className='standardInput' />
                <input
                    placeholder='Journey Start Location'
                    value={formData.journeyStartLocation}
                    onChange={(e) => setFormData({ ...formData, journeyStartLocation: e.target.value })}
                    type="text"
                    className='standardInput' />
                <input
                    placeholder='Journey End Location'
                    value={formData.journeyEndLocation}
                    onChange={(e) => setFormData({ ...formData, journeyEndLocation: e.target.value })}
                    type="text"
                    className='standardInput' />
                <input
                    placeholder='Journey Start Time'
                    value={formData.journeyStartTime}
                    onChange={(e) => setFormData({ ...formData, journeyStartTime: e.target.value })}
                    type="date"
                    className='standardInput' />
                <input
                    placeholder='Journey Purpose'
                    value={formData.journeyPurpose}
                    onChange={(e) => setFormData({ ...formData, journeyPurpose: e.target.value })}
                    type="text"
                    className='standardInput' />

            </div>
            <div className='flex justify-center gap-8 my-4'>
                <p>Jourey is complete? By default it is false</p>
                <InputSwitch checked={checked2} onChange={(e) => setChecked2(e.value)} />
            </div>
            <div className='grid grid-cols-5 gap-12 flex-wrap'>
                <div
                    className='card grid grid-cols-1 overflow-hidden border-2 rounded border-sky-500 p-2'>
                    <select className='standardInput w-full'
                        style={{ margin: 0, marginBottom: "0.5rem" }}
                        value={selectedPair.deviceId}
                        onChange={(e) => setSelectedPair({ ...selectedPair, deviceId: e.target.value })}
                    >
                        <option value="" disabled hidden>Choose here</option>
                        {_.map(_.difference(availableDevices, _.map(formData.convoyList, item => item.deviceId)), (x, idx) => { return <option key={idx} value={x.deviceName}>{x.deviceId} :: {x.deviceName}</option> })}
                    </select>
                    <select className='standardInput'
                        value={selectedPair.vehicleNumber}
                        style={{ margin: 0, marginBottom: "0.5rem" }}
                        onChange={(e) => setSelectedPair({ ...selectedPair, vehicleNumber: e.target.value })}
                    >
                        <option value="" disabled hidden>Choose here</option>
                        {_.map(_.difference(availableCars, _.map(formData.convoyList, item => item.vehicleNumber)), (x, idx) => { return <option key={idx} value={x.vehicleNumber}>{x.vehicleNumber} :: {x.vehicleModel}</option> })}
                    </select>
                    <input type="text"
                        className="standardInput"
                        placeholder="Vehicle Position"
                        style={{ margin: 0, marginBottom: "1rem" }}
                        value={selectedPair.vehiclePosition}
                        onChange={e => {
                            // if (e.target.value === null)
                            //     setVehiclePosition(1)
                            // if (parseInt(e.target.value) < formData.convoySize)
                            setSelectedPair({ ...selectedPair, vehiclePosition: e.target.value })
                            // else
                            //     alert("Position is not possible with this convoy size")
                        }}
                    />
                    <button className='border-none basicDarkButton rounded-none'
                        onClick={() => {
                            setFormData({ ...formData, convoyList: [...formData.convoyList, selectedPair] })
                        }
                        }
                    >Link This</button>
                </div>
                {_.map(formData.convoyList, (item, idx) => {
                    return (<div
                        key={idx}
                        className='card relative bg-gray-200 rounded'>
                        <p className='standardInput'
                        >
                            Number Plate: {item.vehicleNumber}
                        </p>
                        <p className='standardInput'
                        >
                            Device: {item.deviceId}
                        </p>
                        <p className='standardInput'
                        >
                            Position: {item.vehiclePosition}
                        </p>
                        <button
                            onClick={() => setFormData({ ...formData, convoyList: formData.convoyList.filter(X => X !== item) })}
                            className='border-none rounded-full bg-gray-300 absolute grid place-content-center p-1 top-0 left-100 -translate-x-2/4 -translate-y-2/4'><i className="pi pi-times"></i></button>
                    </div>)
                })}
            </div>
            <div onClick={createANewJourney}>
                <button className={`${_.isEmpty(formData.convoyList) ? 'opacity-25 pointer-events-none' : 'opacity-100 pointer-events-auto'} basicDarkButton w-full mt-12`}>Submit</button>
            </div>
        </div>
    )
}

export default Createjourney
