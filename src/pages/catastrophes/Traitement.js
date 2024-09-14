import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import './style/style.scss';
import _ from 'lodash';
import Swal from 'sweetalert2';
import { Button, CardBody} from "reactstrap";
import { useForm } from "react-hook-form";
import axiosApi from "../../helpers/api_helper";
const Traitement = props => {

	const { handleCloseEditModal, onSubmitTraitement} = props;

	const [isSave, setIsSave] = useState(false)

	// const form_traitement = document.getElementById('form_traitement')
	const formData = new FormData();

	const onCloseEditModal = () => {
		handleCloseEditModal()
	}

	const {register, handleSubmit,watch} = useForm();
	/**
	 * Form 
	 */
	const onSubmit = async (data) => {
		
		const watchedData = watch();
    for (const key of Object.keys(watchedData.files)) {
      formData.append('files', watchedData.files[key])
    }
    formData.append('catastrophe', props.catastrophe.id);
    formData.append('commentaire', watchedData.commentaire);
		setIsSave(true);	
		
		axiosApi.post('/catastrophe/traitement', formData).then(resp => {
			onSubmitTraitement();
			setIsSave(false)
		}).catch(error => {
			onSubmitTraitement();
			Swal.fire({
				toast: true,
				position: 'top-end',
				text: 'Enregistrement nom effectué avec success.',
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
				<Modal.Title>Ajouter les documents de preuves : <b>{props.catastrophe?.typeCatastrophe} </b> </Modal.Title>
			</Modal.Header>
			<Modal.Body style={{ backgroundColor: '#fff', }}>
				<CardBody>
					<form className="needs-validation" id="form_traitement" onSubmit={handleSubmit(onSubmit)}>
						<div className="row form-row">
							<div className="form-group col-md-12 mt-2">
									<input multiple accept="image/*" type="file" id="" {...register('files')} />
							</div>
							<div className="form-group col-md-12">
								<label>Commentaire</label>
								<textarea className="form-control"
									{...register('commentaire',{required:true})}
								></textarea>
							</div>
							<br/>
							

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

export default Traitement;
