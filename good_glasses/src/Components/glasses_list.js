import "../index.css";
import { Link } from "react-router-dom";
import GlassesImg from "../oculos.jpeg";

function Glasses(props) {
	return (
		<div>
			<Link className="grid-item block-link light-gray-background" to={`/oculos/${props.id}`}>
				<div className="margin-v-25">
					{props.name}<br />
					<div className="grid-item-img-wrapper">
						<img src={props.img}/>
					</div>
					<br/>{`Preço: R$${props.cost}`}
				</div>
			</Link>
		</div>
	);
}

function GlassesList(props) {
	const items = Array.from({length: 12}, (_, i) => i).map((elem) => {
		return <Glasses name={"Algum óculos"} cost={"300.00"} img={GlassesImg} key={elem} id={elem}/>
	});
	return (
		<div className="grid">
			{items}
		</div>
	);
};

export default GlassesList;