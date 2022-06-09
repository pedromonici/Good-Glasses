import "../index.css";
import { Link } from "react-router-dom";


function Header(props) {
	return (
		<div>
			<header>
				<div className="header dark-gray-background left flex-box">
					<div className="logo pink-background">Good Glasses <br/> GG </div>
					<div className="flex-box right navigation-menu">
						<Link to="/cart" className="navigation-link pink-text"> CARRINHO </Link>
						<Link to="/login" className="navigation-link pink-text"> LOGIN </Link>
					</div>
				</div>
			</header>
			<div className="black-border pink-background second-navigation-bar">
				<div className="second-navigation-menu flex-box">
					<Link to="/" className="second-navigation-link black-text"> Home </Link>
					<Link to="/products" className="second-navigation-link black-text"> Produtos </Link>
					<Link to="/recomendations" className="second-navigation-link black-text"> Recomendações </Link>
				</div>
			</div>
		</div>
	);
};

export default Header;