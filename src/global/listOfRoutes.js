import React from "react"

const DetailedView = React.lazy(() => import("../pages/DetailedView"))

export const routesList = {
    dashboard: '/map',
    createJourney: "/createjourney",
    detailedView:"/detailedview",
}

const MainRouteList = [
    { path: routesList.detailedView, exact: true, element: DetailedView },
    // { path: routesList.pageNotFound, element: PageNotFound, roles: [] }
]
export default MainRouteList