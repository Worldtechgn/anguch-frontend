import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import './style/style.scss';
import Swal from 'sweetalert2';
import { Button, CardBody,} from "reactstrap";
import { useForm } from "react-hook-form";
import { putValidationTraitement } from "../../helpers/backend_catastrophe";

const EtatTraitement = props => {

	const { handleCloseEtatTraitementModal, onSubmitEtatTraitement,catastrophe} = props;

	const [isSave, setIsSave] = useState(false)

	const onCloseEditModal = () => {
		handleCloseEtatTraitementModal()
	}

	const {register, handleSubmit} = useForm();
	const onSubmit = async (data) => {
		setIsSave(true)
		data['catastrophe_id'] = catastrophe.id
		await putValidationTraitement(catastrophe.id,data).then(resp => {
			onSubmitEtatTraitement();
			setIsSave(false)
		}).catch(error => {
			onSubmitEtatTraitement();
			Swal.fire({
				toast: true,
				position: 'top-end',
				text: "Erreur s'est produit lors de cette operation.",
				icon: 'error',
				showConfirmButton: false,
				timer: 2000
			})
			setIsSave(false)
		})
	};


	return (
		<>
			<Modal.Header closeButton style={{ backgroundColor: '#fff', }}>
				<Modal.Title>Traitement de catastrophe : <b>{props.catastrophe?.typeCatastrophe} </b> </Modal.Title>
			</Modal.Header>
			<Modal.Body style={{ backgroundColor: '#fff', }}>
				<CardBody>
					<form className="needs-validation" id="form_traitement" onSubmit={handleSubmit(onSubmit)}>
						<div className="row form-row">
							<div className="form-group col-md-12">
								<label>Etat de traitement</label>
								<select name="etatTraitement" id="etatTraitement"
									{...register('etatTraitement',{required:true}) }
									className="form-control">
									<option value="">selectionne </option>
									{["Non","Oui","Encours"].map((val,index) => <option value={val} key={index}>{val}</option>)}
								</select>
							</div>
						</div>

						<div className="form-group mt-3">
							<button type="button" onClick={onCloseEditModal} className="btn btn-danger">
								<i className="fa fa-times"></i> Fermer
							</button>
							<Button type="submit" style={{ backgroundColor: '#192957' }} disabled={isSave} className="m-1 float-end">
								{isSave && <span className="spinner-border spinner-border-sm mr-1"></span>}
								<i className='fa fa-save'></i> {'Valider'}
							</Button>
						</div>
					</form>
				</CardBody>
			</Modal.Body>
		</>
	);
};

export default EtatTraitement;
