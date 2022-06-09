import "../index.css";
import { Link } from "react-router-dom";

function UpdateInfo(props) {
	return (
		<div>
			<h1>
				Olá, &lt;Usu&aacute;rio&gt;
			</h1>
			<form>
				<label htmlFor="nome">Nome:</label>
				<input id="nome" type="text"/>

				<label htmlFor="CPF">CPF:</label>
				<input id="CPF" type="text"/>

				<label htmlFor="email">Email:</label>
				<input id="email" type="email"/>

				<label htmlFor="endereco">Endereço:</label>
				<input id="endereco" type="text"/>

				<label htmlFor="telefone">Telefone:</label>
				<input id="telefone" type="tel"/>

				<input type="submit" value="Atualizar Cadastro" className="pink-background"/>
			</form>
		</div>
	);
};

export default UpdateInfo;