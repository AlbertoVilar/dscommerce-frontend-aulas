import "./styles.css"
import { useEffect, useState } from "react"
import { OrderDTO } from "../../../models/order"
import { useParams } from "react-router-dom";
import * as orderService from "../../../services/order-service";
import { Link } from "react-router-dom";

export default function Confirmation() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<OrderDTO | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (orderId) {
      orderService.findByIdRequest(Number(orderId))
        .then(response => {
          setOrder(response.data);
        })
        .catch(err => {
          setError("Erro ao carregar os detalhes do pedido.");
          console.error(err);
        });
    }
  }, [orderId]);

  return (
    <main>
      <section id="confirmation-section" className="dsc-container">
        {error && <p className="dsc-error-message">{error}</p>}
        {order ? (
          <div className="dsc-card dsc-mb20">
            {order.items.map(item => (
              <div key={item.productId} className="dsc-cart-item-container dsc-line-bottom">
                <div className="dsc-cart-item-left">
                  <img src={item.imgUrl} alt={item.name} />
                  <div className="dsc-cart-item-description">
                    <h3>{item.name}</h3>
                    <div className="dsc-cart-item-quantity-container">
                      <p>{item.quantity}</p>
                    </div>
                  </div>
                </div>
                <div className="dsc-cart-item-right">
                  R$ {item.subTotal.toFixed(2)}
                </div>
              </div>
            ))}
            <div className="dsc-confirmation-message dsc-mb20">
              Pedido realizado! Número {order.id}
            </div>
            <div className="dsc-btn-page-container">

              <Link to={"/"}>
                <div className="dsc-btn dsc-btn-white">
                  Início
                </div>
              </Link>

            </div>
          </div>
        ) : (
          <p>Carregando...</p>
        )}
      </section>
    </main>
  );
}