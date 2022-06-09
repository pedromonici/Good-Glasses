import "../index.css";
import { Link } from "react-router-dom";
import GlassesImg from "../oculos.jpeg";

function GlassesPreview(props) {
	return (
		<div className="flex-box flex-box-wrap">
			<div className="list-item-img-wrapper">
				<img src={props.img}/>
			</div>
			<div className="v-middle">{props.name}</div>
			<div className="v-middle">{`Preço: R$${props.cost}`}</div>
		</div>
	);
}

function GlassesPreviewList(props) {
	const items = Array.from({length: 12}, (_, i) => i).map((elem) => {
		return <GlassesPreview name={"Algum óculos"} cost={"300.00"} img={GlassesImg} key={elem} id={elem}/>
	});
	return (
		<div className="list">
			{items}
		</div>
	);
};

function Cart(props) {
	return (
		<div>
			<h1> Seu carrinho: </h1>
			<GlassesPreviewList/>
			<div>{`Valor Total: R$${100}`}</div>
			<Link to="/pay"> Finalizar Compra </Link>
		</div>	
	);
};

export default Cart;