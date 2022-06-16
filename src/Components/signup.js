import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import mockAPI from  "../API_middlewares/mock";
import { useCallback, useState } from "react";
import { TextInput, PassInput } from "./text_input";

function SignUp(props) {
	const [name, setName] = useState({status: false, value: "", error: "Campo Obrigatório!"});
	const [email, setEmail] = useState({status: false, value: "", error: "Campo Obrigatório!"});
	const [emailConfirmation, setEmailConfirmation] = useState({status: false, value: "", error: "Campo Obrigatório!"});
	const [password, setPassword] = useState({status: false, value: "", error: "Campo Obrigatório!"});
	const [passwordConfirmation, setPasswordConfirmation] = useState({status: false, value: "", error: "Campo Obrigatório!"});
	const [cpf, setCPF] = useState({status: false, value: "", error: "Campo Obrigatório!"});
	const [telefone, setTelefone] = useState({status: false, value: "", error: "Campo Obrigatório!"});
	const navigate = useNavigate();

	function validEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};
	function validCPF(cpf) {
		var re = /^[0-9]{11}$/;
		return re.test(cpf);
	};
	function validTelefone(telefone) {
		var re = /^[0-9]{11}$/;
		return re.test(telefone);
	};


	function handleNameChange(event) {
		if (event.target.value === "") {
			setName({status: false, value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		setName({status: true, value: event.target.value, error: ""});
	};
	function handleEmailChange(event) {
		if (event.target.value === "") {
			setEmail({status: false, value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		if (validEmail(event.target.value)) {
			setEmail({status: true, value: event.target.value, error: ""});
		} else {
			setEmail({status: false, value: event.target.value, error: "Email inválido!"});
		}
	};
	function handleEmailConfirmationChange(event) {
		if (event.target.value === "") {
			setEmailConfirmation({status: false, value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		if (event.target.value === email.value) {
			setEmailConfirmation({status: true, value: event.target.value, error: ""});
		} else {
			setEmailConfirmation({status: false, value: event.target.value, error: "Emails não correspondentes!"});
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
	function handlePasswordConfirmationChange(event) {
		if (event.target.value === "") {
			setPasswordConfirmation({status: false, value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		if (event.target.value === password.value) {
			setPasswordConfirmation({status: true, value: event.target.value, error: ""});
		} else {
			setPasswordConfirmation({status: false, value: event.target.value, error: "Senhas não correspondentes!"});
		}
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
	function handleTelefoneChange(event) {
		if (event.target.value === "") {
			setTelefone({status: false, value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		if (validTelefone(event.target.value)) {
			setTelefone({status: true, value: event.target.value, error: ""});
		} else {
			setTelefone({status: false, value: event.target.value, error: "Telefone inválido!"});
		}
	};

	const registerUser = useCallback(async (event) => {
		event.preventDefault();
		const notValid = !name.status || !email.status || !emailConfirmation.status || 
					  !password.status || !passwordConfirmation.status || !cpf.status ||
		              !telefone.status;			
		if (notValid) return;

		try {
			await mockAPI.registerUser({
				name: name.value,
				email: email.value,
				password: password.value,
				cpf: cpf.value,
				telefone: telefone.value
			});
			navigate("/login");
		} catch (exception) {
			alert(exception);
		}

	});

	return (
		<div>
			<h1> Criação de Conta </h1>
			<form onSubmit={registerUser}>
				<TextInput id="name" label="Nome" state={name} onChange={handleNameChange}/>
				<TextInput id="email" label="Email" state={email} onChange={handleEmailChange}/>
				<TextInput id="emailConfirmation" label="Confirmação de email" state={emailConfirmation} onChange={handleEmailConfirmationChange}/>
				<PassInput id="password" label="Senha" state={password} onChange={handlePasswordChange}/>
				<PassInput id="passwordConfirmation" label="Confirmação de senha" state={passwordConfirmation} onChange={handlePasswordConfirmationChange}/>
				<TextInput id="cpf" label="CPF" state={cpf} onChange={handleCPFChange}/>
				<TextInput id="telefone" label="Telefone" state={telefone} onChange={handleTelefoneChange}/>
				<input type="submit" value="Criar Conta" className="pink-background"/>
			</form>
		</div>
	);
};

export default SignUp;