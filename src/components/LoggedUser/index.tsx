import { Link } from "react-router-dom";
import * as authService from "../../services/auth-servise"
import { useContext } from "react";
import { ContextToken } from "../../utils/contex-token";

export default function LoggedUser() {

    const { contextTokenPayload, setContextTokenPayload } = useContext(ContextToken)

    function hendleLogOutClick() {

        authService.logOut()
        setContextTokenPayload(undefined);
    }

    return (
        contextTokenPayload && authService.isAuthenticated()
            ? (
                <div className="dsc-logged-user">
                    <p>{contextTokenPayload.user_name}</p>
                    <span onClick={hendleLogOutClick}>Sair</span>
                </div>
            )
            : (
                <Link to='/login'>
                     Entrar
                 </Link>
            )

    );
}