import "../index.css";
import { Link, useSearchParams } from "react-router-dom";
import GlassesImg from "../oculos.jpeg";
import { useCallback, useEffect, useState } from "react";
import mockAPI from "../API_middlewares/mock";

function GlassesPreview(props) {
	return (
		<div className="flex-box flex-box-wrap">
			<div className="list-item-img-wrapper">
				<img src={props.img}/>
			</div>
			<div className="v-middle">{`Nome: ${props.name}`} </div>
			<div className="v-middle">{`Preço: R$${props.cost}`}</div>
			<div className="v-middle">{`Descrição: ${props.description}`}</div>
			<div className="v-middle">{`Quantidade Disponível: ${props.availableQtt}`}</div>
			<div className="v-middle">{`Quantidade Vendida: ${props.soldQtt}`}</div>
			<div className="v-middle">{`Categoria: ${props.category}`}</div>
			<Link to={`/update_product/${props.name}`}> Atualizar </Link>
			<button className="remove-cart" onClick={(event) => {
				props.removeGlasses(props.name);
			}}> X </button>
		</div>
	);
}

function GlassesPreviewList(props) {
	let list = Object.values(props.products);
	if (list === null || list === undefined) {
		list = [];
	}
	const items = list.map((glass, idx) => {
		return <GlassesPreview 
			name={glass.name} 
			cost={glass.cost}
			description={glass.description}
			img={glass.img} 
			key={idx} 
			availableQtt={glass.availableQtt}
			category={glass.category}
			soldQtt={glass.soldQtt}
			removeGlasses={props.removeGlasses}
		/>
	});

	return (
		<div className="list">
			{items}
		</div>
	);
};

function AdminPage(props) {
	const [products, setProducts] = useState({});
	const [loaded, setLoaded] = useState(false);

	useEffect(() =>{
		if (!loaded) {
			(async () => {
				try {
					setProducts(JSON.parse(await mockAPI.getProducts()));
					setLoaded(true);	
				} catch(exception) {
					setLoaded(false);
				}
			})()
		}
	}, [products, loaded]);

	const removeGlasses = useCallback(async (name) => {
		console.log(name);
		try {
			await mockAPI.removeProduct(name);
			setLoaded(false);
		} catch(exception) {
			alert("Falha ao remover produto!");
			console.log(exception);
		}
	});

	return (
		<div>
			<h1> Produtos Disponíveis: </h1>
			<GlassesPreviewList products={products} removeGlasses={removeGlasses}/>
			<Link to="/add_product"> Adicionar Produto </Link>
		</div>	
	);
};

export default AdminPage;