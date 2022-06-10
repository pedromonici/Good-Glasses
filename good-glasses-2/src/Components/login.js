import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import mockAPI from  "../API_middlewares/mock";

function Login(props) {
	const [cpf, setCPF] = useState({status: false, value: "", error: "Campo Obrigatório!"});
	const [password, setPassword] = useState({status: false, value: "", error: "Campo Obrigatório!"});
	const navigate = useNavigate();

	function validCPF(cpf) {
		var re = /^[0-9]{11}$/;
		return re.test(cpf);
	};

	function handleCPFChange(event) {
		if (event.target.value === "") {
			setCPF({status: false, value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		if (validCPF(event.target.value)) {
			setCPF({status: true, value: event.target.value, error: ""});
		} else {
			setCPF({status: false, value: event.target.value, error: "CPF inválido!"});
		}
	};
	function handlePasswordChange(event) {
		if (event.target.value === "") {
			setPassword({status: false, value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		if (event.target.value.length < 8) {
			setPassword({status: false, value: event.target.value, error: "Senha precisa ter mais que 8 caracteres!"});
		} else {
			setPassword({status: true, value: event.target.value, error: ""});
		}
	};

	const authUser = useCallback(async (event) => {
		event.preventDefault();
		const notValid = !cpf.status || !password.status; 		
		if (notValid) return;

		try {
			await mockAPI.authUser(cpf.value, password.value);
			props.setLoggedIn(cpf.value);
			navigate(-1);
		} catch (exception) {
			alert("CPF e/ou senha inválido(s)");
		}
	});

	return (
		<div>
			<h1>
			Login
			</h1>
			<form onSubmit={authUser}>
				<label htmlFor="CPF"> CPF: </label>
				<input id="cpf" type="text" value={cpf.value} onChange={handleCPFChange}/>
				<div className={!cpf.status ? "erro" : "hidden"}> {cpf.error} </div>

				<label htmlFor="senha"> Senha: </label>
				<input id="senha" type="password" value={password.value} onChange={handlePasswordChange}/>
				<div className={!password.status ? "erro" : "hidden"}> {password.error} </div>

				<input type="submit" value="Entrar" className="pink-background"/>
			</form>
			<div>
				Não tem cadastro? Crie uma <Link to="/signup">nova conta</Link>.
			</div>
		</div>
	);
};

export default Login;