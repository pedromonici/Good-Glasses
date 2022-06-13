import "../index.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import mockAPI from "../API_middlewares/mock";
import Products from "./products";

function UpdateInfoForm(props) {
	const [name, setName] = useState("");
	const [cost, setCost] = useState({status: false, value: "", error: "Campo Obrigatório!"});
	const [description, setDescription] = useState({status: false, value: "", error: "Campo Obrigatório!"});
	const [img, setImg] = useState({status: false, value: "", error: "Campo Obrigatório!"});
	const [availableQtt, setAvailableQtt] = useState({status: false, value: "", error: "Campo Obrigatório!"});
	const [category, setCategory] = useState({status: false, value: "", error: "Campo Obrigatório!"});
	const navigate = useNavigate();
	const params = useParams();

	useEffect(() => {
		(async () => {
			try {
				const product = await mockAPI.getProduct(params.name);
				setName(product.name);
				setCost({status: true, value: product.cost, error: ""});
				setDescription({status: true, value: product.description, error: ""});
				setImg({status: true, value: product.img, error: ""});
				setAvailableQtt({status: true, value: product.availableQtt, error: ""});
				setCategory({status: true, value: product.category, error: ""})
			} catch (exception) {
				alert(exception);
			}
		})();
	}, []);

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
		const notValid = !cost.status || !description.status || 
					  !img.status || !availableQtt.status	
		if (notValid) return;

		try {
			console.log(img.value);
			await mockAPI.updateProduct(name, {
				cost: cost.value,
				description: description.value,
				img: img.value,
				availableQtt: availableQtt.value,
				category: category.value,
			});
			navigate("/admin_page");
		} catch (exception) {
			alert(exception);
		}

	});

	return (
		<div>
			<h1> Atualizar Produto </h1>
			<form onSubmit={registerUser}>
				<div> Nome: {name}</div>

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

				<input type="submit" value="Atualizar Produto" className="pink-background"/>
			</form>
		</div>
	);
}

function UpdateProduct(props) {
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

export default UpdateProduct;