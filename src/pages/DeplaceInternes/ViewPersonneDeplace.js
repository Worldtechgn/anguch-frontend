import React, { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import { Card, Col, Container, Row, CardBody, FormGroup, Label, Form, Input, FormFeedback, Button, } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import * as Yup from 'yup';
import Modal from "react-bootstrap/Modal";
//Import actions
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import axiosApi from '../../helpers/api_helper';
import EncoursDeplaceinterne from './EncoursDeplaceinterne';

const ViewPersonneDeplace = props => {

	const { match: { params }, history } = props;
	const [edit, setEdit] = useState([]);
	const [isSave, setIsSave] = useState(false)
	const [lieuInstallation, setLieuInstallation] = useState([]);
	const [cause, setCauseDepart] = useState([]);
	const [autres, setAutres] = useState(false);
	const [autreCause, setAutreCause] = useState(false);

	const [showModalListe, setShowModalListe] = useState(false);
	const handleCloseModalListe = () => setShowModalListe(false);
	const handleShowModalListe = () => setShowModalListe(true);
	const [personneDeplaceInterne, setPersonneDeplaceInterne] = useState([]);



	const [selectedRegion] = useState()
	const [selectedPref] = useState()

	const [listeRegions, setRegions] = useState([]);
	const [listePrefectures, setPrefecture] = useState([]);
	const [listeCommunes, setCommune] = useState([]);

	useEffect(() => {
		fetchAllRegions();
		fetchAllPrefectures();
		fetchAllCommune();
		fetchEdit();
	}, []);

	function handleSelectCause(e) {
		//setCauseOption(data);
		e.forEach(el => {
			if (el.value === 'Autre') {
				setAutreCause(true)
			} else {
				setAutreCause(false)
			}
		});
	}

	function handleSelectLieux(e) {
		e.forEach(el => {
			if (el.value === 'Autre') {
				setAutres(true)
			} else {
				setAutres(false)
			}
		});
	}

	const fetchEdit = () => {
		axiosApi.get('/deplaceinterne/' + params.id).then(res => {
			setLieuInstallation(res.data.lieuInstallation)
			setCauseDepart(res.data.cause)
			setEdit(res.data);
			setPersonneDeplaceInterne(res.data.personneDeplaceinterne)
		})
	}

	const fetchAllRegions = () => {
		axiosApi.get('/region').then(res => {
			setRegions(res.data);
		})
	}

	const fetchAllPrefectures = () => {
		axiosApi.get('/prefecture').then(res => {
			setPrefecture(res.data);
		})
	}


	const fetchAllCommune = () => {
		axiosApi.get('/commune').then(res => {
			setCommune(res.data);
		})
	}

	function getFilteredList() {
		if (!selectedRegion) {
			return listePrefectures
		}
		return listePrefectures.filter(item => item.slug == selectedRegion)
	}

	function getFilterPrefList() {
		if (!selectedPref) {
			return listeCommunes
		}
		return listeCommunes.filter(item => item.slug == selectedPref)
	}

	var filteredList = useMemo(getFilteredList, [selectedRegion, listePrefectures])

	var filteredListCommune = useMemo(getFilterPrefList, [selectedPref, listeCommunes])

	const regions = listeRegions.map(region => {
		return (
			<option value={region.slug} key={region.slug}>
				{region.nom}
			</option>
		)
	})

	const prefectures = filteredList.map(pref => {
		return (
			<option value={pref.slug} key={pref.slug}>
				{pref.nom}
			</option>
		)
	})

	const communes = filteredListCommune.map(commune => {
		return (
			<option value={commune.slug} key={commune.slug}>
				{commune.nom}
			</option>
		)
	})

	const aliments = [
		{ value: "Stade/Terrain", label: "Stade/Terrain" },
		{ value: "Maison des jeunes", label: "Maison des jeunes" },
		{ value: "Ecoles", label: "Incendie" },
		{ value: "Familles d'accueil", label: "Familles d'accueil" },
		{ value: "Autre", label: "Autre (à préciser)" },
	];

	const causes = [
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
	];
	//const causes = edit.cause
	const validation = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,
		//Array.from(event.target.selectedOptions, (item) => item.value)
		initialValues: {
			id: (edit && edit?.id || 0),
			lieuProvenance: (edit && edit?.lieuProvenance) || "",
			date: (edit && edit?.date) || "",
			heure: (edit && edit?.heure) || "",
			nbreTotalPersonne: (edit && edit?.nbreTotalPersonne) || "",
			position: (edit && edit?.position) || "",
			difficulite: (edit && edit?.difficulite) || "",
			region: (edit && edit?.region?.slug) || "",
			prefecture: (edit && edit?.prefecture?.slug) || "",
			commune: (edit && edit?.commune?.slug) || "",
			lieuInstallation: (edit && edit.lieuInstallation) || [],
			autreLieuxInstallation: (edit && edit.autreLieuxInstallation) || '',
			autreCause: (edit && edit.autreCause) || '',
			cause: (edit && edit.cause) || []


		},
		validationSchema: Yup.object({
			lieuProvenance: Yup
				.string()
				.required("Le champ position est obligatoire"),
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
			difficulite: Yup
				.string()
				.required("Le champ difficulité rencontré est obligatoire")
		}),
		onSubmit: values => {
			values['lieuInstallation'] = lieuInstallation
			values['cause'] = cause

			console.log(values);
			const updateSite = {
				id: edit ? edit.id : 0,
				...values,
			}

			setIsSave(true)
			axiosApi.put('/deplaceinterne/' + edit.id, updateSite).then(res => {
				setIsSave(false)
				history.push("/liste-catastrophe")
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					toast: true,
					title: 'Modification effectué avec success',
					showConfirmButton: false,
					timer: 3500
				})

			}).catch(error => {
				setIsSave(false)
				console.log(error);
			})

		},
	})

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid={true}>
					<Breadcrumbs title="Formulaire" breadcrumbItem="Gestion des points focaux" />
					<Row>
						<Col lg={12}>
							<Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
								<CardBody>
									<Form className="needs-validation" onSubmit={e => {
										e.preventDefault()
										validation.handleSubmit()
										return false
									}}>

										<Row>
											<Col md={6}>
												<FormGroup className="mb-3">
													<div className="mb-3">
														<Label className="form-label">Lieux de provenance *</Label>
														<Input
															disabled
															name="lieuProvenance"
															type="text"
															onChange={validation.handleChange}
															onBlur={validation.handleBlur}
															value={validation.values.lieuProvenance || ""}
														/>
														{validation.touched.lieuProvenance &&
															validation.errors.lieuProvenance ? (
															<FormFeedback type="invalid">
																{validation.errors.lieuProvenance}
															</FormFeedback>
														) : null}
													</div>
												</FormGroup>
											</Col>

											<Col md={6}>
												<FormGroup className="mb-3">
													<div className="mb-3">
														<Label className="form-label">Date et heure du commencement de l'arrivée des personnes *</Label>
														<Input
															disabled
															name="date"
															type="datetime-local"
															onChange={validation.handleChange}
															onBlur={validation.handleBlur}
															value={validation.values.date || ""}
														/>
														{validation.touched.date &&
															validation.errors.date ? (
															<FormFeedback type="invalid">
																{validation.errors.date}
															</FormFeedback>
														) : null}
													</div>
												</FormGroup>
											</Col>

											<Col md={6}>
												<FormGroup className="mb-3">
													<div className="mb-3">
														<Label htmlFor="formrow-region-Input">Cause de depart *</Label>
														<Select name="cause"
															id="materiel_touches"
															labelColor="#dc3545"
															placeholder="Cause de depart"
															isDisabled={true}
															isMulti={true}
															className="select"
															isClearable={true}
															isSearchable={true}
															isLoading={false}
															isRtl={false}
															value={cause}
															closeMenuOnSelect={true}
															selected={cause}
															onChange={(e) => { setCauseDepart(e); handleSelectCause(e); }}
															options={causes}
														>
														</Select>
														{validation.touched.cause &&
															validation.errors.cause ? (
															<FormFeedback type="invalid">
																{validation.errors.cause}
															</FormFeedback>
														) : null}
													</div>
												</FormGroup>
											</Col>
											{
												edit.autreCause || autreCause ? <div className="col-md-6">
													<FormGroup className="mb-3">
														<div className="mb-3">
															<Label className="form-label">Autre (à préciser) *</Label>
															<Input
																disabled
																name="autreCause"
																type="text"
																onChange={validation.handleChange}
																onBlur={validation.handleBlur}
																value={validation.values.autreCause || ""}
															/>
															{validation.touched.autreCause &&
																validation.errors.autreCause ? (
																<FormFeedback type="invalid">
																	{validation.errors.autreCause}
																</FormFeedback>
															) : null}
														</div>
													</FormGroup>
												</div> : ''
											}


											<Col md={6}>
												<FormGroup className="mb-3">
													<div className="mb-3">
														<Label htmlFor="formrow-region-Input">Lieux d'installation *</Label>
														<Select name="lieuInstallation"
															id="type_denres"
															labelColor="#dc3545"
															placeholder="Lieux d'installation"
															isMulti={true}
															className="select"
															isClearable={true}
															isSearchable={true}
															isDisabled={true}
															isLoading={false}
															isRtl={false}
															closeMenuOnSelect={false}
															value={lieuInstallation}
															selected={lieuInstallation}
															onChange={(e) => { setLieuInstallation(e); handleSelectLieux(e) }}
															options={aliments}>
														</Select>
														{validation.touched.lieuInstallation &&
															validation.errors.lieuInstallation ? (
															<FormFeedback type="invalid">
																{validation.errors.lieuInstallation}
															</FormFeedback>
														) : null}
													</div>
												</FormGroup>
											</Col>
											{
												edit.autreLieuxInstallation || autres ? <div className="col-md-6">
													<FormGroup className="mb-3">
														<div className="mb-3">
															<Label className="form-label">Autre (à préciser) *</Label>
															<Input
																name="autreLieuxInstallation"
																disabled
																type="text"
																onChange={validation.handleChange}
																onBlur={validation.handleBlur}
																value={validation.values.autreLieuxInstallation || ""}
															/>
															{validation.touched.autreLieuxInstallation &&
																validation.errors.autreLieuxInstallation ? (
																<FormFeedback type="invalid">
																	{validation.errors.autreLieuxInstallation}
																</FormFeedback>
															) : null}
														</div>
													</FormGroup>
												</div> : ''
											}
											<Col md={6}>
												<FormGroup className="mb-3">
													<div className="mb-3">
														<Label className="form-label">Position de famille *</Label>
														<Input
															name="position"
															type="text"
															disabled
															onChange={validation.handleChange}
															onBlur={validation.handleBlur}
															value={validation.values.position || ""}
														/>
														{validation.touched.position &&
															validation.errors.position ? (
															<FormFeedback type="invalid">
																{validation.errors.position}
															</FormFeedback>
														) : null}
													</div>
												</FormGroup>
											</Col>

											<Col md={6}>
												<FormGroup className="mb-3 row">
													<Label className="form-label">Nombre total des personnes *</Label>
													<div className="mb-3 col-9">
														<Input
															name="nbreTotalPersonne"
															disabled
															type="number"
															onChange={validation.handleChange}
															onBlur={validation.handleBlur}
															value={validation.values.nbreTotalPersonne || ""}
														/>
														{validation.touched.nbreTotalPersonne &&
															validation.errors.nbreTotalPersonne ? (
															<FormFeedback type="invalid">
																{validation.errors.nbreTotalPersonne}
															</FormFeedback>
														) : null}
													</div>
													<div className="col-md-3">
														{/* <Button type='button' className='btn' style={{ backgroundColor: '#192957' }} onClick={handleShowModal}> <i className='fa fa-plus'></i> </Button>{" "} */}
														<button type='button' className='btn btn-info' onClick={handleShowModalListe}> <i className='fa fa-list'></i> </button>
													</div>
												</FormGroup>
											</Col>

											<Col md={6}>
												<FormGroup className="mb-3">
													<div className="mb-3">
														<Label htmlFor="formrow-region-Input">Region *</Label>
														<select
															name="region"
															disabled
															onChange={(e) => { validation.handleChange(e); fetchAllPrefectures(e) }}
															onBlur={validation.handleBlur}
															value={validation.values.region || ""}
															className="form-control">
															<option value="">Selectionne une region</option>
															{regions}
														</select>
														{validation.touched.region &&
															validation.errors.region ? (
															<FormFeedback type="invalid">
																{validation.errors.region}
															</FormFeedback>
														) : null}
													</div>
												</FormGroup>
											</Col>
											<Col md={6}>
												<FormGroup className="mb-3">
													<div className="mb-3">
														<Label htmlFor="formrow-prefecture-Input">Prefecture *</Label>
														<select
															name="prefecture"
															id="prefecture"
															disabled
															onChange={(e) => { validation.handleChange(e); fetchAllCommune(e) }}
															onBlur={validation.handleBlur}
															value={validation.values.prefecture || ""}
															className="form-control">
															<option value="">selectionne une prefecture</option>
															{prefectures}
														</select>
														{validation.touched.prefecture &&
															validation.errors.prefecture ? (
															<FormFeedback type="invalid">
																{validation.errors.prefecture}
															</FormFeedback>
														) : null}
													</div>
												</FormGroup>
											</Col>

											<Col md={6}>
												<FormGroup className="mb-3">
													<div className="mb-3">
														<Label htmlFor="formrow-commune-Input">Commmune</Label>
														<select
															name="commune"
															disabled
															id="commune"
															onChange={(e) => { validation.handleChange(e); }}
															onBlur={validation.handleBlur}
															value={validation.values.commune || ""}
															className="form-control">
															<option value="">selectionne une commune</option>
															{communes}
														</select>
														{validation.touched.commune &&
															validation.errors.commune ? (
															<FormFeedback type="invalid">
																{validation.errors.commune}
															</FormFeedback>
														) : null}
													</div>
												</FormGroup>
											</Col>
											<Col md={12}>
												<FormGroup className="mb-3">
													<div className="mb-3">
														<Label className="form-label">Difficulité *</Label>
														<Input
															name="difficulite"
															disabled
															type="textarea"
															onChange={validation.handleChange}
															onBlur={validation.handleBlur}
															value={validation.values.difficulite || ""}
														/>
														{validation.touched.difficulite &&
															validation.errors.difficulite ? (
															<FormFeedback type="invalid">
																{validation.errors.difficulite}
															</FormFeedback>
														) : null}
													</div>
												</FormGroup>
											</Col>
										</Row>
										<div className="form-group mt-5">
											<Button color="danger" onClick={() => {
												history.push('/list-deplace-interne')
											}} className="waves-effect waves-light">
												<i className="fa fa-times"></i> Fermer
											</Button>{" "}
										</div>
									</Form>
								</CardBody>
							</Card>

							<Modal
								size="lg"
								show={showModalListe}
								onHide={handleCloseModalListe}
								animation={true}
								backdrop="static"
								keyboard={false}
								centered >
								<EncoursDeplaceinterne
									countInterne={personneDeplaceInterne}
									onCloseListe={handleCloseModalListe} />
							</Modal>
						</Col>
					</Row>
				</Container>
			</div>
		</React.Fragment>
	);
}


export default ViewPersonneDeplace

