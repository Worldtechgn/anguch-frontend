import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
//import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, CardBody, Form, FormFeedback, Input } from "reactstrap";
import {
	addNewCommune as onAddNewCommune,
	updateCommune as onUpdateCommune,
	getPrefectures,
} from "../../../store/actions";
import Swal from "sweetalert2";

const AddEditCommune = props => {
	const { prefectures, onGetPrefectures, } = props;

	const dispatch = useDispatch();
	const [edit, setEdit] = useState([]);

	useEffect(() => {
		onGetPrefectures()
		setEdit(props.user)
	}, [props, onGetPrefectures]);

	const prefecturesList = prefectures.map((prefecture, index) => {
		return (
			<option value={prefecture.slug} key={index}>
				{prefecture.nom}
			</option>
		)
	})

	const validation = useFormik({
		enableReinitialize: true,
		initialValues: {
			nom: edit ? edit?.nom : '',
			prefectureId: edit ? edit.prefectureId : ''
		},
		validationSchema: Yup.object({
			nom: Yup
				.string("nom should be a string")
				.required("nom est obligatoire"),
			prefectureId: Yup
				.string("nom should be a string")
				.required("prefecture est obligatoire"),
		}),
		onSubmit: values => {
			if (edit) {
				const updateCommune = {
					id: edit ? edit.id : 0,
					nom: values.nom,
					prefectureId: values.prefectureId,
				}
				dispatch(onUpdateCommune(updateCommune));
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
				dispatch(onAddNewCommune(values));
				validation.resetForm();
				props.onClose()
			}
		},
	})

	return (
		<>
			<Modal.Header style={{ backgroundColor: '#fff', }}>
				<Modal.Title>{edit ? "Modification des prefectures" : "Enregistrement des régions"} </Modal.Title>
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

							<div className="form-group col-md-12">
								<label>Selectionne prefecture</label>
								<select name="prefectureId" id="prefectureId"
									onChange={(e) => { validation.handleChange(e); }}
									onBlur={validation.handleBlur}
									value={validation.values.prefectureId || ""}
									className="form-control">
									<option value="">selectionne une prefecture</option>
									{prefecturesList}
								</select>
								{validation.touched.prefectureId &&
									validation.errors.prefectureId ? (
									<FormFeedback type="invalid">
										{validation.errors.prefectureId}
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

AddEditCommune.propTypes = {
	prefectures: PropTypes.array,
	onGetPrefectures: PropTypes.func,
}

const mapStateToProps = ({ prefectures }) => ({
	prefectures: prefectures.prefectures,
})

const mapDispatchToProps = dispatch => ({
	onGetPrefectures: () => dispatch(getPrefectures()),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(AddEditCommune))

