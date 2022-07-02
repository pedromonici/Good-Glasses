import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const recommendations = ["retangular", "redondo", "hexagonal"];

function Recomendations(props) {
	const [values, setValues] = useState();

	const navigate = useNavigate();
	const recommend = (event) => {
		event.preventDefault();
		let i = 0;
		for (let value of values) {
			if (value) {
				navigate(`/?categoria=${recommendations[i]}`);
				return;
			}
			i++;
		}
		alert("Falha ao recomendar um óculos");
	}

	return (
		<div>
			<h2> Descubra o melhor óculos para você! </h2>
			<form onSubmit={recommend}>
				<h3> Seu rosto é de qual tipo? </h3>
				<input type="radio" id="html" name="tipo_rosto" value="HTML" onChange={() => setValues([true, false, false])}/>
				<label htmlFor="html">Redondo</label>

				<input type="radio" id="html" name="tipo_rosto" value="HTML" onChange={() => setValues([false, true, false])}/>
				<label htmlFor="html">Quadrado</label>

				<input type="radio" id="html" name="tipo_rosto" value="HTML" onChange={() => setValues([false, false, true])}/>
				<label htmlFor="html">Oval</label>
				<button>Recomendar Óculos</button>
			</form>
		</div>
	);
};

export default Recomendations;