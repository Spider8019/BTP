import React from "react"

const CreateJourney = React.lazy(() => import("../pages/CreateJourney"))
const DetailedView = React.lazy(() => import("../pages/DetailedView"))
const CreateUser = React.lazy(() => import("../pages/CreateUser"))

export const routesList = {
    dashboard: '/map',
    createJourney: "/createjourney",
    detailedView:"/detailedview",
    createUser:"/createuser"
}

const MainRouteList = [
    { path: routesList.createJourney, exact: true, element: CreateJourney },
    { path: routesList.detailedView, exact: true, element: DetailedView },
    { path: routesList.createUser, exact: true, element: CreateUser },
    // { path: routesList.pageNotFound, element: PageNotFound, roles: [] }
]
export default MainRouteList