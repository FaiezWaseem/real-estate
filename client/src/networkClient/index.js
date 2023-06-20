import Configuration from "../utils/Configurations";

export default function fetcher(body) {
    const response = await fetch(Configuration.BASE_URL ,body)
    const json = response.json();
    return json;
}