import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { pageFramer } from "../global/defaultValues";
import { useNavigate } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import IITJAM from "../static/images/sih.png"

export default function Home() {
    const [aspectRatio, setAspectRatio] = useState(1);
    const navigate = useNavigate()
    useEffect(() => {
        if (typeof window !== "undefined") {
            let availableHeight = window.innerHeight - 136;
            let availableWidth = window.innerWidth;
            setAspectRatio(availableWidth / availableHeight);
        }
    }, []);
    return (
        <>
            <Navbar />
            <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageFramer}
                className="grid grid-cols-2"
                style={{
                    position: "relative",
                    height: "calc(100vh - 136px)",
                    width: "100%",
                }}
            >
                <div className="grid place-items-center">
                    <img
                        src={IITJAM}
                        height={500}
                        width={500}
                        alt="Home Cover"
                    />
                </div>
                <div className="grid place-items-center">
                    <div className="text-center p-20">
                        <p className="text-6xl">BTP</p>
                        <p className="text-xl mt-4">
                            Allows passing CSS styles to the underlying image element.
                        </p>
                        <p className="text-sm mt-4 text-gray-400">
                            Also keep in mind that the required width and height props can interact with your styling. If you use styling to modify an images width, you must set the height style as well, or your image will be distorted.
                        </p>

                        <button
                            onClick={() => navigate("/map", { replace: false })}
                            className="basicDarkButton mt-4"
                        >
                            Access GIS
                        </button>
                    </div>
                </div>
            </motion.div>
        </>

    );
}
