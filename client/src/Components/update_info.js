import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import mockAPI from "../API_middlewares/mock";
import { ValidatedInput } from "./validated_input";
const utils = require('../utils')

function UpdateInfoForm(props) {
	const [name, setName] = useState({status: "valid", value: props.initialName, error: ""});
	const [email, setEmail] = useState({status: "valid", value: props.initialEmail, error: ""});
	const [password, setPassword] = useState({status: "empty", value: "", error: ""});
	const [telefone, setTelefone] = useState({status: "valid", value: props.initialTelefone, error: ""});
	const navigate = useNavigate();

	useEffect(() => {
		setName({status: "valid", value: props.initialName, error: ""});
		setEmail({status: "valid", value: props.initialEmail, error: ""});
		setPassword({status: "valid", value: props.initialPassword, error: ""});
		setTelefone({status: "valid", value: props.initialTelefone, error: ""});
	}, [props.initialName, props.initialEmail, props.initialPassword, props.initialTelefone]);

	function validEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
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
	function handlePasswordChange(event) {
		if (event.target.value === "") {
			setPassword({status: "empty", value: event.target.value, error: ""});
			return;
		}
		if (event.target.value.length < 8) {
			setPassword({status: "invalid", value: event.target.value, error: "Senha precisa ter mais que 8 caracteres!"});
		} else {
			setPassword({status: "valid", value: event.target.value, error: ""});
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

	const updateUserInfo = useCallback(async (event) => {
		event.preventDefault();
		const valid = [
			name,
			email,
			password,
			telefone
		].every(varstate => varstate.status === 'valid')
		if (!valid) return;

		try {
			const token = utils.getCookie();

			let updated_user = {
				token: token,
				name: name.value,
				email: email.value,
				cpf: props.loggedIn,
				phoneNumber: telefone.value,
			};

			if (password.value.length > 0) {
				updated_user.password = password.value;
			}

			console.log("updated_user: ", updated_user);
			
			let resp = await fetch(`http://localhost:3001/update_info/${props.loggedIn}`, {
				method: 'POST',
				headers: {'Content-Type': 'application/json', 'x-access-token': token },
				body: JSON.stringify(updated_user)
			});

			navigate(-1);
		} catch (exception) {
			alert(exception);
		}

	});

	if (!props.loaded) {
		return <></>;
	}

	return (
		<div>
			<h1> Olá, {props.initialName} </h1>
			<form onSubmit={updateUserInfo}>
				<ValidatedInput type="text" id="name" label="Nome" state={name} onChange={handleNameChange}/>
				<ValidatedInput type="text" id="email" label="Email" state={email} onChange={handleEmailChange}/>
				<ValidatedInput type="password" id="password" label="Senha" state={password} onChange={handlePasswordChange}/>
				<ValidatedInput type="text" id="telefone" label="Telefone" state={telefone} onChange={handleTelefoneChange}/>
				<button>Atualizar Dados</button>
			</form>
		</div>
	);
}

function UpdateInfo(props) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [telefone, setTelefone] = useState("");
	const [didLoad, setDidLoad] = useState(false);

	useEffect(() => {
		if (!didLoad) {
			(async function() {
				try {
					const token = utils.getCookie();

					const info = await (await fetch(`http://localhost:3001/login/${props.loggedIn}`, {
						headers: {'x-access-token': token},
					})).json();

					console.log(info);
					
					setName(info.name);
					setEmail(info.email);
					setTelefone(info.phoneNumber);
					setDidLoad(true);
				} catch (exception) {
					console.log(exception);
					setDidLoad(false);
				}
			})();
		}
	}, [didLoad, name, email, password, telefone]);

	return (
		<UpdateInfoForm 
			initialName={name} 
			initialEmail={email} 
			initialPassword={password}
			initialTelefone={telefone}
			loaded={didLoad}
			loggedIn={props.loggedIn}
		/>
	);
};

export default UpdateInfo;