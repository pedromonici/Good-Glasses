import "../index.css";
import IconButton from "./icon_button";

function Footer(props) {
	return (
		<footer className="banner">
			<div className="flex-item">
				<h1> Sobre Nós </h1>
				Melhor loja de óculos do Brasil. Compre com a gente!
			</div>
			<div className="flex-item">
				<IconButton className="flex-item" icon="tabler:eyeglass" hoverClass="spin-hover"/>
			</div>
			<div id="atendimento" className="flex-item flex-box vertical-flex flex-align-items-center">
				<h1>Atendimento</h1>
				{/* <div className="flex-box vertical-flex"> */}
				<div>
					email@goodglasses.com <br/>
					+55 11 999999999 <br/>
					seg à dom, 09hrs - 22hrs
				</div>
			</div>
		</footer>
	);
}

export default Footer;