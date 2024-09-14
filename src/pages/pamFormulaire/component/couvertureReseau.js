
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { Row } from 'reactstrap';
const CouvertureReseau = (props) => {

	const { idReferenceMemo, operateures, onHandleCouvertureReseau, onHandleDominant } = props

	const [disponibiliteOptions, setDisponobiliteOptions] = useState([])
	const [dominant, setDominant] = useState([])

	const _operateurs = [
		{ label: "MTN", value: "MTN" },
		{ label: "Orange", value: "Orange" },
		{ label: 'Celcom', value: 'Celcom' }
	]

	useEffect(() => {
		if(operateures.disponible){
			setDisponobiliteOptions(operateures.disponible.map((e) => {return {label: e, value: e}} ))
		}
		setDominant(operateures.dominant)
	}, [operateures])

	const handleDisponibilite = (event) => {
		setDisponobiliteOptions(event)
		onHandleCouvertureReseau(event)
	}
	const handleChange = (e) => {
		setDominant(e.target.value)
		onHandleDominant(e.target.value)
	}

	return (
		<>
			<Row>
				<div className="form-group col-md-6">
					<label htmlFor="disponibilite_id">Disponibilité </label>
					{idReferenceMemo ?
						<Select name="disponibilite"
							placeholder="Sélectionner les operateurs"
							isMulti={true}
							className="select"
							isClearable={true}
							isSearchable={true}
							isDisabled={false}
							isLoading={false}
							isRtl={false}
							closeMenuOnSelect={false}
							value={disponibiliteOptions}
							selected={disponibiliteOptions}
							onChange={handleDisponibilite}
							options={_operateurs}
						>
						</Select> :
						<Select name="disponibilite"
							placeholder="Sélectionner les operateurs"
							isMulti={true}
							className="select"
							isClearable={true}
							isSearchable={true}
							isDisabled={false}
							isLoading={false}
							isRtl={false}
							closeMenuOnSelect={false}
							selected={disponibiliteOptions}
							onChange={handleDisponibilite}
							options={_operateurs}
						>
						</Select>
					}
				</div>
				<div className="form-group col-md-6">
					<label htmlFor="dominant_id">Dominant</label>
					<input
						disabled={false}
						name="dominant"
						id={'id_dominant'}
						className={"form-control"}
						placeholder="Entrer le nom de l'operateur dominant"
						value={dominant}
						onChange={handleChange}
					/>

				</div>
			</Row>
		</>
	)
}

export default CouvertureReseau