import "./styeles.css"
import { useContext} from "react";
import cartIcon from "../../assets/cart.svg"
import { ContextCartCount } from "../../utils/context-cart";


export default function CartIcon() {

    const { contextCartCount } = useContext(ContextCartCount);

    return (
        <>
            <img src={cartIcon} alt="Carrinho de compras" />

            {   // Se o os itens do carrinho for maior que zero ele mostra o alerta (bolinha com numero)
                contextCartCount > 0 && 
                <div className="dsc-cart-count">{contextCartCount}</div>
            }
            
        </>


    );
}