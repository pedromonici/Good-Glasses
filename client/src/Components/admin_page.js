import "../index.css";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import GlassesImg from "../oculos.jpeg";
import { useCallback, useEffect, useState } from "react";
import mockAPI from "../API_middlewares/mock";
import EditableList from "./editable_list";
import { Icon } from '@iconify/react';
import IconButton from "./icon_button";

const utils = require('../utils')

function GlassesEntry({removeElement, ...props}) {
	const navigate = useNavigate();
	return (
		<div className="editable-list-item">
			<div className="preview-img-wrapper">
				<img className="editable-list-img" src={GlassesImg}/>
			</div>
			<div>
				{`Nome: ${props.name}`}
				<br/> 
				{`Preço: R$${props.price.toFixed(2)}`}
				<br/>
				{`Disponíveis: ${props.availableQtt}`}
				<br/>
				{`Vendidos: ${props.soldQtt}`}
				<br/>
			</div>
			<div id="entry-icons" className="flex-box">
				<IconButton icon="tabler:edit" hoverClass="green-hover" callback={() => navigate(`/update_product/${props.name}`)}/>
				<IconButton icon="tabler:trash" hoverClass="red-hover" callback={removeElement}/>
			</div>
		</div>
	)
}

function UserEntry(props) {
	return (
		<div className="editable-list-item">
			<div>
				{`Nome: ${props.name}`}
				<br/> 
				{`CPF: ${props.cpf}`}
				<br/>
				{`Email: ${props.email}`}
				<br/>
				{`Telefone: ${props.phoneNumber}`}
				<br/>
			</div>
		</div>
	)
}

function AdminPage(props) {
	const [products, setProducts] = useState({});
	const [loaded, setLoaded] = useState(false);
	const [users, setUsers] = useState({});
	const [mode, setMode] = useState("products");

	useEffect(() =>{
		if (!loaded) {
			(async () => {
				try {
					// setProducts(JSON.parse(await mockAPI.getProducts()));
					const bla = await fetch(`http://localhost:3001/product/all`);
					console.log("bla: ", bla);
					let resp = await bla.json();
					console.log("get resp for all products: ", resp);
	
					setProducts(resp);
					setLoaded(true);	
				} catch(exception) {
					console.log("error on get for all products: ", exception);
					setLoaded(false);
				}
			})();
		}
	}, [products, loaded]);

	useEffect(() => {
		(async () => {
			try {
				const token = utils.getCookie();
				
				let resp = await (await fetch(`http://localhost:3001/all_users`, {
					headers: {'Content-Type': 'application/json', 'x-access-token': token },
				})).json();
				console.log("get resp: ", resp);
				setUsers(resp);
			} catch(exception) {
				console.log("tried getting all users -> exception:", exception);
				alert("Não foi possível encontrar usuários!");
			}
		})();
	}, []);

	const removeCallback = async (name) => {
		try {
			const token = utils.getCookie();

			let resp = await (await fetch(`http://localhost:3001/product/delete/${name}`, {
				method: 'DELETE',
				headers: {'Content-Type': 'application/json', 'x-access-token': token },
			})).json();
			console.log("delete resp: ", resp);

			setLoaded(false);
		} catch(exception) {
			console.log(exception);
			alert("Falha ao remover produto!");
		}
	};

	const navigate = useNavigate();

	return (
		<>
			{mode === 'products'?
				<div id="admin-icons">
					<div className="admin-mode">
						<button onClick={() => navigate("/add_product")}>Adicionar Produtos</button>
					</div>
					<div className="admin-mode">
						<button onClick={() => setMode("users")}>Usuarios</button>
					</div>
				</div>
			:
				<div id="admin-icons">
					<div className="admin-mode">
						<button onClick={() => {setMode("products");navigate("/admin_page")}}>Produtos</button>
					</div>
					<div className="admin-mode">
						<button onClick={() => setMode("users")}>Usuarios</button>
					</div>
				</div>
			}
			{mode === 'products' ? 
				<EditableList items={products} ItemsComponent={GlassesEntry} removeCallback={removeCallback}/>
			:
				<EditableList items={users} ItemsComponent={UserEntry}/>
			}
		</>
	);
};

export default AdminPage;