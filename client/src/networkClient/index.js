import Configuration from "../utils/Configurations";
import Cache from "../utils/Cache"

const fetcher = {
    async get(endpoint, config = { method: "GET" }) {
        try {
            const response = await fetch(Configuration.BASE_URL + endpoint, config)
            const json = response.json();
            return json;
        } catch (error) {
            return error;
        }
    },
    async post(endpoint, formdata, authToken = undefined) {
        try {
            const config = {
                method: "POST",
                body: formdata,
            }
            if(authToken){
                config["headers"] =  {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "authorization": authToken
                }
            }
            const response = await fetch(Configuration.BASE_URL + endpoint, config)
            const json = response.json();
            return json;
        } catch (error) {
            return error;
        }
    }
}
export default fetcher;