import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import mockAPI from  "../API_middlewares/mock";
import { useCallback, useState } from "react";
import { ValidatedInput } from "./validated_input";

import { categories } from "./products"
import GlassesImg from "../oculos.jpeg";

function AddProduct(props) {
	const [name, setName] = useState({status: "empty", value: "", error: "Campo Obrigatório!"});
	const [marca, setMarca] = useState({status: "empty", value: "", error: "Campo Obrigatório!"});
	const [cost, setCost] = useState({status: "empty", value: "", error: "Campo Obrigatório!"});
	const [description, setDescription] = useState({status: "empty", value: "", error: "Campo Obrigatório!"});
	const [img, setImg] = useState({status: "valid", value: GlassesImg, error: "Campo Obrigatório!"});
	const [availableQtt, setAvailableQtt] = useState({status: "empty", value: "", error: "Campo Obrigatório!"});
	const [category, setCategory] = useState({status: "empty", value: "", error: "Campo Obrigatório!"});
	const navigate = useNavigate();

	function validCost(price) {
		var re = /^\d*\,\d{0,2}$/g;
		return re.test(price);
	}
	function validQtt(qtt) {
		var re = /^\d+$/g;
		return re.test(qtt);
	}

	function handleName(event) {
		if (event.target.value === "") {
			setName({status: "empty", value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		setName({status: "valid", value: event.target.value, error: ""});
	};
	function handleMarca(event) {
		if (event.target.value === "") {
			setMarca({status: "empty", value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		setMarca({status: "valid", value: event.target.value, error: ""});
	};
	function handleCost(event) {
		if (event.target.value === "") {
			setCost({status: "empty", value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		if (!validCost(event.target.value)) {
			setCost({status: "invalid", value: event.target.value, error: "Campo inválido"});
			return;
		}
		setCost({status: "valid", value: event.target.value, error: ""});
	};
	function handleDescription(event) {
		if (event.target.value === "") {
			setDescription({status: "empty", value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		setDescription({status: "valid", value: event.target.value, error: ""});
	};
	function handleImg(event) {
		if (event.target.value === "") {
			setImg({status: "empty", value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		const imgURL = URL.createObjectURL(event.target.files[0]);
		setImg({status: "valid", value: imgURL, error: ""});
	};
	function handleAvailableQttChange(event) {
		if (event.target.value === "") {
			setAvailableQtt({status: "empty", value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		if (!validQtt(event.target.value)) {
			setAvailableQtt({status: "invalid", value: event.target.value, error: "Campo Inválido!"});
			return;
		}
		setAvailableQtt({status: "valid", value: event.target.value, error: ""});
	};

	function handleCategory(event) {
		if (event.target.value === "") {
			setCategory({status: "empty", value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}

		if (!categories.has(event.target.value)) {
			setCategory({status: "invalid", value: event.target.value, error: "Categoria Inválida!"});
			return;
		}

		setCategory({status: "valid", value: event.target.value, error: ""});
	};

	const registerProduct = useCallback(async (event) => {
		event.preventDefault();
		const valid = [
			name,
			marca,
			cost,
			description,
			availableQtt,
			category
		].every(varstate => varstate.status === 'valid')

		if (!valid) return;

		try {
			await mockAPI.addProduct({
				name: name.value,
				marca: marca.value,
				price: parseFloat(cost.value),
				description: description.value,
				img: GlassesImg,
				availableQtt: parseInt(availableQtt.value),
				category: category.value,
				soldQtt: 0
			});
			navigate("/admin_page");
		} catch (exception) {
			alert(exception);
		}
	});

	return (
		<div>
			<h1> Adicionar Produto </h1>
			<form onSubmit={registerProduct}>
				<ValidatedInput type="text" id="name" label="Nome" state={name} onChange={handleName}/>
				<ValidatedInput type="text" id="marca" label="Marca" state={marca} onChange={handleMarca}/>
				<ValidatedInput type="text" id="cost" label="Preço" state={cost} onChange={handleCost}/>
				<ValidatedInput type="text" id="description" label="Descrição" state={description} onChange={handleDescription}/>
				<ValidatedInput type="text" id="availableQtt" label="Quantidade Disponível" state={availableQtt} onChange={handleAvailableQttChange}/>

				<div className="custom-field">
					<select id="categories" className={category.status} onChange={handleCategory}>
						<option value="">Escolha uma categoria</option>
						<option value="redondo">Redondo</option>
						<option value="retangular">Retangular</option>
						<option value="hexagonal">Hexagonal</option>
						<option value="escuro">Escuro</option>
						<option value="lente">Lente</option>
					</select>
					<label className="placeholder" htmlFor="categories">Categoria</label>
					<span className="error-message" aria-live="polite">{category.error}</span>
				</div>
				<button>Adicionar Produto</button>
			</form>
		</div>
	);
};

export default AddProduct;