import "../index.css";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import GlassesImg from "../oculos.jpeg";
import { useState } from "react";
import EditableList  from "./editable_list";
import IconButton from "./icon_button";

function CartEntry({glassesPreviewProps, qtt, handleQty, addOne, rmvOne, removeElement}) {
	return (
		<div className="editable-list-item">
			<div className="preview-img-wrapper">
				<img className="editable-list-img" src={GlassesImg}/>
			</div>
			<div>
				{`Nome: ${glassesPreviewProps.name}`}
				<br/> 
				{`Preço: R${glassesPreviewProps.price.toFixed(2)}`}
				<br/>
			</div>
            <div className="flex-box g-2">
                <div className="number-btns-div">
                    <IconButton icon="tabler:caret-up" hoverClass="green-hover" width={'3em'} height={'3em'} callback={addOne}/>
                    <input type="number" value={qtt} onChange={handleQty} min="0"/>
                    <IconButton icon="tabler:caret-down" hoverClass="red-hover" width={'3em'} height={'3em'} callback={rmvOne}/>
                </div>
			    <IconButton icon="tabler:trash" hoverClass="red-hover" callback={removeElement}/>
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

	const [cartEntries, setCartEntries] = useState(cart);

	for (let key of Object.keys(cartEntries)) {
		cartEntries[key]["handleQty"] = (event) => {
			const newObj = {...cartEntries};
			newObj[key].qtt = parseInt(event.target.value);
			sessionStorage.setItem("cart", JSON.stringify(newObj));
			setCartEntries(newObj);
		}
		cartEntries[key]["addOne"] = (event) => {
			const newObj = {...cartEntries};
			newObj[key].qtt += 1;
			sessionStorage.setItem("cart", JSON.stringify(newObj));
			setCartEntries(newObj);
		}
		cartEntries[key]["rmvOne"] = (event) => {
			const newObj = {...cartEntries};
			newObj[key].qtt = Math.max(0, newObj[key].qtt-1);
			sessionStorage.setItem("cart", JSON.stringify(newObj));
			setCartEntries(newObj);
		}
	}

	const removeCallback = (key) => {
		const newObj = {...cartEntries};
		delete newObj[key];
		sessionStorage.setItem("cart", JSON.stringify(newObj));
		setCartEntries(newObj);
	};

	const navigate = useNavigate();

	return (
		<>
			<div>
				<EditableList items={cartEntries} ItemsComponent={CartEntry} removeCallback={removeCallback}/>
				<div className="flex-box">
					<h3>
						{`Total: R$${Object.values(cartEntries).reduce((acc, elem) => acc + elem.glassesPreviewProps.price * elem.qtt, 0).toFixed(2)}`}
					</h3>
					<h3>
						{props.loggedIn.length !== 0 &&
							<button className="button" onClick={() => {navigate("/pay")}}> Finalizar Compra </button>
						}
						{props.loggedIn.length === 0 &&
							<button className="button" onClick={() => {navigate("/login")}}> Finalizar Compra </button>
						}
					</h3>
				</div>
			</div>
		</>
	);
};

export default Cart;
