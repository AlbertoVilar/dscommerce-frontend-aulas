import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";
import ButtonInverse from "../../../components/ButtonInverse";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ProductDetailsCard from "../../../components/ProductDetailsCard";
import * as productService from "../../../services/product-service";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductDTO } from "../../../models/product";


export default function ProductDetails() {
  const params = useParams();
  const [product, setProduct] =  useState<ProductDTO>();
  const navGate = useNavigate();

 useEffect(() => {

    productService.findById(Number(params.productId))
       .then(response => {
         setProduct(response.data)
        
       })
       .catch( () => {
          navGate("/");
       });

 },[])

  return (
    <main>
      <section id="product-details-section" className="dsc-container">
        {product && <ProductDetailsCard product={product} />}

        <div className="dsc-btn-page-container">
          <ButtonPrimary text="Comprar" />
          <Link to="/">
            <ButtonInverse text="Início" />
          </Link>
        </div>
      </section>
    </main>
  );
}
