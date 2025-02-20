import { AxiosRequestConfig } from "axios";
import { requestBackEnd } from "../utils/request";

export function findAllRequst() {

    const config: AxiosRequestConfig = {

        method: "GET",
        url: "/categories",
       
    }

    return requestBackEnd(config);
}