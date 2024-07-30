import { OrderDTO, OrderItemDTO } from "../models/order";
import { CART_KEY } from "../utils/system";



export function save(cart: OrderDTO) {

    const str = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, str)


}

export function get(): OrderDTO {
    // Obtém a string JSON do localStorage ou define um valor padrão
    const str = localStorage.getItem(CART_KEY) || '{"items": []}';

    // Analisa a string JSON para um objeto simples
    const parsedData = JSON.parse(str);

    // Instancia a classe OrderDTO com os dados recuperados
    const cart = new OrderDTO();
    cart.items = parsedData.items.map((item: any) => {
        // Cria instâncias de OrderItemDTO para cada item no carrinho
        return new OrderItemDTO(
            item.productId,
            item.quantity,
            item.name,
            item.price,
            item.imgUrl
        );
    });

    return cart;
}

export function clear() {
    localStorage.setItem(CART_KEY, '{"items": []}');
}
