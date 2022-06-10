import "../index.css";
import { Link } from "react-router-dom";

function Pay(props) {
	return (
		<div>
			<h1> Pagamento </h1>
			<form>
				<label htmlFor="CPF"> CPF: </label>
				<input id="cpf" type="text"/>

				<label htmlFor="nroCartao"> Número do Cartão: </label>
				<input id="nroCartao" type="text"/>

				<label htmlFor="codSeg"> Código de Segurança: </label>
				<input id="codSeg" type="text"/>

				<label htmlFor="endereco"> Endereço: </label>
				<input id="endereco" type="text"/>

				<div> {`Valor Total: R$${props.value}`} </div>

				<input type="submit" value="Comprar" className="pink-background"/>
			</form>
		</div>
	);
};

export default Pay;