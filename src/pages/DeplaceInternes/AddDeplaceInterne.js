import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Card, Col, Container, Row, CardBody, Button, } from "reactstrap"
import Modal from "react-bootstrap/Modal";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import axiosApi from '../../helpers/api_helper';
import { MDBInput } from 'mdbreact';
import Swal from 'sweetalert2';
import AddPersonneDeplace from './AddPersonneDeplace';
import EncoursDeplaceinterne from './EncoursDeplaceinterne';

const AddDeplaceInterne = ({ history }) => {

	const [listeRegions, setRegions] = useState([]);
	const [listePrefectures, setPrefecture] = useState([]);
	const [listeCommunes, setCommune] = useState([]);
	const [selectedLieuxInstallation, setSelectedLieuxInstallation] = useState();
	const [selectedCause, setCauseOption] = useState();
	const [isAddPerTotal, setIsAddPerTotal] = useState(false);
	const [perTotal, setSerTotal] = useState(null);
	const [autres, setAutres] = useState(false);
	const [autreCause, setAutreCause] = useState(false);
	const [valueLieu, setValueLieux] = useState("");
	const [valueCause, setValueCause] = useState("");
	const [mouvement, setMouvement] = useState([]);
	const [counts, setCounts] = useState(null);
	const [countInterne, setDeplaceinterne] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const handleCloseModal = () => setShowModal(false);
	const handleShowModal = () => setShowModal(true);

	const [showModalListe, setShowModalListe] = useState(false);
	const handleCloseModalListe = () => setShowModalListe(false);
	const handleShowModalListe = () => setShowModalListe(true);

	const onSubmitAddPersonne = () => {
		fetchAllDeplaceinterne();
		fetchAllCount();
		setShowModal(false);
	};

	const fetchAllDeplaceinterne = () => {
		axiosApi.get('/personne/deplaceinterne-encours').then(res => {
			setDeplaceinterne(res.data);
		})
	}

	const fetchAllCount = () => {
		axiosApi.get('/personne/count').then(res => {
			setCounts(res.data);
		})
	}

	function handleSelectLieux(data) {
		setSelectedLieuxInstallation(data);
		data.forEach(e => {
			if (e.value === 'Autre') {
				setAutres(true)
			} else {
				setAutres(false)
			}
		});
	}

	function handlePersonne(d) {
		setSerTotal(d.target.value)
		if (d.target.value !== null) {
			setIsAddPerTotal(true)
		} else if (d.target.value === 'null' || d.target.value === null) {
			setIsAddPerTotal(false)
		}
	}

	function autreLieuxInstallation(d) {
		if (d.target.value !== null) {
			setValueLieux(d.target.value);
		}
	}

	function autreCauseDepart(d) {
		if (d.target.value !== null) {
			setValueCause(d.target.value);
		}
	}

	function handleSelectCause(data) {
		setCauseOption(data);
		data.forEach(e => {
			if (e.value === 'Autre') {
				setAutreCause(true)
			} else {
				setAutreCause(false)
			}
		});
	}

	useEffect(() => {
		fetchAllRegions();
		fetchAllDeplaceinterne();
		fetchAllCount();
		fetchAllMouv();
	}, []);

	const fetchAllRegions = () => {
		axiosApi.get('/region').then(res => {
			setRegions(res.data);
		})
	}

	const fetchAllMouv = () => {
		axiosApi.get('/deplaceinterne/mouvement').then(res => {
			setMouvement(res.data);
		})
	}

	const fetchPrefecture = (e) => {
		let region = e.target.value
		if (region) {
			axiosApi.get('/prefecture/region/' + region).then(res => {
				setPrefecture(res.data);
			})
		}
	}

	const fetchCommune = (e) => {
		let prefecture = e.target.value
		if (prefecture) {
			axiosApi.get('/commune/prefecture/' + prefecture).then(res => {
				setCommune(res.data);
			})
		}
	}

	const regions = listeRegions.map((region, index) => {
		return (
			<option value={region.slug} key={index}>
				{region.nom}
			</option>
		)
	})

	const prefectures = listePrefectures.map((pref, index) => {
		return (
			<option value={pref.slug} key={index}>
				{pref.nom}
			</option>
		)
	})

	const communes = listeCommunes.map((commune, index) => {
		return (
			<option value={commune.slug} key={index}>
				{commune.nom}
			</option>
		)
	})

	const initialValues = {
		position: '',
		date: '',
		cause: '',
		lieuProvenance: '',
		lieuxInstallation: '',
		region: '',
		prefecture: '',
		commune: '',
	};

	const validationSchema = Yup.object().shape({
		position: Yup
			.string()
			.required("Le champ position est obligatoire"),
		date: Yup
			.string()
			.required("Date d'arrivé est obligatoire"),
		region: Yup
			.string()
			.required("Le champ region est obligatoire"),
		prefecture: Yup
			.string()
			.required("Le champ prefecture est obligatoire"),
		commune: Yup
			.string()
			.required("Le champ commune est obligatoire"),
		lieuProvenance: Yup
			.string()
			.required("Le champ lieux de provenace est obligatoire"),
		difficulite: Yup
			.string()
			.required("Le champ difficulité rencontré est obligatoire")
	});

	const onSubmit = (fields, { setStatus, setSubmitting }) => {
		setStatus();
		if (counts === parseInt(perTotal)) {
			createDeplaceinterne(fields, setSubmitting);
		} else {
			Swal.fire({
				toast: true,
				position: 'top-end',
				text: 'Veuillez verifier le nombre des personnes ajouter',
				icon: 'error',
				showConfirmButton: false,
				timer: 3000
			})
		}
		setSubmitting(false);
	}

	function createDeplaceinterne(fields, setSubmitting) {
		fields['cause'] = selectedCause;
		fields['nbreTotalPersonne'] = perTotal;
		fields['lieuInstallation'] = selectedLieuxInstallation;
		fields['autreCause'] = valueCause;
		fields['autreLieuxInstallation'] = valueLieu;

		axiosApi.post('/deplaceinterne', fields).then(res => {
			if (res.data.statut == 300) {
				Swal.fire({
					toast: true,
					position: 'top-end',
					text: res?.data?.message,
					icon: 'warning',
					showConfirmButton: false,
					timer: 2000
				})
			} else {
				history.push('/list-deplace-interne')
				Swal.fire({
					toast: true,
					position: 'top-end',
					text: 'Enregistrement effectué avec success.',
					icon: 'success',
					showConfirmButton: false,
					timer: 2000
				})
			}
		}).catch(error => {
			Swal.fire({
				toast: true,
				position: 'top-end',
				text: error ? error?.message : 'Enregistrement nom effectué avec success.',
				icon: 'error',
				showConfirmButton: false,
				timer: 2000
			})
		})
		setSubmitting(false);
	}

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid={true}>
					<Breadcrumbs title="Formulaire" breadcrumbItem="Gestion des personne" />
					<Row>
						<Col lg={12}>
							<Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
								<CardBody>
									<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
										{({ errors, touched, isSubmitting, handleChange }) => {
											return (
												<>
													<Form>
														<div className="row form-row">
															<div className="form-group col-md-6">
																<label>Lieux de provenance *</label>
																<Field name="lieuProvenance" type="text" className={'form-control' + (errors.lieuProvenance && touched.lieuProvenance ? ' is-invalid' : '')} />
																<ErrorMessage name="lieuProvenance" component="div" className="invalid-feedback" />
															</div>

															<div className="form-group col-md-6">
																<label>Date et heure du commencement de l'arrivée des personnes *</label>
																<Field name="date" type="datetime-local" className={'form-control' + (errors.date && touched.date ? ' is-invalid' : '')} />
																<ErrorMessage name="date" component="div" className="invalid-feedback" />
															</div>

															<div className="form-group col-md-6">
																<label>Cause de déplacement *</label>
																<Select name="cause"
																	isMulti
																	placeholder="Type de catastrophe "
																	isClearable={true}
																	isSearchable={true}
																	isDisabled={false}
																	isLoading={false}
																	isRtl={false}
																	value={selectedCause}
																	closeMenuOnSelect={false}
																	onChange={handleSelectCause}
																	options={[
																		{ value: "Sècheresse", label: "Sècheresse" },
																		{ value: "Inondation", label: "Inondation" },
																		{ value: "Incendie", label: "Incendie" },
																		{ value: "Tornades", label: "Tornades" },
																		{ value: "Feux de brousse", label: "Feux de brousse" },
																		{ value: "Volcan", label: "Volcan" },
																		{ value: "Conflits", label: "Conflits" },
																		{ value: "Epidémie", label: "Epidémie" },
																		{ value: "Tremblement de terre", label: "Tremblement de terre" },
																		{ value: "Glissement de terrain", label: "Glissement de terrain" },
																		{ value: "Eboulement", label: "Eboulement" },
																		{ value: "Invasion d'insecte", label: "Invasion d'insecte" },
																		{ value: "Séisme", label: "Séisme" },
																		{ value: "Conflits", label: "Conflits" },
																		{ value: "Autre", label: "Autre (à préciser)" },

																	]}
																	className={'' + (errors.cause && touched.cause ? ' is-invalid' : '')} >
																</Select>
																<ErrorMessage name="cause" component="div" className="invalid-feedback" />
															</div>

															{
																autreCause ?
																	<div className="form-group col-md-6">
																		<label>Autre à préciser cause de déplacement </label>
																		<Field name="autreCause" onChange={autreCauseDepart} type="text" className={'form-control' + (errors.autreCause && touched.autreCause ? ' is-invalid' : '')} />
																		<ErrorMessage name="autreCause" component="div" className="invalid-feedback" />
																	</div> : ''
															}

															<div className="form-group col-md-6">
																<label>Lieux d'installation *</label>
																<Select name="lieuxInstallation"
																	isMulti
																	placeholder="Lieux d'installation "
																	isClearable={true}
																	isSearchable={true}
																	isDisabled={false}
																	isLoading={false}
																	isRtl={false}
																	value={selectedLieuxInstallation}
																	closeMenuOnSelect={false}
																	onChange={handleSelectLieux}
																	options={[
																		{ value: "Stade/Terrain", label: "Stade/Terrain" },
																		{ value: "Maison des jeunes", label: "Maison des jeunes" },
																		{ value: "Ecoles", label: "Incendie" },
																		{ value: "Familles d'accueil", label: "Familles d'accueil" },
																		{ value: "Autre", label: "Autre (à préciser)" },

																	]}
																	className={'' + (errors.lieuxInstallation && touched.lieuxInstallation ? ' is-invalid' : '')} >
																</Select>
																<ErrorMessage name="lieuxInstallation" component="div" className="invalid-feedback" />
															</div>
															{
																autres ?
																	<div className="form-group col-md-6">
																		<label>Autre à préciser de lieux Installation</label>
																		<Field name="autreLieuxInstallation" onChange={autreLieuxInstallation} type="text" className={'form-control' + (errors.autreLieuxInstallation && touched.autreLieuxInstallation ? ' is-invalid' : '')} />
																		<ErrorMessage name="autreLieuxInstallation" component="div" className="invalid-feedback" />
																	</div> : ''
															}

															<div className="form-group col-md-6">
																<label>Position dans la famille *</label>
																<Field name="position" type="text" className={'form-control' + (errors.position && touched.position ? ' is-invalid' : '')} />
																<ErrorMessage name="position" component="div" className="invalid-feedback" />
															</div>

															<div className="form-group input-container col-md-6 row">
																<label>Nombre total des personnes affectés *</label>
																<div className="input-group-prepend col-md-9">
																	<Field name="nbreTotalPersonne" onChange={handlePersonne} type="number" className={'form-control input-field' + (errors.nbreTotalPersonne && touched.nbreTotalPersonne ? ' is-invalid' : '')} />
																	<ErrorMessage name="nbreTotalPersonne" component="div" className="invalid-feedback" />
																</div>
																<div className="input-group-prepend col-md-3">
																	{isAddPerTotal ? <Button type='button' className='btn' style={{ backgroundColor: '#192957' }} onClick={handleShowModal}> <i className='fa fa-plus'></i> </Button> : ''}{" "}
																	{countInterne.length > 0 ? <button type='button' className='btn btn-info' onClick={handleShowModalListe}> <i className='fa fa-list'></i> </button> : ''}
																</div>
															</div>

															<div className="form-group col-md-6">
																<label>Region *</label>
																<Field name="region" as="select"
																	onChange={(e) => { handleChange(e); fetchPrefecture(e) }}
																	className={'form-control' + (errors.region && touched.region ? ' is-invalid' : '')} >
																	<option value="">Selectionne une region</option>
																	{regions}
																</Field>
																<ErrorMessage name="region" component="div" className="invalid-feedback" />
															</div>

															<div className="form-group col-md-6">
																<label>Préfecture </label>
																<Field name="prefecture" as="select"
																	onChange={(e) => { handleChange(e); fetchCommune(e) }}
																	className={'form-control' + (errors.prefecture && touched.prefecture ? ' is-invalid' : '')} >
																	<option value="">Selectionne une prefecture</option>
																	{prefectures}
																</Field>
																<ErrorMessage name="prefecture" component="div" className="invalid-feedback" />
															</div>

															<div className="form-group col-md-6">
																<label>Commune </label>
																<Field name="commune" as="select" className={'form-control' + (errors.commune && touched.commune ? ' is-invalid' : '')} >
																	<option value="">Selectionne une commune</option>
																	{communes}
																</Field>
																<ErrorMessage name="commune" component="div" className="invalid-feedback" />
															</div>

															<div className="form-group col-md-12">
																<label>Difficulité *</label>
																<Field as={MDBInput} name="difficulite" type="textarea" className={'form-control' + (errors.difficulite && touched.difficulite ? ' is-invalid' : '')} />
																<ErrorMessage name="difficulite" component="div" className="invalid-feedback" />
															</div>
														</div>

														<div className="form-group mt-2">
															<Button type="submit" style={{ backgroundColor: '#192957' }} disabled={isSubmitting} className="btn m-1 float-end">
																{isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
																<i className='fa fa-save'></i> Enregister
															</Button>

															<Button color="danger" onClick={() => {
																history.push('/list-deplace-interne')
															}} className="waves-effect waves-light">
																<i className="fa fa-times"></i> Fermer
															</Button>{" "}
														</div>
													</Form>
												</>
											);
										}}
									</Formik>
								</CardBody>
							</Card>
						</Col>
						<Modal
							size="lg"
							show={showModal}
							onHide={handleCloseModal}
							animation={true}
							backdrop="static"
							keyboard={false}
							centered>
							<AddPersonneDeplace
								perTotal={perTotal}
								onSubmit={onSubmitAddPersonne}
								onClose={onSubmitAddPersonne}
							/>
						</Modal>

						<Modal
							size="lg"
							show={showModalListe}
							onHide={handleCloseModalListe}
							animation={true}
							backdrop="static"
							keyboard={false}
							centered
						>
							<EncoursDeplaceinterne
								countInterne={countInterne}
								onCloseListe={handleCloseModalListe}
							/>
						</Modal>
					</Row>
				</Container>
			</div>
		</React.Fragment >
	);
};

export default AddDeplaceInterne;