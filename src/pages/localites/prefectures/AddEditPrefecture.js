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
	addNewPrefecture as onAddNewPrefecture,
	updatePrefecture as onUpdatePrefecture,
	getRegions,
} from "../../../store/actions";
import Swal from "sweetalert2";

const AddEditPrefecture = props => {
	const { regions, onGetRegions, } = props;

	const dispatch = useDispatch();
	const [edit, setEdit] = useState([]);


	useEffect(() => {
		onGetRegions()
		setEdit(props.user)
	}, [props, onGetRegions]);

	const regionsList = regions.map((region, index) => {
		return (
			<option value={region.slug} key={index}>
				{region.nom}
			</option>
		)
	})

	const validation = useFormik({
		enableReinitialize: true,
		initialValues: {
			nom: edit ? edit?.nom : '',
			regionId: edit ? edit.regionId : ''
		},
		validationSchema: Yup.object({
			nom: Yup
				.string("nom should be a string")
				.required("nom est obligatoire"),
			regionId: Yup
				.string("nom should be a string")
				.required("region est obligatoire"),
		}),
		onSubmit: values => {
			if (edit) {
				const updateUser = {
					id: edit ? edit.id : 0,
					nom: values.nom,
					regionId: values.regionId,
				}
				dispatch(onUpdatePrefecture(updateUser));
				//validation.resetForm();
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
				dispatch(onAddNewPrefecture(values));
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

							<div className="form-group col-md-12">
								<label>Selectionne region</label>
								<select name="regionId" id="regionId"
									onChange={(e) => { validation.handleChange(e); }}
									onBlur={validation.handleBlur}
									value={validation.values.regionId || ""}
									className="form-control">
									<option value="">selectionne une region</option>
									{regionsList}
								</select>
								{validation.touched.regionId &&
									validation.errors.regionId ? (
									<FormFeedback type="invalid">
										{validation.errors.regionId}
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

AddEditPrefecture.propTypes = {
	regions: PropTypes.array,
	onGetRegions: PropTypes.func,
}

const mapStateToProps = ({ regions }) => ({
	regions: regions.regions,
})

const mapDispatchToProps = dispatch => ({
	onGetRegions: () => dispatch(getRegions()),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(AddEditPrefecture))

