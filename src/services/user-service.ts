import { AxiosRequestConfig } from "axios";
import { requestBackEnd } from "../utils/request";

export function findMe() {


    const config: AxiosRequestConfig = {

        url: "/users/me",
        withCredentials: true

    }
    return requestBackEnd(config);

}
