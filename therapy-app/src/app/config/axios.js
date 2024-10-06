import axios from "axios";

// Config
export const API_URL = "https://graphql.contentful.com/content/v1/spaces/uat6f7x1hfzb/";
export const ACCESS_TOKEN = "Y0_YQRnnen3cku03OsDXB5cUElQlBYNAUmDshRxToVc";

// Creating an instance of axios
const $axios = axios.create({
    baseURL: `${API_URL}`,
     headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`
    },
});

const { get, post, put, delete: destroy } = $axios;
export { get, post, put, destroy };