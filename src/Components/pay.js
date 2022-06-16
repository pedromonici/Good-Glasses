import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"
import mockAPI from "../API_middlewares/mock";
import { TextInput } from "./text_input";

function Pay(props) {
	const [cpf, setCPF] = useState({status: false, value: "", error: "Campo Obrigatório!"});
	const [nroCartao, setNroCartao] = useState({status: false, value: "", error: "Campo Obrigatório!"});
	const [codSeg, setCodSeg] = useState({status: false, value: "", error: "Campo Obrigatório!"});
	const [endereco, setEndereco] = useState({status: false, value: "", error: "Campo Obrigatório!"});

	function validCPF(cpf) {
		var re = /^[0-9]{11}$/;
		return re.test(cpf);
	};
	function validNroCartao(nro) {
		var re = /^[0-9]{16}$/;
		return re.test(nro);
	}
	function validCodSeg(cod) {
		var re = /^[0-9]{3}$/;
		return re.test(cod);
	}

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

	function handleNroCartaoChange(event) {
		if (event.target.value === "") {
			setNroCartao({status: false, value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		if (!validNroCartao(event.target.value)) {
			setNroCartao({status: false, value: event.target.value, error: "Campo Inválido!"});
			return;
		}
		setNroCartao({status: true, value: event.target.value, error: ""});
	}

	function handleCodSegChange(event) {
		if (event.target.value === "") {
			setCodSeg({status: false, value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		if (!validCodSeg(event.target.value)) {
			setCodSeg({status: false, value: event.target.value, error: "Campo Inválido!"});
			return;
		}
		setCodSeg({status: true, value: event.target.value, error: ""});
	}

	function handleEnderecoChange(event) {
		if (event.target.value === "") {
			setEndereco({status: false, value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		setEndereco({status: true, value: event.target.value, error: ""});
	}

	const navigate = useNavigate();

	let cart = sessionStorage.getItem("cart");
	if (typeof cart !== "string") {
		cart = "{}";
	}
	cart = JSON.parse(cart);

	const executePurchase = async (event) => {
		event.preventDefault();
		try {
			await mockAPI.processPayment(cart);
			alert("compra realizada com sucesso.")
			sessionStorage.removeItem("cart");
			navigate("/");
		} catch(exception) {
			alert(exception);
			navigate(-1);
		}
	}

	return (
		<div>
			<h1> Pagamento </h1>
			<form onSubmit={executePurchase}>
				<TextInput id="cpf" label="CPF" state={cpf} onChange={handleCPFChange}/>
				<TextInput id="nroCartao" label="Número do Cartão" state={nroCartao} onChange={handleNroCartaoChange}/>
				<TextInput id="codSeg" label="Código de Segurança" state={codSeg} onChange={handleCodSegChange}/>
				<TextInput id="endereco" label="Endereço" state={endereco} onChange={handleEnderecoChange}/>

				<div> {`R$${Object.values(cart).reduce((acc, elem) => acc + elem.glassesPreviewProps.price * elem.qtt, 0).toFixed(2)}`} </div>

				<input type="submit" value="Comprar" className="pink-background"/>
			</form>
		</div>
	);
};

export default Pay;