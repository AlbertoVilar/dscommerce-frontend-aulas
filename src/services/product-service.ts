/* eslint-disable @typescript-eslint/ban-types */
import axios, { AxiosRequestConfig } from "axios";
import { requestBackEnd } from "../utils/request";
import { ProductDTO } from "../models/product";


export function findPageRequst(page: number, name: string, size = 12, sort = "name") {

    const config: AxiosRequestConfig = {

        method: "GET",
        url: "/products",
        params: {
            page: page,
            name: name,
            size: size,
            sort: sort
        }
    }

    return requestBackEnd(config);
}


export function findById(id: Number) {
    return requestBackEnd({ url: `/products/${id}` });

}

export function deleteById(id: Number) {
    const config: AxiosRequestConfig = {
        method: "DELETE",
        url: `/products/${id}`,
        withCredentials: true
    }

    return requestBackEnd(config);
}


export function updateRequest(obj: ProductDTO) {
    const config: AxiosRequestConfig = {
        method: "PUT",
        url: `/products/${obj.id}`,
        withCredentials: true,
        data: obj
    }

    return requestBackEnd(config);
}

export function insertRequest(obj: ProductDTO) {
    const config: AxiosRequestConfig = {
        method: "POST", // Método POST para criar um novo produto
        url: "/products", // Endpoint para criação de produtos (sem ID)
        withCredentials: true, // Mantenha se precisar enviar credenciais
        data: obj // Dados do produto a ser criado
    };

    return requestBackEnd(config);
}

