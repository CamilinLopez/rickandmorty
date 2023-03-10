import { Link } from "react-router-dom";
import SearchBar from "../Search/SearchBar";


const Nav = ({ onSearch }) => {


    return (
        <nav className="header">
            <div className="buttons">
                <Link to="/home" className="NavHome">Home</Link>
                <Link to="/about" className="NavAbout">About</Link>
                <Link to="/Favoritos" className="NavFavoritos" >Favoritos</Link>
            </div>
            <SearchBar onSearch={onSearch} />
        </nav>
    )
}

export default Nav;