import "../index.css";
import { Link } from "react-router-dom";
import GlassesImg from "../oculos.jpeg";
import { useEffect, useState, useCallback } from "react";
import mockAPI from "../API_middlewares/mock";
import glassImg from "../oculos.jpeg";

function Glasses(props) {
	return (
		<div>
			<Link className="grid-item block-link light-gray-background" to={`/oculos/${props.name}`}>
				<div className="margin-v-25">
					{`${props.name}`}<br />
					<div className="grid-item-img-wrapper">
						<img src={glassImg}/>
					</div>
					<br/>{`Preço: R$${props.price}`}
				</div>
			</Link>
		</div>
	);
}

function GlassesList(props) {
	const [glassesList, setGlassesList] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const glasses = await mockAPI.getProducts(props.category);
				setGlassesList(JSON.parse(glasses));
			} catch(exception) {
				alert("Erro ao selecionar produtos!");
			}
		})(); 
	}, [props.category]);

	const items = Object.values(glassesList).map((elem) => {
		return <Glasses name={elem.name} price={elem.price} img={elem.img} key={elem.name} id={elem.name}/>
	});
	return (
		<div className="grid">
			{items}
		</div>
	);
};

export default GlassesList;