const TextInput = ({id, label, state, onChange}) => {
	return (
		<div className="margin-v-25">
			<label htmlFor={id}> {`${label}:`} </label>
			<input id={id} type="text" value={state.value} onChange={onChange}/>
			<div className={!state.status ? "erro" : "hidden"}> {state.error} </div>
		</div>
	)
}

export default TextInput;