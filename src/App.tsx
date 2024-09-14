import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProductDetails from "./routes/ClientHome/ProductDetails";
import ClientHome from "./routes/ClientHome";
import Catalog from "./routes/ClientHome/Catalog";
import Cart from "./routes/ClientHome/Cart";
import { useEffect, useState } from "react";
import { ContextCartCount } from "./utils/context-cart";
import Login from "./routes/ClientHome/Login";

import AdminHome from "./routes/Admin/AdminHome";
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { history } from './utils/history';
import { PrivateRoute } from "./components/PrivateRoute/indes";
import { AccessTokenPayloadDTO } from "./models/auth";
import { ContextToken } from "./utils/contex-token";
import * as authService from "./services/auth-servise"
import * as cartService from "./services/cart-service"
import Confirmation from "./routes/ClientHome/Confimation";
import Admin from "./routes/Admin/admin";
import ProductListing from "./routes/Admin/ProductListing";
import ProductForm from "./routes/Admin/ProductForm";

function App() {
  // Estado para armazenar o número de itens no carrinho
  const [contextCartCount, setContextCartCount] = useState<number>(0);

  // Estado para armazenar o payload do token de autenticação
  const [contextTokenPayload, setContextTokenPayload] = useState<AccessTokenPayloadDTO>();

  // Efeito colateral que é executado após o componente ser montado
  useEffect(() => {
      // Atualiza o número de itens no carrinho
      setContextCartCount(cartService.getCart().items.length);

      // Verifica se o usuário está autenticado
      if (authService.isAuthenticated()) {
          // Obtém o payload do token de acesso e o define no estado
          const payload = authService.getAccessTokenPayload();
          setContextTokenPayload(payload);
      }
  }, []);  // O array vazio como dependência indica que o efeito é executado apenas uma vez, após a montagem do componente

  return (
    // Provedores de contexto que fornecem estado global para o aplicativo
    <ContextToken.Provider value={{ contextTokenPayload, setContextTokenPayload }}>
      <ContextCartCount.Provider value={{ contextCartCount, setContextCartCount }}>
        {/* Router histórico para controle avançado da navegação */}
        <HistoryRouter history={history}>
          {/* Configuração das rotas do aplicativo */}
          <Routes>
            {/* Roteamento para a parte do cliente do aplicativo */}
            <Route path="/" element={<ClientHome />}>
              <Route index element={<Catalog />} />  {/* Rota padrão para a página inicial */}
              <Route path="catalog" element={<Catalog />} />  {/* Rota para o catálogo */}
              <Route path="product-details/:productId" element={<ProductDetails />} />  {/* Rota para detalhes do produto */}
              <Route path="cart" element={<Cart />} />  {/* Rota para o carrinho */}
              <Route path="login" element={<Login />} />  {/* Rota para o login */}
              <Route path="confirmation/:orderId" element={<PrivateRoute><Confirmation /></PrivateRoute>} />  {/* Rota para confirmação de pedido, protegida por rota privada */}
            </Route>
  
            {/* Roteamento para a parte administrativa do aplicativo */}
            <Route path="/admin" element={<Admin />}>
              <Route index element={<PrivateRoute roles={['ROLE_ADMIN']}><AdminHome /></PrivateRoute>} />  {/* Rota padrão para a página inicial administrativa, protegida por rota privada */}
              <Route path="home" element={<AdminHome />} />  {/* Rota para a página inicial administrativa */}
              <Route path="products" element={<ProductListing />} />  {/* Rota para listar produtos */}
              <Route path="products/:productId" element={<ProductForm />} />  {/* Rota para o formulário de produto */}
            </Route>
  
            {/* Rota coringa para redirecionar qualquer caminho desconhecido para a página inicial */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </HistoryRouter>
      </ContextCartCount.Provider>
    </ContextToken.Provider>
  );

}

export default App;