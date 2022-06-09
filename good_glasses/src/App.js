import {
	Routes,
	BrowserRouter as Router,
	Route,
	Redirect,
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

function App() {
	return (
		<Router>
			<Header/>
			<div className="content">
				<Routes>
					<Route exact path="/" element={<GlassesList/>}/>
					<Route path="/oculos/:id" element={<GlassesDescription/>}/>
					<Route path="/login" element={<Login/>}/>
					<Route path="/signup" element={<SignUp/>}/>
					<Route path="/update_info" element={<UpdateInfo/>}/>
					<Route path="/pay" element={<Pay/>}/>
					<Route path="/products" element={<Products/>}/>
					<Route path="/recomendations" element={<Recomendations/>}/>
					<Route path="/cart" element={<Cart/>}/>
				</Routes>
			</div>
			<Footer/>
		</Router>
	);
}

export default App;