import Products from "./products";
import Recomendations from "./recomendations";
import {useLocation} from "react-router-dom"

function Home () {
	const location = useLocation();
	const category = new URLSearchParams(location.search).get("categoria");

	return (
		<div>
			<Products/>
		</div>
	);
}

export default Home;