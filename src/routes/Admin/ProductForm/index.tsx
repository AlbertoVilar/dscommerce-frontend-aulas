import "./styles.css"
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as forms from "../../../utils/forms"
import FormInput from "../../../components/FormInput";
import * as productService from "../../../services/product-service"

export default function ProductForm() {
    const params = useParams();
    const productId = params.productId; // Certifique-se de usar `productId`
    const isEditing = productId !== 'create';

    const [formData, setFormData] = useState<any>({
        name: {
            value: "",
            id: "name",
            name: "name",
            type: "text",
            placeholder: "Nome",
        },
        price: {
            value: "",
            id: "price",
            name: "price",
            type: "number",
            placeholder: "Preço",
        },
        imgUrl: {
            value: "",
            id: "imgUrl",
            name: "imgUrl",
            type: "text",
            placeholder: "Imagem",
        }
    });

    useEffect(() => {
        console.log("Params:", params);  // Verifique os parâmetros

        if (isEditing && productId) {
            const id = Number(productId);
            console.log("Product ID:", id);  // Verifique o ID do produto

            if (!isNaN(id)) {
                productService.findById(id)
                    .then(response => {
                        console.log("API Response:", response);  // Verifique a resposta da API
                        console.log("Product Data:", response.data);  // Verifique os dados do produto

                        const product = response.data;
                        setFormData({
                            name: {
                                ...formData.name,
                                value: product.name
                            },
                            price: {
                                ...formData.price,
                                value: product.price
                            },
                            imgUrl: {
                                ...formData.imgUrl,
                                value: product.imgUrl
                            }
                        });
                    })
                    .catch(error => {
                        console.error("Erro ao buscar o produto:", error.response?.data || error.message || error);
                    });
            } else {
                console.error("ID do produto inválido:", productId);
            }
        }
    }, [isEditing, productId]);  // Use `productId` como dependência

    function handleInputChange(event: any) {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(forms.update(formData, name, value));
    }

    return (
        <main>
            <section id="product-form-section" className="dsc-container">
                <div className="dsc-product-form-container">
                    <form className="dsc-card dsc-form">
                        <h2>Dados do produto</h2>
                        <div className="dsc-form-controls-container">
                            <div>
                                <FormInput
                                    {...formData.name}
                                    className="dsc-form-control"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <FormInput
                                    {...formData.price}
                                    className="dsc-form-control"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <FormInput
                                    {...formData.imgUrl}
                                    className="dsc-form-control"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="dsc-product-form-buttons">
                            <Link to={"/admin/products"}>
                                <button type="reset" className="dsc-btn dsc-btn-white">Cancelar</button>
                            </Link>
                            <button type="submit" className="dsc-btn dsc-btn-blue">Salvar</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}