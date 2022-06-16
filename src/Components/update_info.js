import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import mockAPI from "../API_middlewares/mock";
import { TextInput, PassInput } from "./text_input";

function UpdateInfoForm(props) {
	const [name, setName] = useState({status: true, value: props.initialName, error: ""});
	const [email, setEmail] = useState({status: true, value: props.initialEmail, error: ""});
	const [password, setPassword] = useState({status: true, value: props.initialPassword, error: ""});
	const [telefone, setTelefone] = useState({status: true, value: props.initialTelefone, error: ""});
	const navigate = useNavigate();

	useEffect(() => {
		setName({status: true, value: props.initialName, error: ""});
		setEmail({status: true, value: props.initialEmail, error: ""});
		setPassword({status: true, value: props.initialPassword, error: ""});
		setTelefone({status: true, value: props.initialTelefone, error: ""});
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

	const updateUserInfo = useCallback(async (event) => {
		event.preventDefault();
		const notValid = !name.status || !email.status || !password.status || !telefone.status;			
		if (notValid) return;

		try {
			await mockAPI.updateUserInfo(props.loggedIn, {
				name: name.value,
				email: email.value,
				password: password.value,
				telefone: telefone.value
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
				<TextInput id="name" label="Nome" state={name} onChange={handleNameChange}/>
				<TextInput id="email" label="Email" state={email} onChange={handleEmailChange}/>
				<PassInput id="password" label="Senha" state={password} onChange={handlePasswordChange}/>
				<TextInput id="telefone" label="Telefone" state={telefone} onChange={handleTelefoneChange}/>

				<input type="submit" value="Atualizar Dados" className="pink-background"/>
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
					const info = JSON.parse(await mockAPI.getUserInfo(props.loggedIn));
					setName(info.name);
					setEmail(info.email);
					setPassword(info.password);
					setTelefone(info.telefone);
					setDidLoad(true);
				} catch (exception) {
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