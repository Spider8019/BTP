import axios from "axios"
import { defaults } from "./defaultValues"

const callApiAndReturnDataGet = async (DATA, URL) => {
    const response = await axios({
        method: "GET",
        url: defaults.baseBackendUrl + URL,
        params: DATA,
        headers: {
            Authorization: `Token ${typeof window !== 'undefined' && localStorage.getItem("token")}`
        }
    })
    console.log(response)
    if (response.status === 200)
        return response.data
    else {
        return { error: "Unable To Fetch" }
    }
}

const callApiAndReturnDataPost = async (DATA, URL) => {
    const response = await axios({
        method: "POST",
        url: defaults.baseBackendUrl + URL,
        data: DATA,
        headers: {
            Authorization: `Token ${typeof window !== 'undefined' && localStorage.getItem("token")}`
        }
    })
    if (response.status === 200)
        return response.data
    else {
        return { error: response }
    }
}
const callApiAndReturnDataPostLogin = async (DATA, URL) => {
    const response = await axios({
        method: "POST",
        url: defaults.baseBackendUrl + URL,
        data: DATA,
    })
    if (response.status === 200)
        return response.data
    else {
        return { error: "Unable To Fetch" }
    }
}
// const callApiAndReturnDataPut = async (DATA, URL) => {
//     const response = await axios({
//         method: "PUT",
//         url: defaults.baseUrl + "/api/" + URL,
//         data: DATA
//     })

//     return response
// }
// const callApiAndReturnDataDelete = async (DATA, URL) => {
//     const response = await axios({
//         method: "DELETE",
//         url: defaults.baseUrl + "/api/" + URL,
//         data: DATA
//     })

//     return response
// }

// export const getProfile = (obj) => callApiAndReturnDataGet(obj,"profile")export const signupProfile = (obj) => callApiAndReturnDataPost(obj, "must/signup/")

export const fetchingAllLiveJourney = (obj) => callApiAndReturnDataPost(obj, "/mapper/live_journeys/")
export const loginProfile = (obj) => callApiAndReturnDataPostLogin(obj, "/login/login/")
export const createJourney = (obj) => callApiAndReturnDataPost(obj, "/mapper/new_journey/")
export const availableObjects = (obj) => callApiAndReturnDataGet(obj, '/mapper/new_journey/')
export const createUser = (obj) => callApiAndReturnDataPost(obj, "/login/register/")
export const detailedView = (obj) => callApiAndReturnDataPost(obj, '/mapper/journey_by_id/')