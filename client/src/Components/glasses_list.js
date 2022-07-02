import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import GlassesImg from "../oculos.jpeg";
import { useEffect, useState, useCallback } from "react";
import mockAPI from "../API_middlewares/mock";
import glassImg from "../oculos.jpeg";

function Glasses(props) {
	const navigate = useNavigate();
	return (
		<div className="card">
			<figure>
				<img className="editable-list-img" src={GlassesImg} alt="glasses"/>
			</figure>
			<section className="details">
				<div className="min-details">
				<h1>
					{props.name}
					<span>{props.marca}</span>
				</h1>
				<h1 className="price">R${props.price.toFixed(2)}</h1>
				</div>

				<div className="flex-box vertical-flex">
					<button onClick={() => navigate(`/oculos/${props.name}`)}>Descrição</button>
				</div>
			</section>
		</div>
	);
}

function GlassesList(props) {
	const [glassesList, setGlassesList] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				// const glasses = await mockAPI.getProducts(props.category);
				let resp = await (await fetch(`http://localhost:3001/product/category/${props.category}`)).json();
				console.log("get resp for product by category: ", resp);

				setGlassesList(resp);
			} catch(exception) {
				alert("Erro ao selecionar produtos!");
			}
		})(); 
	}, [props.category]);

	const items = Object.values(glassesList).map((elem) => {
		return <Glasses name={elem.name} marca={elem.marca} price={elem.price} img={elem.img} key={elem.name} id={elem.name}/>
	});
	return (
		<div className="grid">
			{items}
		</div>
	);
};

export default GlassesList;