import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import mockAPI from  "../API_middlewares/mock";
import { useCallback, useState } from "react";

function AddProduct(props) {
	const [name, setName] = useState({status: false, value: "", error: "Campo Obrigatório!"});
	const [cost, setCost] = useState({status: false, value: "", error: "Campo Obrigatório!"});
	const [description, setDescription] = useState({status: false, value: "", error: "Campo Obrigatório!"});
	const [img, setImg] = useState({status: false, value: "", error: "Campo Obrigatório!"});
	const [availableQtt, setAvailableQtt] = useState({status: false, value: "", error: "Campo Obrigatório!"});
	const [category, setCategory] = useState({status: false, value: "", error: "Campo Obrigatório!"});
	const navigate = useNavigate();

	function handleNameChange(event) {
		if (event.target.value === "") {
			setName({status: false, value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		setName({status: true, value: event.target.value, error: ""});
	};
	function handleCostChange(event) {
		if (event.target.value === "") {
			setCost({status: false, value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		setCost({status: true, value: event.target.value, error: ""});
	};
	function handleDescriptionChange(event) {
		if (event.target.value === "") {
			setDescription({status: false, value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		setDescription({status: true, value: event.target.value, error: ""});
	};
	function handleImgChange(event) {
		if (event.target.value === "") {
			setImg({status: false, value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		const imgURL = URL.createObjectURL(event.target.files[0]);
		setImg({status: true, value: imgURL, error: ""});
	};
	function handleAvailableQttChange(event) {
		if (event.target.value === "") {
			setAvailableQtt({status: false, value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		setAvailableQtt({status: true, value: event.target.value, error: ""});
	};
	function handleCategoryChange(event) {
		if (event.target.value === "") {
			setCategory({status: false, value: event.target.value, error: "Campo Obrigatório!"});
			return;
		}
		setCategory({status: true, value: event.target.value, error: ""});
	};

	const registerUser = useCallback(async (event) => {
		event.preventDefault();
		const notValid = !name.status || !cost.status || !description.status || 
					  !img.status || !availableQtt.status	
		if (notValid) return;

		try {
			await mockAPI.addProduct({
				name: name.value,
				cost: cost.value,
				description: description.value,
				img: img.value,
				availableQtt: availableQtt.value,
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
			<form onSubmit={registerUser}>
				<label htmlFor="name"> Nome: </label>
				<input id="name" type="text" value={name.value} onChange={handleNameChange}/>
				<div className={!name.status ? "erro" : "hidden"}> {name.error} </div>

				<label htmlFor="cost"> Preço: </label>
				<input id="cost" type="text" value={cost.value} onChange={handleCostChange}/>
				<div className={!cost.status ? "erro" : "hidden"}> {cost.error} </div>

				<label htmlFor="description"> Descrição: </label>
				<input id="description" type="text" value={description.value} onChange={handleDescriptionChange}/>
				<div className={!description.status ? "erro" : "hidden"}> {description.error} </div>

				<label htmlFor="img"> Imagem: </label>
				<input id="img" type="file" onChange={handleImgChange}/>
				<div className={!img.status ? "erro" : "hidden"}> {img.error} </div>

				<label htmlFor="availableQtt"> Quantidade Disponível: </label>
				<input id="availableQtt" type="text" value={availableQtt.value} onChange={handleAvailableQttChange}/>
				<div className={!availableQtt.status ? "erro" : "hidden"}> {availableQtt.error} </div>

				<label htmlFor="category"> Categoria: </label>
				<input id="category" type="text" value={category.value} onChange={handleCategoryChange} list="categories"/>
				<datalist id="categories">
					<option value="redondo"/>
					<option value="retangular"/>
					<option value="hexagonal"/>
					<option value="escuro"/>
					<option value="lente"/>	 
				</datalist>
				<div className={!category.status ? "erro" : "hidden"}> {category.error} </div>

				<input type="submit" value="Adicionar Produto" className="pink-background"/>
			</form>
		</div>
	);
};

export default AddProduct;