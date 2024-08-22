import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "./system";
import * as authService from "../services/auth-servise"

export function requestBackEnd(config: AxiosRequestConfig) {

    const headers = config.withCredentials
        ? {
            ...config.headers,
            Authorization: "Bearer " + authService.getAccessToken()
        }
        : config.headers;


    return (
        axios({ ...config, baseURL: BASE_URL, headers })
    );
}