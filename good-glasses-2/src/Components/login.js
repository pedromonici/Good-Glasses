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

		if (cpf.value === "12345678910" && password.value === "administrador") {
			props.setLoggedIn(cpf.value);
			props.setIsAdmin(true);
			navigate(-1);
			return;
		}

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
				<TextInput id="cpf" label="CPF" state={cpf} onChange={handleCPFChange}/>
				<TextInput id="senha" label="Senha" state={password} onChange={handlePasswordChange}/>
				<input type="submit" value="Entrar" className="pink-background"/>
			</form>
			<div>
				Não tem cadastro? Crie uma <Link to="/signup">nova conta</Link>.
			</div>
		</div>
	);
};

const TextInput = ({id, label, state, onChange}) => {
	return (
		<div className="margin-v-25">
			<label htmlFor={id}> {`${label}:`} </label>
			<input id={id} type="text" value={state.value} onChange={onChange}/>
			<div className={!state.status ? "erro" : "hidden"}> {state.error} </div>
		</div>
	)
}

export default Login;