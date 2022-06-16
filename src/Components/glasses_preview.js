import "../index.css";
import GlassesImg from "../oculos.jpeg"

const HorizontalGlassesPreview = ({name, price, img}) => {
	return (
        <div className="horizontal-glasses-preview">
            <div className="preview-img-wrapper">
                <img src={GlassesImg}/>
            </div>
            <div>
                <div>
                    {name}
                </div>
                <div>
                    {`Preço: R$${price.toFixed(2)}`}
                </div>
            </div>
        </div>
	);
}

export default HorizontalGlassesPreview;