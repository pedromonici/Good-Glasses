import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import mockAPI from  "../API_middlewares/mock";
import {ValidatedInput} from "./validated_input";

function Login(props) {
	const [cpf, setCPF] = useState({status: "valid", value: "12345678910", error: ""});
	const [password, setPassword] = useState({status: "valid", value: "administrador", error: ""});
	const navigate = useNavigate();

	function validCPF(cpf) {
		var re = /^[0-9]{11}$/;
		return re.test(cpf);
	};

	function handleCpf(event) {
		if (event.target.value === "") {
			setCPF({status: "empty", value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}

		if (validCPF(event.target.value)) {
			setCPF({status: "valid", value: event.target.value, error: ""});
		} else {
			setCPF({status: "invalid", value: event.target.value, error: "CPF inválido!"});
		}
	};

	function handlePassword(event) {
		if (event.target.value === "") {
			setPassword({status: "empty", value: event.target.value, error: "Campo Obrigatório"});
			return;
		}
		if (event.target.value.length < 8) {
			setPassword({status: "invalid", value: event.target.value, error: "Senha precisa ter mais que 8 caracteres!"});
		} else {
			setPassword({status: "valid", value: event.target.value, error: ""});
		}
	};

	const authUser = useCallback(async (event) => {
		event.preventDefault();
		const notValid = !cpf.status || !password.status; 		
		if (notValid) return;

		if (cpf.value === "12345678910" && password.value === "administrador") {
			props.setLoggedIn(cpf.value);
			props.setIsAdmin(true);
			navigate(-1);
			return;
		}

		try {
			let resp = (await fetch(`http://localhost:3001/login/${cpf.value}`)).ok
			console.log("get resp: ", resp)
			props.setLoggedIn(cpf.value);
			navigate(-1);
		} catch (exception) {
			alert("CPF e/ou senha inválido(s)", exception);
		}
		// try {
		// 	await mockAPI.authUser(cpf.value, password.value);
		// 	props.setLoggedIn(cpf.value);
		// 	navigate(-1);
		// } catch (exception) {
		// 	alert("CPF e/ou senha inválido(s)");
		// }
	});

	return (
		<div>
			<h1>
			Login
			</h1>
			<form id="login-form" onSubmit={authUser}>
				<ValidatedInput type="text" id="cpf" label="CPF" state={cpf} onChange={handleCpf} isPass={false}/>
				<ValidatedInput type="password" id="senha" label="Senha" state={password} onChange={handlePassword} isPass={true}/>
				<div className="flex-box">
					<button onClick={() => navigate('/signup')}>Criar Conta</button>
					<button autoFocus="true" >Entrar</button>
				</div>
			</form>
		</div>
	);
};

export default Login;