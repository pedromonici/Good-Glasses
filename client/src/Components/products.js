import "../index.css";
import { Link, useLocation } from "react-router-dom";
import GlassesList from "./glasses_list";

export const categories = new Set([
	"redondo",
	"retangular",
	"hexagonal",
	"escuro",
	"lente",
])

function Products(props) {
	const location = useLocation();
	const category = new URLSearchParams(location.search).get("categoria");
	const isRecommendation = new URLSearchParams(location.search).get("rec");
	return (
		<div id="product-content">
			<div className="categorias side-menu">
				<h3 className="black-border vertical-padding-10 margin-r-10"> Categorias </h3>

				<div className="vertical-padding-10">
					<Link to="./?categoria=redondo" className={`category-link black-text ${!isRecommendation && category === "redondo" ? "category-bold" : ""}`}> Óculos Redondo </Link>	
				</div>

				<div className="vertical-padding-10">
					<Link to="./?categoria=retangular" className={`category-link black-text ${!isRecommendation && category === "retangular" ? "category-bold" : ""}`}> Óculos Retangular </Link>
				</div>

				<div className="vertical-padding-10">
					<Link to="./?categoria=hexagonal" className={`category-link black-text ${!isRecommendation && category === "hexagonal" ? "category-bold" : ""}`}> Óculos Hexagonal </Link>
				</div>

				<div className="vertical-padding-10">
					<Link to="./?categoria=escuro" className={`category-link black-text ${!isRecommendation && category === "escuro" ? "category-bold" : ""}`}> Óculos Escuros </Link>
				</div>

				<div className="vertical-padding-10">
					<Link to="./?categoria=lente" className={`category-link black-text ${!isRecommendation && category === "lente" ? "category-bold" : ""}`}> Lentes de Contato </Link>
				</div>

				<br></br>
				<br></br>
				<h3 className="black-border vertical-padding-10 margin-r-10">Recomendar Óculos</h3>

				<div className="vertical-padding-10">
					<Link to="./?categoria=retangular&rec=true" className={`category-link black-text ${isRecommendation && category === "retangular" ? "category-bold" : ""}`}>Rosto Redondo</Link>	
				</div>
				<div className="vertical-padding-10">
					<Link to="./?categoria=redondo&rec=true" className={`category-link black-text ${isRecommendation && category === "redondo" ? "category-bold" : ""}`}>Rosto Quadrado</Link>	
				</div>
				<div className="vertical-padding-10">
					<Link to="./?categoria=hexagonal&rec=true" className={`category-link black-text ${isRecommendation && category === "hexagonal" ? "category-bold" : ""}`}>Rosto Oval</Link>	
				</div>
			</div>
			<GlassesList category={category}/>
		</div>
	);
};

export default Products;