/* eslint-disable @typescript-eslint/ban-types */
import axios, { AxiosRequestConfig } from "axios";
import { requestBackEnd } from "../utils/request";


export function findPageRequst(page: number, name: string, size = 12, sort = "name") {

    const config: AxiosRequestConfig = {

        method: "GET",
        url: "/products",
            params : {
                page: page,
                name: name,
                size: size,
                sort: sort
            }
    }

    return requestBackEnd(config);
}


export function findById(id: Number) {
    return requestBackEnd({url: `/products/${id}`});
    
}
