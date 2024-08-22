import "./styels.css"; // Corrigido o erro de digitação
import { useEffect, useState } from "react";
import { UserDTO } from "../../../models/user";
import * as userService from "../../../services/user-service";

export default function AdminHome() {

    const [user, setUser] = useState<UserDTO | null>(null); // Inicialmente o estado é null
    const [error, setError] = useState<string | null>(null); // Adiciona estado para erro

    useEffect(() => {
        userService.findMe()
            .then((response) => {
                setUser(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                // Captura e loga o erro
                console.error("Erro ao buscar usuário:", error);
                // Configura a mensagem de erro para ser exibida
                setError("Não foi possível carregar as informações do usuário.");
            });
    }, []);

    return (
        <main>
            <section id="admin-home-section" className="dsc-container">
                {error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    <h2 className="dsc-section-title dsc-mb20">
                        Bem-vindo à área administrativa {user ? user.name : "Carregando..."}
                    </h2>
                )}
            </section>
        </main>
    );
}
