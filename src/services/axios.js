import axios from "axios"
import secoreStoreService from "./secureStore";

// Live url
// const url = "https://ec2-54-70-7-254.us-west-2.compute.amazonaws.com/api"
// const url = "http://ec2-54-70-7-254.us-west-2.compute.amazonaws.com/api"
const url = "https://69cc-2001-569-52f6-b300-7d57-81fd-c314-c500.ngrok-free.app";
// const url = "https://cosmos-backend-6bue.onrender.com"
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