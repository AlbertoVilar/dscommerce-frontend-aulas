import ButtonInverse from '../../components/ButtonInverse';
import ButtonPrimary from '../../components/ButtonPrimary';
import HeaderClient from '../../components/HeaderClient';
import ProductDetailsCard from '../../components/ProductDetailsCard';
import { ProductDTO } from '../../models/product';
import './styles.css'

const product: ProductDTO = {
  id: 2,
  name: 'Smar tv',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit Quisquam explicabo fugit beatae error ex odit, voluptates debitis.',
  imgUrl: 'https://github.com/devsuperior/dscatalog-resources/blob/master/backend/img/2-big.jpg?raw=true',
  price: 2500.99,
  categories: [
    {
      id: 2,
      name: 'Eletrônicos'
    },

    {
      id: 3,
      name: 'Computadores'
    }
  ]
};
export default function ProductDetails(){
    return(
        <>
        <HeaderClient />
      
      <main>
        <section id="product-details-section" className="dsc-container">
        <ProductDetailsCard product= {product} />
          <div className="dsc-btn-page-container">
              <ButtonPrimary />
             <ButtonInverse />
          </div>
        </section>
      </main>
      </>
    );
}