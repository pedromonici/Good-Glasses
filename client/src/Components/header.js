import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import IconButton from './icon_button'

function NavigationMenu ({loggedIn, isAdmin}) {
	const navigate = useNavigate();
	return (
		<div id="header-icons" className="flex-box">
			{loggedIn.length === 0 &&
				<IconButton icon="tabler:user-circle" hoverClass='green-hover' callback={() => navigate("/login")}/>
			}
			{loggedIn.length !== 0 && !isAdmin &&
				<IconButton icon="tabler:user-circle" hoverClass='green-hover' callback={() => navigate("/update_info")}/>
			}
			{loggedIn.length !== 0 && isAdmin &&
				<IconButton icon="tabler:user-circle" hoverClass='green-hover' callback={() => navigate("/admin_page")}/>
			}
			<IconButton icon="tabler:shopping-cart" hoverClass='green-hover' callback={() => navigate("/cart")}/>
		</div>
	)
}

function Header({loggedIn, isAdmin}) {
	const navigate = useNavigate();
	return (
		<header className="banner">
			<div onClick={() => navigate("/")}>
				<h1 className="logo">GoodGlassesGG</h1>
			</div>
			<NavigationMenu loggedIn={loggedIn} isAdmin={isAdmin}/>
		</header>
	);
};

export default Header;