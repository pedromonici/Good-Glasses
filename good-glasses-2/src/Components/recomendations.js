import "../index.css";
import { Link } from "react-router-dom";

function Recomendations(props) {
	return (
		<div>
			<h2> Descubra o melhor óculos para você! </h2>
			<form>
				<div>
					<h3> Seu rosto é de qual tipo? </h3>
					<input type="radio" id="html" name="tipo_rosto" value="HTML"/>
					<label htmlFor="html">Redondo</label>

					<input type="radio" id="html" name="tipo_rosto" value="HTML"/>
					<label htmlFor="html">Quadrado</label>

					<input type="radio" id="html" name="tipo_rosto" value="HTML"/>
					<label htmlFor="html">Oval</label>
				</div>

				<div>
					<h3> Qual a sua cor preferida? </h3>
					<input type="radio" id="html" name="cor_pref" value="HTML"/>
					<label htmlFor="html">Preto</label>

					<input type="radio" id="html" name="cor_pref" value="HTML"/>
					<label htmlFor="html">Branco</label>

					<input type="radio" id="html" name="cor_pref" value="HTML"/>
					<label htmlFor="html">Azul</label>

					<input type="radio" id="html" name="cor_pref" value="HTML"/>
					<label htmlFor="html">Vermelho</label>
				</div>

				<div>
					<h3> Óculos Escuro ou Normal? </h3>
					<input type="radio" id="html" name="grande_pequeno" value="HTML"/>
					<label htmlFor="html">Escuro</label>

					<input type="radio" id="html" name="grande_pequeno" value="HTML"/>
					<label htmlFor="html">Normal</label>
				</div>

				<input type="submit" value="Recomendar Óculos" className="pink-background"/>
			</form>
		</div>
	);
};

export default Recomendations;