import { useEffect, useMemo, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { Button, CardBody, Form, FormFeedback, Input } from "reactstrap";
import axiosApi from "../../helpers/api_helper";
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types"
import {
	getCommunes,
	getPrefectures,
	getRegions,
	getRoles,
	updateUtilisateur as onUpdateUtilisateur,
} from "../../store/actions";
import { updateUtilisateurd } from "../../helpers/backend_user";

const EditUsers = props => {
	const dispatch = useDispatch();

	const { roles, onGetRoles, regions, onGetRegions, prefectures, onGetPrefectures, communes, onGetCommunes, history } = props;
	const [selectedRegion, setSelectedRegion] = useState()
	const [selectedPref, setSelectedPrefecture] = useState()
	const [edit, setEdit] = useState([]);
	const [isSave, setIsSave] = useState(false)

	useEffect(() => {
		onGetRoles()
		onGetRegions()
		onGetPrefectures()
		onGetCommunes()
		setEdit(props.user)
	}, [onGetRoles, onGetRegions, onGetPrefectures, onGetCommunes]);

	const rolesList = roles.map(role => {
		return (
			<option value={role.id} key={role.id}>
				{role.name}
			</option>
		)
	})


	function handlFilterPrefecture(e) {
		setSelectedRegion(e.target.value);
	}

	function handlFilterCommune(e) {
		setSelectedPrefecture(e.target.value);
	}

	function getFilteredList(e) {
		if (!selectedRegion) {
			return prefectures.filter(item => item.regionId == edit?.region?.slug)
		} else {
			return prefectures.filter(item => item.regionId == selectedRegion)
		}

	}

	function getFilterPrefList() {
		if (!selectedPref) {
			return communes.filter(item => item.prefectureId == edit?.prefecture?.slug)
		} else {
			return communes.filter(item => item.prefectureId == selectedPref)
		}
	}

	var filteredList = useMemo(getFilteredList, [selectedRegion, prefectures])

	var filteredListCommune = useMemo(getFilterPrefList, [selectedPref, communes])

	const regionList = regions.map(region => {
		return (
			<option value={region.slug} key={region.slug}>
				{region.nom}
			</option>
		)
	})

	const prefectureList = filteredList.map(pref => {
		return (
			<option value={pref.slug} key={pref.slug}>
				{pref.nom}
			</option>
		)
	})

	const communeList = filteredListCommune.map(commune => {
		return (
			<option value={commune.slug} key={commune.slug}>
				{commune.nom}
			</option>
		)
	})


	const validation = useFormik({
		enableReinitialize: true,
		initialValues: {
			first_name: edit ? edit?.first_name : '',
			last_name: edit ? edit?.last_name : '',
			phone: edit ? edit?.phone : '',
			region: edit ? edit?.region?.slug : '',
			prefecture: edit ? edit?.prefecture?.slug : '',
			commune: edit ? edit?.commune?.slug : '',
			email: edit ? edit?.email : '',
			role: edit ? edit?.role?.id : '',
		},
		validationSchema: Yup.object({
			first_name: Yup
				.string("nom should be a string")
				.required("nom est obligatoire"),
			last_name: Yup
				.string("prenom should be a string")
				.required("le nombre de menage impacte est obligatoire"),
			phone: Yup
				.string("telephone should be a string")
				.required("telephone est obligatoire"),
			email: Yup
				.string("adresse should be a string")
				.required("adresse email est obligatoire"),
			role: Yup
				.string("role should be a string")
				.required("role est obligatoire"),
		}),
		onSubmit: values => {
			const updateUser = {
				id: edit ? edit.id : 0,
				first_name: values.first_name,
				last_name: values.last_name,
				email: values.email,
				region: values.region,
				prefecture: values.prefecture,
				commune: values.commune,
				phone: values.phone,
				role: values.role,
			}
			setIsSave(true)
			dispatch(onUpdateUtilisateur(updateUser));
			validation.resetForm()
			//props.onSubmitEdit()
			setIsSave(false)

		},
	})

	return (
		<>
			<Modal.Header style={{ backgroundColor: '#fff', }}>
				<Modal.Title>Modfication des utilisateurs </Modal.Title>
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
									name="last_name"
									type="type"
									onChange={validation.handleChange}
									onBlur={validation.handleBlur}
									value={validation.values.last_name || ""}
								/>
								{validation.touched.last_name &&
									validation.errors.last_name ? (
									<FormFeedback type="invalid">
										{validation.errors.last_name}
									</FormFeedback>
								) : null}
							</div>

							<div className="form-group col-md-12">
								<label>Prenom</label>
								<Input
									name="first_name"
									type="type"
									onChange={validation.handleChange}
									onBlur={validation.handleBlur}
									value={validation.values.first_name || ""}
								/>
								{validation.touched.first_name &&
									validation.errors.first_name ? (
									<FormFeedback type="invalid">
										{validation.errors.first_name}
									</FormFeedback>
								) : null}
							</div>

							<div className="form-group col-md-12">
								<label>Telephone</label>
								<Input
									name="phone"
									type="type"
									onChange={validation.handleChange}
									onBlur={validation.handleBlur}
									value={validation.values.phone || ""}
								/>
								{validation.touched.phone &&
									validation.errors.phone ? (
									<FormFeedback type="invalid">
										{validation.errors.phone}
									</FormFeedback>
								) : null}
							</div>

							<div className="form-group col-md-12">
								<label>Email</label>
								<Input
									name="email"
									type="email"
									onChange={validation.handleChange}
									onBlur={validation.handleBlur}
									value={validation.values.email || ""}
								/>
								{validation.touched.email &&
									validation.errors.email ? (
									<FormFeedback type="invalid">
										{validation.errors.email}
									</FormFeedback>
								) : null}
							</div>

							<div className="form-group col-md-12">
								<label>Selectionne role</label>
								<select name="role" id="role"
									onChange={(e) => { validation.handleChange(e); }}
									onBlur={validation.handleBlur}
									value={validation.values.role || ""}
									className="form-control">
									<option value="">selectionne une role</option>
									{rolesList}
								</select>
								{validation.touched.role &&
									validation.errors.role ? (
									<FormFeedback type="invalid">
										{validation.errors.role}
									</FormFeedback>
								) : null}
							</div>
							<div className="form-group col-md-6">
								<label>Selectionne region</label>
								<select name="region" id="region"
									onChange={(e) => { validation.handleChange(e); handlFilterPrefecture(e) }}
									onBlur={validation.handleBlur}
									value={validation.values.region || ""}
									className="form-control">
									<option value="">selectionne une region</option>
									{regionList}
								</select>
								{validation.touched.region &&
									validation.errors.region ? (
									<FormFeedback type="invalid">
										{validation.errors.role}
									</FormFeedback>
								) : null}
							</div>

							<div className="form-group col-md-6">
								<label className="form-label">Prefecture *</label>
								<select
									name="prefecture"
									id="prefecture"
									onChange={(e) => { validation.handleChange(e); handlFilterCommune(e) }}
									onBlur={validation.handleBlur}
									value={validation.values.prefecture || ""}
									className="form-control">
									<option value="">selectionne une prefecture</option>
									{prefectureList}
								</select>
								{validation.touched.prefecture &&
									validation.errors.prefecture ? (
									<FormFeedback type="invalid">
										{validation.errors.prefecture}
									</FormFeedback>
								) : null}
							</div>

							<div className="form-group col-md-12">
								<label className="form-label">Commune *</label>
								<select
									name="commune"
									id="commune"
									onChange={validation.handleChange}
									onBlur={validation.handleBlur}
									value={validation.values.commune || ""}
									className="form-control">
									<option value="">selectionne une commune</option>
									{communeList}
								</select>
								{validation.touched.commune &&
									validation.errors.commune ? (
									<FormFeedback type="invalid">
										{validation.errors.commune}
									</FormFeedback>
								) : null}
							</div>

						</div>
						<div className="form-group mt-2">
							<button type="button" onClick={props.onSubmitEdit} className="btn btn-danger">
								<i className="fa fa-times"></i> Fermer
							</button>

							<Button type="submit" style={{ backgroundColor: '#192957' }} disabled={isSave} className="btn m-1 float-end">
								{isSave && <span className="spinner-border spinner-border-sm mr-1"></span>}
								<i className='fa fa-save'></i> {isSave ? 'Modification ...' : 'Modifier'}
							</Button>
						</div>
					</Form>
				</CardBody>
			</Modal.Body>
		</>
	);
};

EditUsers.propTypes = {
	roles: PropTypes.array,
	onGetRoles: PropTypes.func,
	regions: PropTypes.array,
	onGetRegions: PropTypes.func,
	prefectures: PropTypes.array,
	onGetPrefectures: PropTypes.func,
	communes: PropTypes.array,
	onGetCommunes: PropTypes.func,
}

const mapStateToProps = ({ regions, prefectures, communes, roles }) => ({
	roles: roles.roles,
	regions: regions.regions,
	prefectures: prefectures.prefectures,
	communes: communes.communes,
})

const mapDispatchToProps = dispatch => ({
	onGetRoles: () => dispatch(getRoles()),
	onGetRegions: () => dispatch(getRegions()),
	onGetPrefectures: () => dispatch(getPrefectures()),
	onGetCommunes: () => dispatch(getCommunes()),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(EditUsers))