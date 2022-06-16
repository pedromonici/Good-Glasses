import "../index.css";
import { Icon } from '@iconify/react';

function Footer(props) {
	return (
		<footer className="footer">
			<div className="sobre-nos">
				<h1> Sobre Nós </h1>
				Melhor loja de óculos do Brasil. Compre com a gente!
			</div>
			<div className="icon">
				<Icon icon="el:glasses" color="#000000" width="40" height="40"/>
			</div>
			<div className="atendimento">
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