import "../index.css";
import { Link } from "react-router-dom";

function SignUp(props) {
	return (
		<div>
			<h1> Criação de Conta </h1>
			<form>
				<label htmlFor="nome"> Nome: </label>
				<input id="nome" type="text"/>

				<label htmlFor="email"> Email: </label>
				<input id="email" type="email"/>

				<label htmlFor="email"> Confirmar Email: </label>
				<input id="email" type="email"/>

				<label htmlFor="senha"> Senha: </label>
				<input id="senha" type="text"/>

				<label htmlFor="senha"> Confirmar Senha: </label>
				<input id="senha" type="text"/>

				<label htmlFor="CPF"> CPF: </label>
				<input id="cpf" type="text"/>

				<label htmlFor="endereco"> Endereço: </label>
				<input id="endereco" type="text"/>

				<label htmlFor="telefone"> Telefone: </label>
				<input id="telefone" type="tel"/>

				<input type="submit" value="Criar Conta" className="pink-background"/>
			</form>
		</div>
	);
};

export default SignUp;