import "./style.css";
import homeicon from "../../assets/home.svg"
import productsicon from "../../assets/products.svg"
import LoggedUser from "../LoggedUser";
import { NavLink } from "react-router-dom";


export default function HeaderAdmin() {
  return (
    <header className="dsc-header-admin">
      <nav className="dsc-container">
        <h1>DSC Admin</h1>
        <div className="dsc-navbar-right">
          <div className="dsc-menu-items-container">

            <NavLink
              to={"/admin/home"}
              className={({ isActive }) => isActive ? "dsc-menu-item-active" : ""}>
              <div className="dsc-menu-item">
                <img src={homeicon} alt="Início" />
                <p>Início</p>
              </div>
            </NavLink>

            <NavLink
              to={"/admin/products"}
              className={({ isActive }) => isActive ? "dsc-menu-item-active" : ""}>
              <div className="dsc-menu-item">
                <img src={productsicon} alt="Cadastro de produtos" />
                <p>Produtos</p>
              </div>
            </NavLink>

          </div>
          <LoggedUser />
        </div>
      </nav>
    </header>
  );
}
