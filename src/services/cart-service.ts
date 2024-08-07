import { OrderDTO, OrderItemDTO } from "../models/order";
import * as cartRepository from "../localstorage/cart-repository" 
import { ProductDTO } from "../models/product";
import Cart from "../routes/ClientHome/Cart";


export function saveCart(cart : OrderDTO) {
    cartRepository.save(cart);
}

export function getCart(): OrderDTO {
    return cartRepository.get();
}

export function addProduct(product : ProductDTO) {

    const cart = cartRepository.get();
    const item = cart.items.find( p => p.productId === product.id);

    if(!item) {
        const newItem = new OrderItemDTO(product.id, 1, product.name, product.price, product.imgUrl);
        cart.items.push(newItem);
        cartRepository.save(cart);
    }

}

export function clearCart() {
    cartRepository.clear()
}

export function increaseItem(productId: number) {
    const cart = cartRepository.get();
    const item = cart.items.find(prod => prod.productId === productId);

    if(item) { // Se encontrar o item, a quantidade será inclementada
        item.quantity++; 
        cartRepository.save(cart) // O Carrinho será atualizado
    }
}

export function decreaseItem(productId: number) {
    const cart = cartRepository.get();
    const item = cart.items.find(prod => prod.productId === productId);

    if(item) { // Se encontrar o item, a quantidade será inclementada
        
        item.quantity--
            if (item.quantity < 1)
                cart.items = cart.items.filter(p => p.productId !== productId)
        }
        
        cartRepository.save(cart) // O Carrinho será atualizado
    
}