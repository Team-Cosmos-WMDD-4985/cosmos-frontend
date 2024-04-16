import axios from "axios"
import secoreStoreService from "./secureStore";

// Live url
// const url = "https://my-guru.ca/api";
const url = "https://5059-2001-569-52f6-b300-2504-1f36-1123-6bed.ngrok-free.app"
export default async function useApi(type, endpoint, tokenRequired = true , params = {}, body = {}, headers = {}) {

    console.log("Type ", type)
    console.log("endpoint ", endpoint)
    console.log("params ", params)
    console.log("body ", body);
    if(tokenRequired) {
        const myToken = await secoreStoreService.getValueFor('token');
        headers["authorization"] = myToken
    }
    const options = {
        method: type,
        url: `${url}/${endpoint}`,
        data : body,
        headers: {
            ...headers
        },
        params : {
            ...params
        }
    };

    try {
        const response = await axios.request(options);
        return response;

    } catch (err) {
        console.log(JSON.stringify(err))
        console.log("Error message:", err.message);
        console.log("Error response:", err.response.data);
        return {
            success: false
        }
    } finally {

    }
}