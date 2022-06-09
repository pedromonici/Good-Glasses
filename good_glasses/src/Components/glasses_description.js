import "../index.css";
import { Link } from "react-router-dom";
import GlassesImg from "../oculos.jpeg";

function GlassesDescription(props) {
	return (
		<div className=" flex-box flex-box-wrap">
			<img src={GlassesImg} className="img-oculos"/>
		  		<div className="info-oculos">
					<h1> Algum Óculos </h1>
					<h3> Alguma marca </h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur
						adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua.
						Ut enim ad minim veniam, quis nostrud exercitation
						ullamco laboris nisi ut aliquip ex ea commodo consequat.
						Duis aute irure dolor in reprehenderit in voluptate
						velit esse cillum dolore eu fugiat nulla pariatur.
						Excepteur sint occaecat cupidatat non proident, sunt
						in culpa qui officia deserunt mollit anim id est laborum.
					</p>
		  		</div>
			<div className="pagamento">
				<h2>Vendidos:   15</h2>
				<h2>Em estoque: 03</h2>
				<h1>R$30,00</h1>
				<button className="pink-background"> Adicionar ao carrinho </button>
		  	</div>
		</div>
	);
};

export default GlassesDescription;