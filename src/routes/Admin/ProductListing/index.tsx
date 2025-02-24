import "./styles.css"
import editIcon from "../../../assets/edit.svg"
import deleteIcon from "../../../assets/delete.svg"
import * as productService from "../../../services/product-service";
import { useEffect, useState } from "react"
import { ProductDTO } from "../../../models/product";
import SearchBar from "../../../components/SearchBar";

import ButtonNextPage from "../../../components/ButtonNextPage";
import DialogInfo from "../../../components/DialogInfo";
import DialogConfirmation from "../../../components/DialogConfirmation";
import ButtonInverse from "../../../components/ButtonInverse";
import { useNavigate } from "react-router-dom";

type QueryParams = {
    page: number;
    name: string;
};

export default function ProductListing() {

    const navigate = useNavigate();

    const [dialogInfoData, setDialogInfoData] = useState({
        visible: false,
        massage: "Operação com sucesso!"
    });

    const [dialogConfirmationData, setDialogConfirmationData] = useState({
        visible: false,
        id: 0,
        massage: "Tem certeza?"
    });

    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [isLastPage, setIsLastPage] = useState(false);
    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 0,
        name: ''
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productService.findPageRequst(queryParams.page, queryParams.name);
                const nextPage = response.data.content;

                // Verificar se há produtos e evitar a duplicação de IDs
                if (nextPage.length > 0) {
                    setProducts(prevProducts => [...prevProducts, ...nextPage]);
                    setIsLastPage(response.data.last);
                } else {
                    setIsLastPage(true);
                }
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        };

        fetchProducts();
    }, [queryParams]);

    function handleNewProductClick() {
        navigate("/admin/products/create")
    }

    function handleSearch(searchText: string) {
        setProducts([]);
        setQueryParams({...queryParams, page: 0, name: searchText });
    }

    function handleNextPageClick() {
        setQueryParams(prevParams => ({ ...prevParams, page: prevParams.page + 1 }));
    }

    function handleDialogInfoClose() {
        setDialogInfoData({ ...dialogInfoData, visible: false });
    }

    function handleUpdateClick(productId: number) {
        navigate(`/admin/products/${productId}`)
    }

    function handleDeleteClick(productId: number) {
        setDialogConfirmationData({ ...dialogConfirmationData, id: productId, visible: true });
    }

    function handleDialogConfirmationAnswer(answer: boolean, productId: number) {
        if (answer) {
            productService.deleteById(productId)
                .then(() => {
                    setProducts([]);
                    setQueryParams({...queryParams, page: 0 });
                })

                .catch(error => {
                    setDialogInfoData({
                        visible: true,
                        massage: error.response.data.error
                    })
                });
        }
        setDialogConfirmationData({ ...dialogConfirmationData, visible: false });
    }

    return (
        <main>
            <section id="product-listing-section" className="dsc-container">
                <h2 className="dsc-section-title dsc-mb20">Cadastro de produtos</h2>

                <div className="dsc-btn-page-container dsc-mb20">
                    <div onClick={handleNewProductClick}>
                        <ButtonInverse text="Novo"/>
                    </div>                    
                </div>

                <SearchBar onSearch={handleSearch} />

                <table className="dsc-table dsc-mb20 dsc-mt20">
                    <thead>
                        <tr>
                            <th className="dsc-tb576">ID</th>
                            <th></th>
                            <th className="dsc-tb768">Preço</th>
                            <th className="dsc-txt-left">Nome</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={`${product.id}-${index}`}>
                                <td className="dsc-tb576">{product.id}</td>
                                <td><img className="dsc-product-listing-image" src={product.imgUrl} alt={product.name} /></td>
                                <td className="dsc-tb768">R$ {product.price.toFixed(2)}</td>
                                <td className="dsc-txt-left">{product.name}</td>
                                <td><img onClick={() => handleUpdateClick(product.id)} className="dsc-product-listing-btn" src={editIcon} alt="Editar" /></td>
                                <td><img onClick={() => handleDeleteClick(product.id)} className="dsc-product-listing-btn" src={deleteIcon} alt="Deletar" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {!isLastPage && (
                    <div onClick={handleNextPageClick}>
                        <ButtonNextPage />
                    </div>
                )}
            </section>

            {
                dialogInfoData.visible &&
                <DialogInfo
                    message={dialogInfoData.massage}
                    onDialogClose={handleDialogInfoClose} />
            }

            {
                dialogConfirmationData.visible &&
                <DialogConfirmation
                    id={dialogConfirmationData.id}
                    message={dialogConfirmationData.massage}
                    onDialogAnswer={handleDialogConfirmationAnswer} />
            }

        </main>
    );
}