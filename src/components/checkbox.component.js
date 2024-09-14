import React from "react";
class CheckboxComponent extends React.Component {

	render() {
		const checkboxList = this.props.checkboxList;
		return (
			<>
				{checkboxList.map((option, option1, option2) => (
					<div className="row" key={option.id}>
						<div className="col-md-4">
							<div className="form-check" >
								<input
									className="form-check-input"
									type="checkbox"
									name="nom"
									id={option.id}
									value={option.id}
									checked={option.isChecked}
									onChange={(e) => this.props.onChange(e, option)}
								/>
								<label className="form-check-label" htmlFor={option.id}>
									{option.nom}
								</label>
							</div>
						</div>
						<div className="col-md-4 mt-2">
							<div className="form-check">
								<input
									className="form-control"
									type="text"
									name="quantite"
									placeholder="Quantite"
									onChange={(e) => this.props.onChange1(e, option1)}
								/>
							</div>
						</div>
						<div className="col-md-4">
							<div className="form-check">
								<select name="unite" className="form-control" id={option2.id} onChange={(e) => this.props.onChange2(e, option2)}>
									<option value="">Selectionne </option>
									<option value="Kilogramme">Kilogramme</option>
									<option value="Tonne">Tonne</option>
									<option value="Sac">Sac</option>
									<option value="Grenier">Grenier</option>
								</select>

							</div>
						</div>
					</div>

				))}
			</>
		);
	}
}
export default CheckboxComponent;