import React from "react"

const AccessGIS = React.lazy(() => import("../pages/AccessGIS"))
const CreateJourney = React.lazy(() => import("../pages/CreateJourney"))
const AllList = React.lazy(() => import("../pages/AllList"))
const DetailedView = React.lazy(() => import("../pages/DetailedView"))
const CreateUser = React.lazy(() => import("../pages/CreateUser"))

export const routesList = {
    dashboard: '/map',
    createJourney: "/createjourney",
    alllist:'/alllist',
    detailedView:"/detailedview",
    createUser:"/createuser"
}

const MainRouteList = [
    { path: routesList.dashboard, exact: true, element: AccessGIS },
    { path: routesList.createJourney, exact: true, element: CreateJourney },
    { path: routesList.alllist, exact: true, element: AllList },
    { path: routesList.detailedView, exact: true, element: DetailedView },
    { path: routesList.createUser, exact: true, element: CreateUser },
    // { path: routesList.pageNotFound, element: PageNotFound, roles: [] }
]
export default MainRouteList