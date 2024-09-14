import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
//import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, CardBody, Form, FormFeedback, Input } from "reactstrap";
import {
	addNewRegion as onAddNewRegion,
	updateRegion as onUpdateRegion,
} from "../../../store/actions";
import Swal from "sweetalert2";

const AddEditRegion = props => {
	const dispatch = useDispatch();
	const [edit, setEdit] = useState([]);

	useEffect(() => {
		setEdit(props.user)
	}, [props]);

	const validation = useFormik({
		enableReinitialize: true,
		initialValues: {
			nom: edit ? edit?.nom : '',
		},
		validationSchema: Yup.object({
			nom: Yup
				.string("nom should be a string")
				.required("nom est obligatoire"),
		}),
		onSubmit: values => {
			if (edit) {
				const updateUser = {
					id: edit ? edit.id : 0,
					nom: values.nom,
				}
				dispatch(onUpdateRegion(updateUser));
				validation.resetForm();
				props.onClose()
				Swal.fire({
					toast: true,
					position: 'top-end',
					text: "Modification effectué avec success.",
					icon: 'success',
					showConfirmButton: false,
					timer: 5000
				});
			} else {
				dispatch(onAddNewRegion(values));
				validation.resetForm();
				props.onClose()
			}

		},
	})

	return (
		<>
			<Modal.Header style={{ backgroundColor: '#fff', }}>
				<Modal.Title>{edit ? "Modification des regions" : "Enregistrement des régions"} </Modal.Title>
			</Modal.Header>
			<Modal.Body style={{ backgroundColor: '#fff', }}>
				<CardBody>
					<Form className="needs-validation" onSubmit={e => {
						e.preventDefault()
						validation.handleSubmit()
						return false
					}}>
						<div className="row form-row">
							<div className="form-group col-md-12">
								<label>Nom</label>
								<Input
									name="nom"
									type="type"
									onChange={validation.handleChange}
									onBlur={validation.handleBlur}
									value={validation.values.nom || ""}
								/>
								{validation.touched.nom &&
									validation.errors.nom ? (
									<FormFeedback type="invalid">
										{validation.errors.nom}
									</FormFeedback>
								) : null}
							</div>

						</div>
						<div className="form-group mt-2">
							<button type="button" onClick={props.onClose} className="btn btn-danger">
								<i className="fa fa-times"></i> Fermer
							</button>

							<Button type="submit" style={{ backgroundColor: '#192957' }} className="btn m-1 float-end">
								<i className='fa fa-save'></i> {edit ? 'Modifier' : 'Enregistrer'}
							</Button>
						</div>
					</Form>
				</CardBody>
			</Modal.Body>
		</>
	);
};

export default (withRouter(AddEditRegion));
