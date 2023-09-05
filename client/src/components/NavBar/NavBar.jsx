import "./NavBar.css";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";

export default function NavBar({ onSearch }) {
  return (
    <nav className="Nav">
      <div className="nav-container">
        <div className="logo-container">
          <Link to="/home">
            <img className="logo" src={Logo} alt="logo" />
          </Link>
        </div>

        <div className="sb">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
    </nav>
  );
}
