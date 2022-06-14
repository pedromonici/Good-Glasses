import "../index.css";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import GlassesImg from "../oculos.jpeg";
import { useState } from "react";
import HorizontalGlassesPreview from "./glasses_preview";
import EditableList  from "./editable_list";

function CartEntry({glassesPreviewProps, qtt, onQttChange}) {
	return (
		<div className="cart-entry">
			<HorizontalGlassesPreview {...glassesPreviewProps}/>
			<div className="cart-entry-qtt">
				<input type="number" value={qtt} onChange={onQttChange} min="0"/>
			</div>
		</div>
	)
}

function Cart(props) {
	let cart = sessionStorage.getItem("cart");
	if (typeof cart !== "string") {
		cart = "{}";
	}
	cart = JSON.parse(cart);
	for (let key of Object.keys(cart)) {
		cart[key]["onQttChange"] = (event) => {
			const newObj = {...cart};
			newObj[key].qtt = parseInt(event.target.value);
			setCartEntryProps(newObj);
			sessionStorage.setItem("cart", JSON.stringify(newObj));
		}
		console.log(cart);
	}

	const [cartEntryProps, setCartEntryProps] = useState(cart);

	const removeCallback = (key) => {
		const newObj = {...cartEntryProps};
		delete newObj[key];
		setCartEntryProps(newObj);
		sessionStorage.setItem("cart", JSON.stringify(newObj));
	};

	const navigate = useNavigate();

	return (
		<>
			<div>
				<h1> Seu carrinho </h1>
				<hr/>
				<EditableList itemsProps={cartEntryProps} ItemsComponent={CartEntry} removeCallback={removeCallback}/>
				<div className="flex-box">
					<h3>
						Valor Total:
					</h3>
					<h3>
						{`R$${Object.values(cartEntryProps).reduce((acc, elem) => acc + elem.glassesPreviewProps.price * elem.qtt, 0).toFixed(2)}`}
					</h3>
				</div>
				{props.loggedIn.length !== 0 &&
					<button className="button" onClick={() => {navigate("/pay")}}> Finalizar Compra </button>
				}
				{props.loggedIn.length === 0 &&
					<button className="button" onClick={() => {navigate("/login")}}> Finalizar Compra </button>
				}
			</div>
		</>
	);
};

export default Cart;