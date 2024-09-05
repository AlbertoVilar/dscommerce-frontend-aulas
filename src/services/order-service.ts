import {AxiosRequestConfig } from "axios";
import { requestBackEnd } from "../utils/request";

export function findByIdRequest(id: number) {
    const config: AxiosRequestConfig = {
        url: `/orders/${id}`,
        withCredentials: true
    }
    return requestBackEnd(config);
}