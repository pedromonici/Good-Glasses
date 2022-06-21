import "../index.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import mockAPI from "../API_middlewares/mock";
import Products from "./products";
import { ValidatedInput } from "./validated_input";


function UpdateInfoForm(props) {
	const [name, setName] = useState("");
	const [marca, setMarca] = useState({status: "empty", value: "", error: "Campo Obrigatório!"});
	const [cost, setCost] = useState({status: "empty", value: "", error: "Campo Obrigatório!"});
	const [description, setDescription] = useState({status: "empty", value: "", error: "Campo Obrigatório!"});
	const [availableQtt, setAvailableQtt] = useState({status: "empty", value: "", error: "Campo Obrigatório!"});
	const [category, setCategory] = useState({status: "empty", value: "", error: "Campo Obrigatório!"});
	const navigate = useNavigate();
	const params = useParams();

	useEffect(() => {
		(async () => {
			try {
				const product = JSON.parse(await mockAPI.getProduct(params.name));
				setName(product.name);
				setMarca({status: "valid", value: product.marca, error: ""});
				setCost({status: "valid", value: product.price, error: ""});
				setDescription({status: "valid", value: product.description, error: ""});
				setAvailableQtt({status: "valid", value: product.availableQtt, error: ""});
				setCategory({status: "valid", value: product.category, error: ""})
			} catch (exception) {
				alert(exception);
			}
		})();
	}, []);

	function validCost(price) {
		var re = /^\d*\,\d{0,2}$/g;
		return re.test(price);
	}
	function validQtt(qtt) {
		var re = /^\d+$/g;
		return re.test(qtt);
	}
	function validCategory(category) {
		return category === "redondo" || category === "retangular" ||
		    category === "hexagonal" || category === "escuro" ||
			category === "lente";
	}

	function handleCostChange(event) {
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
	function handleMarcaChange(event) {
		if (event.target.value === "") {
			setMarca({status: "empty", value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		setMarca({status: "valid", value: event.target.value, error: ""});
	};
	function handleDescriptionChange(event) {
		if (event.target.value === "") {
			setDescription({status: "empty", value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		setDescription({status: "valid", value: event.target.value, error: ""});
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
	function handleCategoryChange(event) {
		if (event.target.value === "") {
			setCategory({status: "empty", value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		if (!validCategory(event.target.value)) {
			setCategory({status: "invalid", value: event.target.value, error: "Campo Inválido!"});
			return;
		}
		setCategory({status: "valid", value: event.target.value, error: ""});
	};


	const updateProduct = useCallback(async (event) => {
		event.preventDefault();
		const valid = [
			marca,
			cost,
			description,
			availableQtt
		].every(varstate => varstate.status === 'valid')
		if (!valid) return;

		try {
			await mockAPI.updateProduct(name, {
				marca: marca.value,
				price: parseFloat(cost.value),
				description: description.value,
				availableQtt: parseInt(availableQtt.value),
				category: category.value,
			});
			navigate("/admin_page");
		} catch (exception) {
			alert(exception);
		}

	});

	return (
		<div>
			<h1>Atualizar Produto</h1>
			<form onSubmit={updateProduct}>
				<div> <h4> Nome do produto: {name} </h4> </div>
				<ValidatedInput type="text" id="marca" label="Marca" state={marca} onChange={handleMarcaChange}/>
				<ValidatedInput type="text" id="cost" label="Preço" state={cost} onChange={handleCostChange}/>
				<ValidatedInput type="text" id="description" label="Descrição" state={description} onChange={handleDescriptionChange}/>
				<ValidatedInput type="text" id="availableQtt" label="Quantidade Disponível" state={availableQtt} onChange={handleAvailableQttChange}/>

				<div className="custom-field">
					<label htmlFor="placeholder">Categoria</label>
					<select id="category" className={category.status} onChange={handleCategoryChange}>
						<option value="redondo">Redondo</option>
						<option value="retangular">Retangular</option>
						<option value="hexagonal">Hexagonal</option>
						<option value="escuro">Escuro</option>
						<option value="lente">Lente</option>
					</select>
					<span className="error-message" aria-live="polite">{category.error}</span>
				</div>

				<button>Atualizar Produto</button>
			</form>
		</div>
	);
}

function UpdateProduct(props) {
	return <UpdateInfoForm/> 
};

export default UpdateProduct;