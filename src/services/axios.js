import axios from "axios"
import secoreStoreService from "./secureStore";

// const url = "https://60bb-207-35-73-116.ngrok-free.app";
const url = "https://cosmos-backend-6bue.onrender.com"
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
        }
    };

    try {
        console.log(options);
        const response = await axios.request(options);
        return response;

    } catch (err) {
        console.log(JSON.stringify(err))
        console.log("Error message:", err.message); // Log error message for debugging
        console.log("Error response:", err.response.data); // Log error response for debugging
        return {
            success: false
        }
    } finally {

    }
}