import QueryString from "qs";
import { CredentialsDTO } from "../models/auth";
import { CLIENT_ID, CLIENT_SECRET, TOKEN_KEY } from "../utils/system";
import { AxiosRequestConfig } from "axios";
import { requestBackEnd } from "../utils/request";
import * as accessTokenRepository from "../localstorage/access-token-repository"

export function loginRequest(loginData: CredentialsDTO) {
    const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET),
    };

   
    const data = QueryString.stringify({
    ...loginData,
    grant_type: "password",
    });
    const config: AxiosRequestConfig = {
    method: "POST",
    url: "/oauth/token",
    data,
    headers,
    };
    return requestBackEnd(config);

   
    }

    export function logOut() {
        accessTokenRepository.remove();
    }

    export function saveAccessToken(token: string) {
        accessTokenRepository.seve(token)
    }

    export function getAccesToken() {
        accessTokenRepository.get();
    }


