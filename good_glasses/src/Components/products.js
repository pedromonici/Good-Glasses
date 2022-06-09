import "../index.css";
import { Link, useLocation } from "react-router-dom";
import GlassesList from "./glasses_list";

function Products(props) {
	const location = useLocation();
	const category = new URLSearchParams(location.search).get("categoria");
	return (
		<div className="flex-box">
			<div className="categorias side-menu">
				<h3 className="black-border vertical-padding-10 margin-r-10"> Categorias </h3>

				<div className="vertical-padding-10">
					<Link to="./?categoria=redondo" className={`category-link black-text ${category === "redondo" ? "category-bold" : ""}`}> Óculos Redondo </Link>	
				</div>

				<div className="vertical-padding-10">
					<Link to="./?categoria=retangular" className={`category-link black-text ${category === "retangular" ? "category-bold" : ""}`}> Óculos Retangular </Link>
				</div>

				<div className="vertical-padding-10">
					<Link to="./?categoria=hexagonal" className={`category-link black-text ${category === "hexagonal" ? "category-bold" : ""}`}> Óculos Hexagonal </Link>
				</div>

				<div className="vertical-padding-10">
					<Link to="./?categoria=escuro" className={`category-link black-text ${category === "escuro" ? "category-bold" : ""}`}> Óculos Escuros </Link>
				</div>

				<div className="vertical-padding-10">
					<Link to="./?categoria=lente" className={`category-link black-text ${category === "lente" ? "category-bold" : ""}`}> Lentes de Contato </Link>
				</div>
			</div>
			<GlassesList/>
		</div>
	);
};

export default Products;