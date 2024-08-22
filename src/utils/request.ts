import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { BASE_URL } from './system';
import * as authService from '../services/auth-servise'; // Corrigido o erro de digitação
import { createBrowserHistory } from 'history';

// Cria uma instância do histórico
export const history = createBrowserHistory();

// Configura interceptores globalmente
axios.interceptors.request.use(
    function (config: AxiosRequestConfig) {
        // Adiciona o header de autorização se for necessário
        if (config.withCredentials) {
            config.headers = {
                ...config.headers,
                Authorization: "Bearer " + authService.getAccessToken(),
            };
        }
        // Faça algo antes da requisição ser enviada
        return config;
    },
    function (error: AxiosError) {
        // Faça algo com o erro da requisição
        console.error("Erro na requisição:", error);
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (response) {
        // Faça algo com a resposta se o status for 2xx
        return response;
    },
    function (error: AxiosError) {
        // Faça algo com o erro da resposta
        if (error.response) {
            const status = error.response.status;
            if (status === 401) {
                // Redireciona para a página de login se não autorizado
                history.push("/login");
            } else if (status === 403) {
                // Redireciona para o catálogo se proibido
                history.push("/catalog");
            }
        }
        return Promise.reject(error);
    }
);

export function requestBackEnd(config: AxiosRequestConfig) {
    return axios({ ...config, baseURL: BASE_URL });
}
