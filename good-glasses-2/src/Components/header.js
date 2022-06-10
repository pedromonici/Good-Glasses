import "../index.css";
import { Link } from "react-router-dom";
import LogoImg from "../logo_gg.png";


function Header(props) {
	return (
		<header>
			<div className="header dark-gray-background left flex-box">
				<Link to="/" className="logo"><img src={LogoImg} className="img-logo"/> </Link>
				<div className="flex-box right navigation-menu">
					<Link to="/recomendations" className="navigation-link pink-text"> RECOMENDAÇÕES </Link>
					<Link to="/cart" className="navigation-link pink-text"> CARRINHO </Link>
					{props.loggedIn.length === 0 &&
						<Link to="/login" className="navigation-link pink-text"> LOGIN </Link>
					}
					{props.loggedIn.length !== 0 &&
						<Link to="/update_info" className="navigation-link pink-text"> USER </Link>
					}
				</div>
			</div>
		</header>
	);
};

export default Header;