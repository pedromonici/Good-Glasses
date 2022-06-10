import {
	Routes,
	BrowserRouter as Router,
	Route,
	useNavigate,
	Navigate,
} from "react-router-dom";
import Header from "./Components/header.js";
import GlassesList from "./Components/glasses_list.js";
import Footer from "./Components/footer.js";
import GlassesDescription from "./Components/glasses_description.js";
import Login from "./Components/login.js";
import SignUp from "./Components/signup.js";
import UpdateInfo from "./Components/update_info";
import Pay from "./Components/pay";
import Products from "./Components/products";
import Recomendations from "./Components/recomendations";
import Cart from "./Components/cart";
import { useState } from "react";
import AdminPage from "./Components/admin_page.js";
import AddProduct from "./Components/add_product.js";

function App() {
	const [loggedIn, setLoggedIn] = useState("");

	return (
		<Router>
			<Header loggedIn={loggedIn}/>
			<div className="content">
				<Routes>
					<Route exact path="/" element={<Products/>}/>
					<Route path="/oculos/:id" element={<GlassesDescription/>}/>

					{loggedIn.length === 0 && ( 
						<>
							<Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>}/>
							<Route path="/signup" element={<SignUp/>}/>
						</>
					)};
					{loggedIn.length !== 0 && <Route path="/update_info" element={<UpdateInfo loggedIn={loggedIn}/>}/>}

					<Route path="/admin_page" element={<AdminPage/>}/>
					<Route path="/update_product/:name" element={<UpdateProduct/>}/>
					<Route path="/add_product" element={<AddProduct/>}/>
					<Route path="/pay" element={<Pay/>}/>
					<Route path="/recomendations" element={<Recomendations/>}/>
					<Route path="/cart" element={<Cart loggedIn={loggedIn}/>}/>
					<Route exact path="/*" element={<Navigate to="/"/>}/>
				</Routes>
			</div>
			<Footer/>
		</Router>
	);
}

export default App;