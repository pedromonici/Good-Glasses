import "../index.css";
import { Link } from "react-router-dom";

function Login(props) {
	return (
		<div>
			<h1>
			Login
			</h1>
			<form>
				<label htmlFor="email"> Email: </label>
				<input id="email" type="email"/>

				<label htmlFor="senha"> Senha: </label>
				<input id="senha" type="text"/>

				<input type="submit" value="Entrar" className="pink-background"/>
			</form>
			<div>
				Não tem cadastro? Crie uma <Link to="/signup">nova conta</Link>.
			</div>
		</div>
	);
};

export default Login;