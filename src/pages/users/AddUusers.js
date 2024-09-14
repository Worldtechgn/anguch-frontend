import { useEffect, useMemo, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types"
import * as Yup from 'yup';
import { Button, CardBody } from "reactstrap";
import {
	getCommunes,
	getPrefectures,
	getRegions,
	getRoles,
	addNewUtilisateur as onAddNewUtilisateur,
} from "../../store/actions";


const AddUsers = props => {
	const dispatch = useDispatch();
	const { roles, onGetRoles, regions, onGetRegions, prefectures, onGetPrefectures, communes, onGetCommunes, history } = props;
	const [selectedRegion, setSelectedRegion] = useState("")
	const [selectedPref, setSelectedPrefecture] = useState("")

	useEffect(() => {
		onGetRoles()
		onGetRegions()
		onGetPrefectures()
		onGetCommunes()
	}, [onGetRoles, onGetRegions, onGetPrefectures, onGetCommunes])

	const [filterPrefectures, setFilterPrefectures] = useState([])
	const fetchPrefecture = (e) => {
		// setSelectedRegion(e.target.value);
		setFilterPrefectures(
			prefectures.filter(item => item.regionId == e.target.value)
		)
	}

	const [filterCommunes, setFiltercommunes] = useState([])
	const fetchCommune = (e) => {
		// setSelectedPrefecture(e.target.value);
		setFiltercommunes(
			communes.filter(item => item.prefectureId == e.target.value)
		)
	}

	function getFilteredList() {
		if (!selectedRegion) {
			return prefectures
		}
		return prefectures.filter(item => item.regionId == selectedRegion)
	}

	function getFilterPrefList() {
		if (!selectedPref) {
			return communes
		}
		return communes.filter(item => item.prefectureId == selectedPref)
	}

	var filteredList = useMemo(getFilteredList, [selectedRegion, prefectures])
	var filteredListCommune = useMemo(getFilterPrefList, [selectedPref, communes])

	const regionsList = regions.map((region, index) => {
		return (
			<option value={region.slug} key={index}>
				{region.nom}
			</option>
		)
	})

	const rolesList = roles.map(role => {
		return (
			<option value={role.id} key={role.id}>
				{role.name}
			</option>
		)
	})

	const initialValues = {
		first_name: '',
		last_name: '',
		commune: '',
		region: '',
		prefecture: '',
		phone: '',
		email: '',
		role: '',
	};

	const validationSchema = Yup.object().shape({
		first_name: Yup
			.string("nom should be a string")
			.required("nom est obligatoire"),
		last_name: Yup
			.string("prenom should be a string")
			.required("le nombre de menage impacte est obligatoire"),
		phone: Yup
			.string("telephone should be a string")
			.required("telephone est obligatoire"),
		commune: Yup
			.string("commune should be a string"),
		region: Yup
			.string("region should be a string"),
		prefecture: Yup
			.string("prefecture should be a string"),
		email: Yup
			.string("adresse should be a string")
			.required("adresse email est obligatoire"),
		role: Yup
			.string("role should be a string")
			.required("role est obligatoire"),

	});


	const onSubmitUser = (fields, { setStatus, setSubmitting }) => {
		setStatus();
		dispatch(onAddNewUtilisateur(fields));
		props.onClose();
		setSubmitting(false);
	}

	return (
		<>
			<Modal.Header style={{ backgroundColor: '#fff', }}>
				<Modal.Title>Enregistrement des utilisateurs </Modal.Title>
			</Modal.Header>
			<Modal.Body style={{ backgroundColor: '#fff', }}>
				<CardBody>
					<Formik onChange={() => {
						console.log('changing');
					}} initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmitUser}>
						{({ errors, touched, isSubmitting, handleChange }) => {
							return (
								<>
									<Form>
										<div className="row form-row">
											<div className="form-group col-md-12">
												<label>Nom</label>
												<Field name="first_name" type="text" className={'form-control' + (errors.first_name && touched.first_name ? ' is-invalid' : '')} />
												<ErrorMessage name="first_name" component="div" className="invalid-feedback" />
											</div>
											<div className="form-group col-md-12">
												<label>Prenom</label>
												<Field name="last_name" type="text" className={'form-control' + (errors.last_name && touched.last_name ? ' is-invalid' : '')} />
												<ErrorMessage name="last_name" component="div" className="invalid-feedback" />
											</div>

											<div className="form-group col-md-12">
												<label>Telephone</label>
												<Field name="phone" type="text" className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')} />
												<ErrorMessage name="phone" component="div" className="invalid-feedback" />
											</div>
											<div className="form-group col-md-12">
												<label>Email</label>
												<Field name="email" type="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
												<ErrorMessage name="email" component="div" className="invalid-feedback" />
											</div>

											<div className="form-group col-md-12">
												<label>Role</label>
												<Field name="role" as="select"
													className={'form-control' + (errors.role && touched.role ? ' is-invalid' : '')} >
													<option value="">Selectionne un role </option>
													{rolesList}
												</Field>
												<ErrorMessage name="role" component="div" className="invalid-feedback" />
											</div>

											<div className="form-group col-md-6" id="idRegion">
												<label>Region</label>
												<Field name="region" as="select"
													onChange={(e) => { handleChange(e); fetchPrefecture(e) }}
													className={'form-control' + (errors.region && touched.region ? ' is-invalid' : '')} >
													<option value="">Selectionne une region</option>
													{regionsList}
												</Field>
												<ErrorMessage name="region" component="div" className="invalid-feedback" />
											</div>

											<div className="form-group col-md-6" id="idPrefecture">
												<label>Préfecture</label>
												<Field name="prefecture" as="select"
													onChange={(e) => { handleChange(e); fetchCommune(e) }}
													className={'form-control' + (errors.prefecture && touched.prefecture ? ' is-invalid' : '')} >
													<option value="">Selectionne une prefecture</option>
													{filterPrefectures.map((pref,index)=><option value={pref.slug} key={index}>{pref.nom}</option>)}
												</Field>
												<ErrorMessage name="prefecture" component="div" className="invalid-feedback" />
											</div>

											<div className="form-group col-md-12" id="idCommune">
												<label>Commune</label>
												<Field name="commune" as="select" className={'form-control' + (errors.commune && touched.commune ? ' is-invalid' : '')} >
													<option value="">Selectionne une commune</option>
													{filterCommunes.map((commune,index)=> <option value={commune.slug} key={index}>{commune.nom}</option>)}
												</Field>
												<ErrorMessage name="commune" component="div" className="invalid-feedback" />
											</div>
										</div>
										<div className="form-group mt-3">
											<button type="button" onClick={props.onClose} className="btn btn-danger">
												<i className="fa fa-times"></i> Fermer
											</button>
											<Button type="submit" style={{ backgroundColor: '#192957' }} disabled={isSubmitting} className="btn m-1 float-end">
												{isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
												<i className='fa fa-save'></i> Enregister
											</Button>
										</div>
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

AddUsers.propTypes = {
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
)(withRouter(AddUsers))