import "../index.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import GlassesImg from "../oculos.jpeg";
import { useEffect, useState } from "react";
import mockAPI from  "../API_middlewares/mock";

function GlassesDescription(props) {
	const [glassesInfo, setGlassesInfo] = useState({});

	const glassesId = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				// const glasses = await mockAPI.getProduct(glassesId.id); 
				// setGlassesInfo(JSON.parse(glasses));
				const glasses = await (await fetch(`http://localhost:3001/product/name/${glassesId.id}`)).json();
				setGlassesInfo(glasses);
			} catch (exception) {
				alert(exception);
			}
		})();
	}, [])

	function addToCart(event) {
		let jsonCart = sessionStorage.getItem("cart");
		if (typeof jsonCart !== "string") {
			jsonCart = "{}";
		}
		const cart = {...JSON.parse(jsonCart)};
		if (cart[glassesId.id] !== undefined) {
			cart[glassesId.id].qtt++;
		} else {
			cart[glassesId.id] = {
				"glassesPreviewProps": {
					name: glassesInfo.name,
					price: glassesInfo.price,
					img: GlassesImg,
				}, 
				"qtt": 1
			}
		}
		sessionStorage.setItem("cart", JSON.stringify(cart));
		navigate("/");
	};

	return (
		<div className=" flex-box flex-box-wrap">
			<img src={GlassesImg} className="img-oculos-details"/>
		  		<div className="info-oculos">
					<h1 className="details-product-name"> {glassesInfo.name} </h1>
					<h3 className="details-product-marca"> {glassesInfo.marca} </h3>
					<p>
						{glassesInfo.description}
					</p>
		  		</div>
			<div className="pagamento">
				<h2>{`Vendidos:   ${glassesInfo.soldQtt}`}</h2>
				<h2>{`Em estoque: ${glassesInfo.availableQtt}`}</h2>
				<h1>{`Preço: R$${glassesInfo.price}`}</h1>
				<br/>
				<button className="button-details" onClick={addToCart}> Adicionar ao carrinho </button>
		  	</div>
		</div>
	);
};

export default GlassesDescription;