import { OrderDTO } from "../models/order";
import * as cartRepository from "../localstorage/cart-repository" 


export function seveCart(cart : OrderDTO) {
    cartRepository.save(cart);
}