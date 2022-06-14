import "../index.css";

function Footer(props) {
	return (
		<footer className="pink-background black-border">
			<div className="left sobre-nos">
				<h1> Sobre Nós </h1>
				Lorem ipsum dolor sit amet, consectetur 
				adipiscing elit, sed do eiusmod tempor 
				incididunt ut labore et dolore magna aliqua.
			</div>
			<div className="right atendimento">
				<h1> Atendimento </h1>
				<div className="flex-box vertical-flex">
					email@goodglasses.com <br/>
					+55 11 999999999 <br/>
					seg à dom, 09hrs - 22hrs
				</div>
			</div>
		</footer>
	);
}

export default Footer;