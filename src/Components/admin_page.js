import "../index.css";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import GlassesImg from "../oculos.jpeg";
import { useCallback, useEffect, useState } from "react";
import mockAPI from "../API_middlewares/mock";
import EditableList from "./editable_list";
import { Icon } from '@iconify/react';
import IconButton from "./icon_button";

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
				{`Telefone: ${props.telefone}`}
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
					setProducts(JSON.parse(await mockAPI.getProducts()));
					setLoaded(true);	
				} catch(exception) {
					setLoaded(false);
				}
			})();
		}
	}, [products, loaded]);

	useEffect(() => {
		(async () => {
			try {
				setUsers(JSON.parse(await mockAPI.getUsers()));
			} catch(exception) {
				alert("Não foi possível encontrar usuários!");
			}
		})();
	}, []);

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