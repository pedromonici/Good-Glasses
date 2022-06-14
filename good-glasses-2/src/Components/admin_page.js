import "../index.css";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import GlassesImg from "../oculos.jpeg";
import { useCallback, useEffect, useState } from "react";
import mockAPI from "../API_middlewares/mock";
import EditableList from "./editable_list";
import { Icon } from '@iconify/react';

const UpdateCanButton = ({callback}) => {
    const [color, setColor] = useState("#344648");
    return (
        <div className="icon" onClick={callback}>
            <div onMouseEnter={() => setColor("#209944")} onMouseLeave={() => setColor("#344648")}>
                <Icon icon="clarity:note-edit-line" color={color} width="40" height="40"/>
            </div>
        </div> 
    )
}

function GlassesPreview(props) {
	return (
		<div className="horizontal-glasses-preview">
			<div className="preview-img-wrapper">
				<img src={props.img}/>
			</div>
			<div >
				<div className="v-middle">{`Nome: ${props.name}`} </div>
				<div className="v-middle">{`Preço: R$${props.price}`}</div>
				<div className="v-middle">{`Disponíveis: ${props.availableQtt}`}</div>
				<div className="v-middle">{`Vendidos: ${props.soldQtt}`}</div>
			</div>
		</div>
	);
}

function GlassesEntry(glassesPreviewProps) {
	const navigate = useNavigate();
	return (
		<div className="glasses-entry">
			<GlassesPreview {...glassesPreviewProps}/>
			<div className="glasses-entry-qtt">
				<UpdateCanButton callback={() => navigate(`/update_product/${glassesPreviewProps.name}`)}/>
			</div>
		</div>
	)
}

function GlassesPreviewList(props) {
	let list = Object.values(props.products);
	if (list === null || list === undefined) {
		list = [];
	}
	const items = list.map((glass, idx) => {
		return <GlassesPreview 
			name={glass.name} 
			marca={glass.marca}
			cost={glass.price}
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

	const removeCallback = async (name) => {
		try {
			await mockAPI.removeProduct(name);
			setLoaded(false);
		} catch(exception) {
			alert("Falha ao remover produto!");
		}
	};

	const navigate = useNavigate();

	return (
		<>
			<div>
				<h1> Produtos Cadastrados: </h1>
				<hr/>
				<EditableList itemsProps={products} ItemsComponent={GlassesEntry} removeCallback={removeCallback}/>
			</div>
			<button className="button" onClick={() => navigate("/add_product")}> Adicionar produto </button>
			<div>
				<h1> Usuários Cadastrados: </h1>
				<hr/>
				<EditableList itemsProps={products} ItemsComponent={GlassesEntry} removeCallback={removeCallback}/>
			</div>
		</>
	);
};

export default AdminPage;