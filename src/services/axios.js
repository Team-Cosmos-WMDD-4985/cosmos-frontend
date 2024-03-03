import axios from "axios"
import secoreStoreService from "./secureStore";

export default async function useApi(type, endpoint, tokenRequired = true , params = {}, body = {} ) {

    console.log("Type ", type)
    console.log("endpoint ", endpoint)
    console.log("params ", params)
    console.log("body ", body);

    let headers = {};
    if(tokenRequired) {
        const myToken = secoreStoreService.getValueFor('token');
        headers = {
            "token" : myToken
        }
    }
    const options = {
        method: type,
        url: `https://cosmos-backend-6bue.onrender.com/${endpoint}`,
        data : body,
        headers: {
            ...headers
        }
    };

    try {
        const response = await axios.request(options);
        return response;

    } catch (err) {
        // console.log(err)
        console.log("Error message:", err.message); // Log error message for debugging
        console.log("Error response:", err.response.data); // Log error response for debugging
    } finally {

    }
}