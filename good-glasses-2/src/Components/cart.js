import "../index.css";
import { Link, useSearchParams } from "react-router-dom";
import GlassesImg from "../oculos.jpeg";
import { useEffect, useState } from "react";

function GlassesPreview(props) {
	const [qtt, setQtt] = useState(props.qtt);
	

	function removeFromCart(event) {
		const cart = {...props.cart};
		delete cart[props.id];
		props.setCart(cart);
	};

	function handleQttChange(event) {
		setQtt(event.target.value);
	}

	useEffect(() => {
		const cart = {...props.cart};
		cart[props.id] = qtt;
		props.setCart(cart);
	}, [qtt]);

	return (
		<div className="flex-box flex-box-wrap">
			<div className="list-item-img-wrapper">
				<img src={props.img}/>
			</div>
			<div className="v-middle">{props.name} </div>
			<div className="v-middle">{`Preço: R$${props.cost}`}</div>
			<input className="v-middle" type="number" value={props.qtt} onChange={handleQttChange} min="1"/>
			<button className="remove-cart" onClick={removeFromCart}> X </button>
		</div>
	);
}

function GlassesPreviewList(props) {
	let jsonCart = sessionStorage.getItem("cart");
	if (typeof jsonCart !== "string") {
		jsonCart = "{}";
	}
	const [cart, setCart] = useState({...JSON.parse(jsonCart)});

	useEffect(() => {
		sessionStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

	const items = Object.entries(cart).map((elem) => {
		return <GlassesPreview 
			name={`Algum óculos ${elem[0]}`} 
			cost={"300.00"} 
			img={GlassesImg} 
			key={elem[0]} 
			id={elem[0]} 
			qtt={elem[1]}
			cart={cart}
			setCart={setCart} 
		/>
	});

	return (
		<div className="list">
			{items}
		</div>
	);
};

function Cart(props) {
	const cart = sessionStorage.getItem("cart");
	return (
		<div>
			<h1> Seu carrinho: </h1>
			<GlassesPreviewList/>
			<div>{`Valor Total: R$${100}`}</div>
			{props.loggedIn.length !== 0 &&
				<Link to="/pay"> Finalizar Compra </Link>
			}
			{props.loggedIn.length === 0 &&
				<Link to="/login"> Finalizar Compra </Link>
			}
		</div>	
	);
};

export default Cart;