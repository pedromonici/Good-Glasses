import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import mockAPI from  "../API_middlewares/mock";
import { useCallback, useState } from "react";
import { ValidatedInput } from "./validated_input";

function SignUp(props) {
	const [name, setName] = useState({status: "empty", value: "", error: "Campo Obrigatório!"});
	const [email, setEmail] = useState({status: "empty", value: "", error: "Campo Obrigatório!"});
	const [emailConfirmation, setEmailConfirmation] = useState({status: "empty", value: "", error: "Campo Obrigatório!"});
	const [password, setPassword] = useState({status: "empty", value: "", error: "Campo Obrigatório!"});
	const [passwordConfirmation, setPasswordConfirmation] = useState({status: "empty", value: "", error: "Campo Obrigatório!"});
	const [cpf, setCPF] = useState({status: "empty", value: "", error: "Campo Obrigatório!"});
	const [telefone, setTelefone] = useState({status: "empty", value: "", error: "Campo Obrigatório!"});
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
			setName({status: "empty", value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		setName({status: "valid", value: event.target.value, error: ""});
	};
	function handleEmailChange(event) {
		if (event.target.value === "") {
			setEmail({status: "empty", value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		if (validEmail(event.target.value)) {
			setEmail({status: "valid", value: event.target.value, error: ""});
		} else {
			setEmail({status: "invalid", value: event.target.value, error: "Email inválido!"});
		}
	};
	function handleEmailConfirmationChange(event) {
		if (event.target.value === "") {
			setEmailConfirmation({status: "empty", value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		if (event.target.value === email.value) {
			setEmailConfirmation({status: "valid", value: event.target.value, error: ""});
		} else {
			setEmailConfirmation({status: "invalid", value: event.target.value, error: "Emails não correspondentes!"});
		}
	};
	function handlePasswordChange(event) {
		if (event.target.value === "") {
			setPassword({status: "empty", value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		if (event.target.value.length < 8) {
			setPassword({status: "invalid", value: event.target.value, error: "Senha precisa ter mais que 8 caracteres!"});
		} else {
			setPassword({status: "valid", value: event.target.value, error: ""});
		}
	};
	function handlePasswordConfirmationChange(event) {
		if (event.target.value === "") {
			setPasswordConfirmation({status: "empty", value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		if (event.target.value === password.value) {
			setPasswordConfirmation({status: "valid", value: event.target.value, error: ""});
		} else {
			setPasswordConfirmation({status: "invalid", value: event.target.value, error: "Senhas não correspondentes!"});
		}
	};
	function handleCPFChange(event) {
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
	function handleTelefoneChange(event) {
		if (event.target.value === "") {
			setTelefone({status: "empty", value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		if (validTelefone(event.target.value)) {
			setTelefone({status: "valid", value: event.target.value, error: ""});
		} else {
			setTelefone({status: "invalid", value: event.target.value, error: "Telefone inválido!"});
		}
	};

	const registerUser = useCallback(async (event) => {
		event.preventDefault();
		const valid = [
			name,
			email,
			emailConfirmation,
			password,
			passwordConfirmation,
			cpf,
			telefone
		].every(varstate => varstate.status === 'valid')

		if (!valid) return;

		let client = {}

		try {
			let resp = await fetch(`http://localhost:3001/signup/${cpf.value}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
					name: name.value,
					email: email.value,
					password: password.value,
					cpf: cpf.value,
					phoneNumber: telefone.value,
				})
			})
			
			console.log("post resp: ", resp);
			navigate("/login");
		} catch (exception) {
			alert(exception);
		}
		// try {
		// 	await mockAPI.registerUser({
		// 		name: name.value,
		// 		email: email.value,
		// 		password: password.value,
		// 		cpf: cpf.value,
		// 		telefone: telefone.value
		// 	});
		// 	navigate("/login");
		// } catch (exception) {
		// 	alert(exception);
		// }

	});

	return (
		<div>
			<h1> Criação de Conta </h1>
			<form onSubmit={registerUser}>
				<ValidatedInput type="text" id="name" label="Nome" state={name} onChange={handleNameChange}/>
				<ValidatedInput type="text" id="email" label="Email" state={email} onChange={handleEmailChange}/>
				<ValidatedInput type="text" id="emailConfirmation" label="Confirmação de email" state={emailConfirmation} onChange={handleEmailConfirmationChange}/>
				<ValidatedInput type="password" id="password" label="Senha" state={password} onChange={handlePasswordChange}/>
				<ValidatedInput type="password" id="passwordConfirmation" label="Confirmação de senha" state={passwordConfirmation} onChange={handlePasswordConfirmationChange}/>
				<ValidatedInput type="text" id="cpf" label="CPF" state={cpf} onChange={handleCPFChange}/>
				<ValidatedInput type="text" id="telefone" label="Telefone" state={telefone} onChange={handleTelefoneChange}/>
				<button>Criar Conta</button>
			</form>
		</div>
	);
};

export default SignUp;