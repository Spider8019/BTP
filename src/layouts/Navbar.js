//import useTranslation from 'next-translate/useTranslation'
import React from "react";
import { useLocation } from "react-router-dom";
import PAPERPANTRY from "../static/images/paper.png"
import { isBrowser } from "react-device-detect";
import { Link } from "react-router-dom";

const Navbar = () => {
    // let { t } = useTranslation()
    const location = useLocation()


    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });


    console.log("navbar")
    const redirectLink = (e) => {
        setState({ ...state, top: false });
    };

    const list = () => (
        <></>
        // <div
        //     className={` text-black sm:text-white bg-[#006233] flex flex-col sm:flex-row w-full}`}
        // >
        //     <div
        //         className={location.pathname === "/" ? "sm:bg-[#f1d5bc] bg-sky-500" : ""}
        //     >
        //         <Link
        //             to="/"
        //             onClick={redirectLink}
        //             className="px-4 sm:px-2 p-2 grid items-center  border-r-2 border-white"
        //         >
        //             Home
        //         </Link>
        //     </div>
        //     {
        //         //randomly
        //         localStorage.getItem("token") || true
        //             &&
        //             <>
        //                 <div
        //                     className={
        //                         location.pathname === "/map" ? "sm:bg-sky-600 bg-sky-500" : ""
        //                     }
        //                 >
        //                     <Link
        //                         to="/map"
        //                         onClick={redirectLink}
        //                         className="px-4 sm:px-2 p-2 grid items-center  border-r-2 border-white"
        //                     >
        //                         Access GIS
        //                     </Link>
        //                 </div>
        //                 <div
        //                     className={
        //                         location.pathname === "/alllist" ? "sm:bg-sky-600 bg-sky-500" : ""
        //                     }
        //                 >
        //                     <Link
        //                         to="/alllist"
        //                         onClick={redirectLink}
        //                         className="px-4 sm:px-2 p-2 grid items-center  border-r-2 border-white"
        //                     >
        //                         Live Journey's
        //                     </Link>
        //                 </div>
        //                 <div
        //                     className={
        //                         location.pathname === "/createjourney" ? "sm:bg-sky-600 bg-sky-500" : ""
        //                     }
        //                 >
        //                     <Link
        //                         to="/createjourney"
        //                         onClick={redirectLink}
        //                         className="px-4 sm:px-2 p-2 grid items-center  border-r-2 border-white"
        //                     >
        //                         Create Journey
        //                     </Link>
        //                 </div><div
        //                     className={
        //                         location.pathname === "/createuser" ? "sm:bg-sky-600 bg-sky-500" : ""
        //                     }
        //                 >
        //                     <Link
        //                         to="/createuser"
        //                         onClick={redirectLink}
        //                         className="px-4 sm:px-2 p-2 grid items-center  border-r-2 border-white"
        //                     >
        //                         Create User
        //                     </Link>
        //                 </div>
        //             </>
        //     }
        // </div>
    );

    // if (
    //     ["/auth/login"].includes(location.pathname))
    //     return null;

    if (isBrowser) {
        return (
            <div className=" flex flex-col  bg-[#006233] sm:p-0">
                <div className="px-10 flex justify-between items-center  border-b border-b-white">
                    <div className="flex items-center">
                        <div>
                            <img
                                height={100}
                                width={100}
                                src={PAPERPANTRY}
                                alt="Without Background Logo"
                            />
                        </div>
                        <h1 className="text-xl ml-12 sm:ml-4 text-white">
                            Business headed <br/>by IITIANS
                        </h1>
                    </div>
                    {/* <div className="text-right items-center">
                        {
                            typeof window !== 'undefined' && localStorage.getItem("token")
                                ?
                                <button
                                    onClick={() => { localStorage.removeItem("token"); window.location.reload() }}
                                    className=" basicDarkButton p-2 py-2 mt-2"
                                    style={{ background: "var(--base-color)", color: "white" }}
                                >
                                    Logout
                                </button>
                                :
                                <a
                                    href="/auth/login"
                                    className=" basicDarkButton p-2 py-2 mt-2"
                                    style={{ background: "var(--base-color)", color: "white" }}
                                >Login</a>

                        }
                    </div> */}
                </div>
                <div className="hidden sm:block">{list()}</div>
            </div>
        );
    }

    return null;
};

export default Navbar;
