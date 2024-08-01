/* eslint-disable @typescript-eslint/ban-types */
import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../utils/system";


export function findPageRequst(page: number, name: string, size = 12, sort = "name") {

    const config: AxiosRequestConfig = {

        method: "GET",
        baseURL: BASE_URL,
        url: "/products",
            params : {
                page: page,
                name: name,
                size: size,
                sort: sort
            }
    }

    return axios(config);
}


export function findById(id: Number) {
    return axios.get(`${BASE_URL}/products/${id}`);
}
