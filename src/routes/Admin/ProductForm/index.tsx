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
        // Verifica se o componente está no modo de edição
        if (isEditing) {
            // Faz uma chamada ao serviço para buscar os dados do produto com o ID fornecido
            productService.findById(Number(params.productId))
                .then(response => {
                    // Quando a chamada é bem-sucedida, atualiza o estado do formulário com os dados do produto retornados
                    // 'forms.updateAll' parece ser uma função que atualiza o estado do formulário com os novos dados
                    setFormData(forms.updateAll(formData, response.data));
                })
                .catch(error => {
                    // Se ocorrer um erro durante a chamada ao serviço, exibe uma mensagem de erro no console
                    console.error("Error fetching product:", error);  // Adicione tratamento de erros
                });
        }
    }, [isEditing, params.productId]);  // Dependências do useEffect. O efeito será executado sempre que 'isEditing' ou 'params.productId' mudarem
    
    

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