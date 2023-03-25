import React, { useState, useEffect, useRef } from "react";
import { loadModules } from "esri-loader";
import Loader from "../components/loaders/Loader";
import { useLocation, useSearchParams } from "react-router-dom";
import { detailedView } from "../global/api";
import _, { initial } from "lodash";
import { colorLine } from "../global/defaultValues";
import { useQuery } from "react-query";
import { InputSwitch } from 'primereact/inputswitch';
import { motion } from "framer-motion"
import { editJourney } from "../global/api";

const Route = () => {
    const [searchParams] = useSearchParams();
    const [final, setFinal] = useState([])
    console.log(searchParams.get('journeyId'))
    const [toggleEdit, setToggleEdit] = useState(true)
    const location = useLocation();
    const MapElement = useRef(null);
    const [mapExpanded, setMapExpanded] = useState(false)
    const { data, error, isLoading } = useQuery('detailedView', () => detailedView({
        journeyId: searchParams.get('journeyId')
    }))
    const [formData, setFormData] = useState({
        journeyName: "",
        journeyStartLocation: "",
        journeyEndLocation: "",
        journeyStartTime: "",
        journeyPurpose: "",
        journeyComplete: false
    });
    const handleEdit = async () => {
        const response = await editJourney({ ...formData, journeyId: data.journey.journeyId, convoySize: data.journey.convoySize })
        console.log(response)
        alert(response.data)
    }

    useEffect(() => {
        let view;
        // const { mmsi } = router.query;
        (async () => {
            loadModules(
                [
                    "esri/views/MapView",
                    "esri/WebMap",
                    "esri/Graphic",
                    "esri/geometry/Point",
                    "esri/core/watchUtils",
                    "esri/geometry/Multipoint"
                ],
                {
                    css: true,
                }
            ).then(async ([MapView, WebMap, Graphic, Point, watchUtils, Multipoint]) => {


                const webmap = new WebMap({
                    basemap: "satellite",
                });

                var view = new MapView({
                    map: webmap,
                    center: [0,0],
                    zoom: 3,
                    container: MapElement.current,
                });
                const interval = setInterval(() => {
                    detailedView({
                        journeyId: searchParams.get('journeyId')
                    }).then(data => {
                        console.log(data)
                        const {location:res}=data;
                        res && res.forEach((item, index) => {
                            if (res[index].length > 0) {
                                const polyline = {
                                    type: "polyline",
                                    paths: [
                                        res[index]
                                            .map((item) => [item.longitude, item.latitude]).reverse(),
                                    ],
                                };
                                const polylineGraphic = new Graphic({
                                    geometry: polyline,
                                    symbol: {
                                        type: "cim", // autocasts as CIMSymbol
                                        data: {
                                            type: "CIMSymbolReference",
                                            symbol: {
                                                type: "CIMLineSymbol",
                                                symbolLayers: [
                                                    {
                                                        // black 1px line symbol
                                                        type: "CIMSolidStroke",
                                                        enable: true,
                                                        width: 2,
                                                        color: colorLine[index],
                                                    },
                                                    {
                                                        // arrow symbol
                                                        type: "CIMVectorMarker",
                                                        enable: true,
                                                        size: 6,
                                                        markerPlacement: {
                                                            type: "CIMMarkerPlacementAlongLineSameSize", // places same size markers along the line
                                                            endings: "WithMarkers",
                                                            placementTemplate: [19.5], // determines space between each arrow
                                                            angleToLine: true, // symbol will maintain its angle to the line when map is rotated
                                                        },
                                                        frame: {
                                                            xmin: -5,
                                                            ymin: -5,
                                                            xmax: 5,
                                                            ymax: 5,
                                                        },
                                                        markerGraphics: [
                                                            {
                                                                type: "CIMMarkerGraphic",
                                                                geometry: {
                                                                    rings: [
                                                                        [
                                                                            [-8, -5.47],
                                                                            [-8, 5.6],
                                                                            [1.96, -0.03],
                                                                            [-8, -5.47],
                                                                        ],
                                                                    ],
                                                                },
                                                                symbol: {
                                                                    type: "CIMPolygonSymbol",
                                                                    symbolLayers: [
                                                                        {
                                                                            type: "CIMSolidFill",
                                                                            enable: true,
                                                                            color: [0, 10, 0, 255],
                                                                        },
                                                                    ],
                                                                },
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                });
                                view.graphics.add(polylineGraphic);

                                let symbol = {
                                    type: "simple-marker",
                                    style: "circle",
                                    color: "orange",
                                    size: "10px",
                                    outline: {
                                        color: [150, 200, 255],
                                        width: 1,
                                    },
                                };

                                let popupTemplate = {
                                    title: "{Name}",
                                    content: "{Description}",
                                };
                                res[index]
                                    .forEach((item) => {
                                        var point_symbol = new Point({
                                            longitude: item.longitude,
                                            latitude: item.latitude,
                                            spatialReference: { wkid: 3857 },
                                        });
                                        var graphic_symbol = new Graphic({
                                            geometry: point_symbol,
                                            symbol,
                                            attributes: {
                                                Name: `<b>Convoy Id ${item.convoyId}</b>`,
                                                Description: `<div><b>Timestamp: ${item.timeStamp}<br/>Longitude: ${item.longitude}<br/>Latitude: ${item.latitude}`,
                                            },
                                            popupTemplate,
                                        });
                                        view.graphics.add(graphic_symbol);
                                    });
                            }
                        })
                        // }
                        watchUtils.whenTrue(view, "updating", function (evt) {
                            if (document.getElementById("loaderElement"))
                                document.getElementById("loaderElement").style.display = "block";
                        });

                        // Hide the loading indicator when the view stops updating
                        watchUtils.whenFalse(view, "updating", function (evt) {
                            if (document.getElementById("loaderElement"))
                                document.getElementById("loaderElement").style.display = "none";
                        });
                    })
                }, 10000)
                // let { location: res } = await detailedView({
                //     journeyId: searchParams.get('journeyId')
                // });
                return () => clearInterval(interval);
            });
        })();

        return () => {
            if (!!view) {
                view.destroy();
                view = null;
            }
        };
    }, [location.query]);

    useEffect(() => {
        if (data) {
            console.log(data)
            setFormData({
                journeyName: data.journey.journeyName,
                journeyPurpose: data.journey.journeyPurpose,
                journeyEndLocation: data.journey.journeyEndLocation,
                journeyStartLocation: data.journey.journeyStartLocation,
                journeyStartTime: data.journey.journeyStartTime.slice(0, 10),
                journeyComplete: data.journey.journeyComplete
            })
        }
    }, [data])

    if (error) return <>{console.log(error)}</>
    if (isLoading) return <Loader text="Loading..." />

    return (
        <div className="flex">

            <div className="flex relative">
                <div>
                    <div
                        className="mapLayer relative shadow-xl"
                        style={{
                            height: "calc(100vh - 136px)",
                            width: mapExpanded ? "90vw" : "30vw",
                            transition: "all 0.3s ease"
                        }}
                        ref={MapElement}
                    >
                        <div id="loaderElement" className="loadingMap">
                            <Loader text="It may take several moments.." />
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => setMapExpanded(!mapExpanded)}
                    style={{ position: "absolute", top: "50%", right: "2rem" }}
                    className="basicDarkButton p-2 "  >
                    {
                        mapExpanded ?
                            <i className="pi pi-chevron-left z-10" style={{ color: "white" }}></i>
                            :
                            <i className="pi pi-chevron-right z-10" style={{ color: "white" }}></i>

                    }

                </button>
            </div>
            <div className={`p-12 w-full ${mapExpanded ? 'opacity-5' : 'opacity-100'}`}>
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">{data.journey.journeyName}</h1>
                    <button className="basicDarkButton"
                        style={{ border: "2px solid var(--base-color)", background: "white", color: "var(--base-color)" }}
                        onClick={() => setToggleEdit(!toggleEdit)}
                    >Edit</button>
                </div>
                {
                    toggleEdit
                        ?
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                        >
                            <div>
                                <div className="grid grid-cols-[repeat(3,1fr),2fr,1fr,1fr] text-center text-xs uppercase mt-12">
                                    <p className="border-2 p-2">Journey Id</p>
                                    <p className="border-2 p-2">Convoy Size</p>
                                    <p className="border-2 p-2">End Location</p>
                                    <p className="border-2 p-2">Purpose</p>
                                    <p className="border-2 p-2">Start Location</p>
                                    <p className="border-2 p-2">Start Time</p>
                                </div>

                                <div className="grid grid-cols-[repeat(3,1fr),2fr,1fr,1fr] text-center text-sm font-semibold mb-2">
                                    <p className="border-2 p-2">{data.journey.journeyId}</p>
                                    <p className="border-2 p-2">{data.journey.convoySize}</p>
                                    <p className="border-2 p-2">{data.journey.journeyEndLocation}</p>
                                    <p className="border-2 p-2">{data.journey.journeyPurpose}</p>
                                    <p className="border-2 p-2">{data.journey.journeyStartLocation}</p>
                                    <p className="border-2 p-2">{data.journey.journeyStartTime}</p>
                                </div>
                            </div>
                            <div className='text-sm'>
                                <div className="grid grid-cols-7">
                                    <span className='text-xs uppercase border-2 p-2'>Id</span>
                                    <span className='text-xs uppercase border-2 p-2'>device Id</span>
                                    <span className='text-xs uppercase border-2 p-2'>device name</span>
                                    <span className='text-xs uppercase border-2 p-2'>vehicle Position</span>
                                    <span className='text-xs uppercase border-2 p-2'>vehicle Number</span>
                                    <span className='text-xs uppercase border-2 p-2'>vehicle Model</span>
                                    <span className='text-xs uppercase border-2 p-2'>vehicle Company</span>
                                </div>
                                {
                                    _.map(data.convoy, (item, idx) => {
                                        return <div key={idx} className="grid grid-cols-7">
                                            <p className='border-2 p-2 font-semibold'>{item.id}</p>
                                            <p className='border-2 p-2 font-semibold'>{item.device.deviceId}</p>
                                            <p className='border-2 p-2 font-semibold'>{item.device.deviceName}</p>
                                            <p className='border-2 p-2 font-semibold'>{item.vehiclePosition}</p>
                                            <p className='border-2 p-2 font-semibold'>{item.vehicle.vehicleNumber}</p>
                                            <p className='border-2 p-2 font-semibold'>{item.vehicle.vehicleModel}</p>
                                            <p className='border-2 p-2 font-semibold'>{item.vehicle.vehicleCompany}</p>
                                        </div>
                                    })
                                }
                            </div>

                        </motion.div>
                        :
                        <motion.div
                            className="mt-12"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                        >
                            <div className='grid grid-cols-2 w-full'>
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
                                <div className="text-sm flex justify-between items-center">
                                    <p>Toggle to complete/uncomplete journey</p>
                                    <InputSwitch checked={formData.journeyComplete} onChange={(e) => setFormData({ ...formData, journeyComplete: e.value })} />
                                </div>
                                <button
                                    onClick={handleEdit}
                                    className="basicDarkButton m-2">
                                    Submit
                                </button>

                            </div>
                        </motion.div>
                }
            </div>
        </div>
    );
};

export default Route;
