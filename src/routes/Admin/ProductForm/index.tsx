import "./styles.css"
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as forms from "../../../utils/forms"
import FormInput from "../../../components/FormInput";
import * as productService from "../../../services/product-service";
import * as categoryService from "../../../services/gategory-service";
import FormTextArea from "../../../components/FormTextArea";
import { CategoryDTO } from "../../../models/category";
import FormSelect from "../../../components/FormSelect";
import { selectStyles } from "../../../utils/select";

export default function ProductForm() {
    const params = useParams();
    const navigate = useNavigate();
    const productId = params.productId; // Certifique-se de usar `productId`
    const isEditing = productId !== 'create';
    const [categories, setCategories] = useState<CategoryDTO[]>([]);

    const [formData, setFormData] = useState<any>({
        name: {
            value: "",
            id: "name",
            name: "name",
            type: "text",
            placeholder: "Nome",
            validation: function (value: string) {
                return /^.{3,80}$/.test(value);
            },
            message: "Favor informar um nome de 3 a 80 caracteres",
        },
        price: {
            value: "",
            id: "price",
            name: "price", // Correção aqui
            type: "number",
            placeholder: "Preço",
            validation: function (value: number) {
                return value > 0;
            },
            message: "Informe um preço positivo",
        },
        imgUrl: {
            value: "",
            id: "imgUrl",
            name: "imgUrl",
            type: "text",
            placeholder: "Imagem",
        },
        description: {
            value: "",
            id: "description",
            name: "description",
            type: "text",
            placeholder: "Descrição",
            validation: function (value: string) {
                return /^.{10,}$/.test(value);
            },
            message: "A descrição deve conter no mínimo 10 caracteres",
        },

        categories: {
            value: [],
            id: "categories",
            name: "categories",
            placeholder: "Categorias",
            validation: function (value: CategoryDTO[]) {
                return value.length > 0;
            },
            message: "Escolha ao menos uma categoria"
        }
    });

    useEffect(() => {
        console.log(forms.toDirty(formData, "price"))
        // Verifica se o componente está no modo de edição
        if (isEditing) {
            productService.findById(Number(params.productId))
                .then(response => {
                    setFormData(forms.updateAll(formData, response.data));
                });
        }
    }, []);

    useEffect(() => {
        categoryService.findAllRequst()
            .then(response => {
                setCategories(response.data);
            })
    }, []);

    function handleInputChange(event: any) {
        const result = forms.updateAndValidate(formData, event.target.name, event.target.value);
        setFormData(result);
    }

    function handleTurnDirty(name: string) {
        const newFormData = forms.dirtyAndValidate(formData, name);
        setFormData(newFormData);
    }

    function handleSubmit(event: any) {
        event.preventDefault();
    
        // 1. Validar e marcar todos os campos como dirty
        const formDataValidated = forms.dirtyAndValidateAll(formData);
    
        // 2. Atualizar o estado com os dados validados
        setFormData(formDataValidated);
    
        // 3. Verificar se há erros no formulário validado
        if (forms.hasAnyInvalid(formDataValidated)) {
            console.log("O formulário contém erros. Corrija antes de enviar.");
            return; // Impede o envio se houver erros
        }
    
        // 4. Se não houver erros, prosseguir com o envio
        const requestBody = forms.toValues(formDataValidated);
    
        if (isEditing) {
            if (!params.productId) {
                console.error("ID do produto não encontrado. Verifique o parâmetro da URL.");
                return; // Impede o envio se o ID não estiver presente
            }
            requestBody.id = params.productId; // Adiciona o ID ao corpo da requisição
        }
    
        console.log("Formulário válido! Enviando dados...", requestBody);
    
        // Escolhe a requisição correta (POST ou PUT) com base no modo de edição
        const request = isEditing
            ? productService.updateRequest(requestBody)
            : productService.insertRequest(requestBody);
    
        request
            .then(() => {
                navigate("/admin/products"); // Navega para a lista de produtos após o sucesso
            })
            .catch((error) => {
                console.error("Erro ao enviar o formulário:", error);
                alert(`Ocorreu um erro ao ${isEditing ? "atualizar" : "inserir"} o produto. Tente novamente.`);
            });
    }git

    return (
        <main>
            <section id="product-form-section" className="dsc-container">
                <div className="dsc-product-form-container">
                    <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
                        <h2>Dados do produto</h2>
                        <div className="dsc-form-controls-container">
                            <div>
                                <FormInput
                                    {...formData.name}
                                    className="dsc-form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                                <div className="dsc-form-error">{formData.name.message}</div>
                            </div>
                            <div>
                                <FormInput
                                    {...formData.price}
                                    className="dsc-form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                                <div className="dsc-form-error">{formData.price.message}</div>
                            </div>
                            <div>
                                <FormInput
                                    {...formData.imgUrl}
                                    className="dsc-form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <FormSelect
                                    {...formData.categories}
                                    className="dsc-form-control dsc-form-select-container"
                                    styles={selectStyles}
                                    options={categories}
                                    onChange={(obj: any) => {
                                        const newFormData = forms.updateAndValidate(formData, "categories", obj);
                                        setFormData(newFormData);
                                    }}
                                    onTurnDirty={handleTurnDirty}
                                    isMulti
                                    getOptionLabel={(obj: any) => obj.name}
                                    getOptionValue={(obj: any) => String(obj.id)}
                                />
                                <div>
                                    <div className="dsc-form-error">{formData.categories.message}</div>
                                </div>
                            </div>
                            <div>
                                <FormTextArea
                                    {...formData.description}
                                    className="dsc-form-control dsc-textarea"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                                <div className="dsc-form-error">{formData.description.message}</div>
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
