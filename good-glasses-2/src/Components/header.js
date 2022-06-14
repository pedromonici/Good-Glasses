import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import { useState } from "react";

const CartButton = ({callback}) => {
    const [color, setColor] = useState("#3f30ca");
    return (
        <div className="icon" onClick={callback}>
            <div onMouseEnter={() => setColor("#94A7AE")} onMouseLeave={() => setColor("#3f30ca")}>
                <Icon icon="bx:cart" color={color} width="40" height="40"/>
            </div>
        </div> 
    )
}

function NavigationMenu ({loggedIn, isAdmin}) {
	const navigate = useNavigate();
	return (
		<div className="navigation-menu">
			{loggedIn.length === 0 &&
				<button onClick={() => navigate("/login")} className="nav-button"> Login </button>
			}
			{loggedIn.length !== 0 && !isAdmin &&
				<button onClick={() => navigate("/update_info")} className="nav-button"> Usuário </button>
			}
			{loggedIn.length !== 0 && isAdmin &&
				<button onClick={() => navigate("/admin_page")} className="nav-button"> Usuário </button>
			}
			<CartButton callback={() => navigate("/cart")}/>
		</div>
	)
}

function Header({loggedIn, isAdmin}) {
	const navigate = useNavigate();
	return (
		<header>
			<div className="header">
				<div className="logo" onClick={() => navigate("/")}>
					<h1>GoodGlassesGG</h1>
				</div>
				<NavigationMenu loggedIn={loggedIn} isAdmin={isAdmin}/>
			</div>
		</header>
	);
};

export default Header;