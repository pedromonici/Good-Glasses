export const ValidatedInput = ({id, type, label, state, onChange}) => { 
	return (
		<div className="custom-field">
			<input id={id} type={type} placeholder=" " className={state.status} onChange={onChange} value={state.value}/>
			<label htmlFor={id} className="placeholder">{label}</label>
			<span className="error-message" aria-live="polite">{state.error}</span>
		</div>
	);
}