import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { CardBody } from "reactstrap";
import axiosApi from "../../helpers/api_helper";
const AddRole = props => {
	// const [selectedPermission, setSelectedPermission] = useState();

	// function handleSelectPermission(data) {
	// 	setSelectedPermission(data);
	// }

	const initialValues = {
		nom: '',
		permission: '',
	};
	const validationSchema = Yup.object().shape({
		nom: Yup
			.string("nom should be a string")
			.required("nom est obligatoire"),
	});


	const submitRole = (fields, { setStatus, setSubmitting }) => {
		setStatus();
		
		axiosApi.post('/role', {
			nom: fields.nom,
			permission: ""
		}).then(res => {
			Swal.fire({
				toast: true,
				position: 'top-end',
				text: 'Enregistrement effectué avec success.',
				icon: 'success',
				showConfirmButton: false,
				timer: 2000
			})
			props.onSubmit(res)
		}).catch(() => {
			Swal.fire({
				toast: true,
				position: 'top-end',
				text: 'Enregistrement nom effectué avec success.',
				icon: 'error',
				showConfirmButton: false,
				timer: 2000
			})
		})
		setSubmitting(false);
	}

	return (
		<>
			<Modal.Header style={{ backgroundColor: '#fff', }}>
				<Modal.Title>Role et Permission </Modal.Title>
			</Modal.Header>
			<Modal.Body style={{ backgroundColor: '#fff', }}>
				<CardBody>
					<Formik onChange={() => {
						console.log('changing');
					}} initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitRole}>
						{({ errors, touched, isSubmitting }) => {
							return (
								<>
									<Form>
										<div className="row form-row">
											<div className="form-group col-md-12">
												<label>Nom</label>
												<Field name="nom" type="text" className={'form-control' + (errors.nom && touched.nom ? ' is-invalid' : '')} />
												<ErrorMessage name="nom" component="div" className="invalid-feedback" />
											</div>

											{/* <div className="form-group col-md-12">
												<label></label>
												<Select name="permission"
													isMulti
													placeholder="les permissions ... "
													isClearable={true}
													isSearchable={true}
													isDisabled={false}
													isLoading={false}
													isRtl={false}
													value={selectedPermission}
													closeMenuOnSelect={false}
													onChange={handleSelectPermission}
													options={permissions.map(e => ({ label: e.name, value: e.id }))}
													className={'' + (errors.permission && touched.permission ? ' is-invalid' : '')} >
												</Select>
												<ErrorMessage name="nom" component="div" className="invalid-feedback" />
											</div> */}
										</div><br />
										<button onClick={props.onClose} className="btn btn-danger">
											<i className="fa fa-times"></i> Fermer
										</button>
										<button type="submit" style={{ backgroundColor: '#192957' }} disabled={isSubmitting} className="btn btn-success m-1 float-end">
											{isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
											<i className='fa fa-save'></i> Enregister
										</button>
									</Form>
								</>
							);
						}}
					</Formik>
				</CardBody>
			</Modal.Body>
		</>
	);
};

export default AddRole;
