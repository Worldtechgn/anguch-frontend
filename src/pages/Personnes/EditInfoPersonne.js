import React, { useEffect, useMemo, useState } from 'react';

import {
	Card,
	Col,
	Container,
	Row,
	CardBody,
	FormGroup,
	Label,
	Form,
	Input,
	FormFeedback,
	Button,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux"
import PropTypes from "prop-types"
import * as Yup from 'yup';
import { useFormik } from 'formik';
//Import actions
import { getPersonneDetail } from "../../store/actions"
//SweetAlert
import axiosApi from '../../helpers/api_helper';
import Swal from 'sweetalert2';


const EditInfoPersonne = props => {
	const { personne, match: { params }, onGetPersonne, history } = props;

	useEffect(() => {
		if (params && params.id) {
			onGetPersonne(params.id)
		} else {
			onGetPersonne(1)
		}
	}, [onGetPersonne, params])

	const validation = useFormik({
		enableReinitialize: true,

		initialValues: {
			nom: (personne && personne.nom) || "",
			prenom: (personne && personne.prenom) || "",
			email: (personne && personne.email) || "",
			age: (personne && personne.age) || 0,
			telephone: (personne && personne.telephone) || "",
			vulnerabilite: (personne && personne.vulnerabilite) || "",
			situationMatrimonial: (personne && personne.situationMatrimonial) || "",
			situationSanitaire: (personne && personne.situationSanitaire) || "",
			region: (personne && personne?.region?.slug) || "",
			prefecture: (personne && personne?.prefecture?.slug) || "",
			commune: (personne && personne?.commune?.slug) || "",
			dateArrive: (personne && personne.dateArrive) || "",
			codeOim: (personne && personne.codeOim) || "",
			observation: (personne && personne.observation) || "",
			pointEntre: (personne && personne.pointEntre) || "",
			profession: (personne && personne.profession) || "",
			paysProvenance: (personne && personne.paysProvenance) || "",
			sexe: (personne && personne.sexe) || "",
			type: (personne && personne.type) || ""
		},
		validationSchema: Yup.object({
			nom: Yup
				.string()
				.required("Le champ nom est obligatoire"),
			vulnerabilite: Yup
				.string()
				.required("Le champ vulnerabilite est obligatoire"),
			situationMatrimonial: Yup
				.string()
				.oneOf(["Marié", "Célibataire", "Divorcé", "Veuve"])
				.required("Le champ situation matrimonial est obligatoire"),
			situationSanitaire: Yup
				.string()
				.required("Le situation sanitaire est obligatoire"),
			dateArrive: Yup
				.string()
				.required("Date d'arrivé est obligatoire"),
			prenom: Yup
				.string()
				.required("Le champ prenom est obligatoire"),
			region: Yup
				.string()
				.required("Le champ region est obligatoire"),
			prefecture: Yup
				.string()
				.required("Le champ prefecture est obligatoire"),
			commune: Yup
				.string()
				.required("Le champ commune est obligatoire"),
			codeOim: Yup
				.string()
				.required("Le champ code oim est obligatoire"),
			pointEntre: Yup
				.string()
				.required("Le point d'entrée est obligatoire"),
			age: Yup
				.number()
				.min(18)
				.required("Le champ age est obligatoire"),
			telephone: Yup
				.string()
				.required("Le champ téléphone est obligatoire"),
			profession: Yup
				.string()
				.required("Le champ profession est obligatoire"),
			sexe: Yup
				.string()
				.oneOf(["Homme", "Femme"])
				.required("Le champ sexe est obligatoire"),
			type: Yup
				.string()
				.oneOf(["Deplace interne", "Migrant", "Réfugie"])
				.required("Le champ type est obligatoire"),
			paysProvenance: Yup
				.string()
				.required("Le champ pays provenace est obligatoire"),
			email: Yup
				.string("email should be a string")
				.email("Veuillez fournir une adresse email valide")
		}),
		onSubmit: values => {
			const onUpdatePersonne = {
				id: personne ? personne.id : 0,
				nom: values.nom,
				prenom: values.prenom,
				email: values.email,
				age: values.age,
				telephone: values.telephone,
				vulnerabilite: values.vulnerabilite,
				situationMatrimonial: values.situationMatrimonial,
				situationSanitaire: values.situationSanitaire,
				region: values?.region?.slug,
				prefecture: values?.prefecture?.slug,
				commune: values?.commune?.slug,
				dateArrive: values.dateArrive,
				codeOim: values.codeOim,
				observation: values.observation,
				pointEntre: values.pointEntre,
				profession: values.profession,
				paysProvenance: values.paysProvenance,
				sexe: values.sexe,
				type: values.type
			}
			//updatePersonne(personne.id, onUpdatePersonne);
			axiosApi.put('/personne/' + personne.id, onUpdatePersonne).then(res => {
				if (res.data.statut == 300) {
					Swal.fire({
						toast: true,
						position: 'top-end',
						text: res?.data?.message,
						icon: 'warning',
						showConfirmButton: false,
						timer: 3000
					})
				} else {
					if (res.data.type == 'Migrant') {
						history.push('/list-migrant')
						Swal.fire({
							toast: true,
							position: 'top-end',
							text: 'Modification effectué avec success.',
							icon: 'success',
							showConfirmButton: false,
							timer: 3000
						})
					} else if (res.data.type == 'Réfugie') {
						history.push('/list-refugie')
						Swal.fire({
							toast: true,
							position: 'top-end',
							text: 'Modification effectué avec success.',
							icon: 'success',
							showConfirmButton: false,
							timer: 3000
						})
					} else if (res.data.type == 'Deplace interne') {
						history.push('/list-deplace-interne')
						Swal.fire({
							toast: true,
							position: 'top-end',
							text: 'Modification effectué avec success.',
							icon: 'success',
							showConfirmButton: false,
							timer: 3000
						})
					}
				}
			}).catch(() => {
				Swal.fire({
					toast: true,
					position: 'top-end',
					text: 'Modification nom effectué avec success.',
					icon: 'error',
					showConfirmButton: false,
					timer: 3000
				})
			})
		},
	})

	//filtre region et prefecture
	const [selectedRegion] = useState()
	const [selectedPref] = useState()

	const [listeRegions, setRegions] = useState([]);
	const [listePrefectures, setPrefecture] = useState([]);
	const [listeCommunes, setCommune] = useState([]);

	useEffect(() => {
		fetchAllRegions();
		fetchAllPrefectures();
		fetchAllCommune();
	}, []);

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
		return listePrefectures.filter(item => item.slug === selectedRegion)
	}

	function getFilterPrefList() {
		if (selectedPref !== "") {
			return listeCommunes
		}
		return listeCommunes.filter(item => item.slug === selectedPref)
	}

	var filteredList = useMemo(getFilteredList, [selectedRegion, listePrefectures])

	var filteredListCommune = useMemo(getFilterPrefList, [selectedPref, listeCommunes])

	//
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

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid={true}>
					<Breadcrumbs title="Formulaire" breadcrumbItem="Gestion des migrants" />
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
														<Label htmlFor="formrow-type-Input">Type *</Label>
														<select
															name="type"
															onChange={validation.handleChange}
															onBlur={validation.handleBlur}
															value={validation.values.type || ""}
															className="form-control">
															<option value="">Selectionne</option>
															<option value="Deplace interne">Deplace interne</option>
															<option value="Migrant">Migrant</option>
															<option value="Réfugie">Réfugie</option>
														</select>
														{validation.touched.type &&
															validation.errors.type ? (
															<FormFeedback type="invalid">
																{validation.errors.type}
															</FormFeedback>
														) : null}
													</div>
												</FormGroup>
											</Col>
											<Col md={6}>
												<FormGroup className="mb-3">
													<div className="mb-3">
														<Label className="form-label">Nom *</Label>
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
												</FormGroup>
											</Col>
											<Col md={6}>
												<FormGroup className="mb-3">
													<div className="mb-3">
														<Label className="form-label">Prenom *</Label>
														<Input
															name="prenom"
															type="type"
															onChange={validation.handleChange}
															onBlur={validation.handleBlur}
															value={validation.values.prenom || ""}
														/>
														{validation.touched.prenom &&
															validation.errors.prenom ? (
															<FormFeedback type="invalid">
																{validation.errors.prenom}
															</FormFeedback>
														) : null}
													</div>
												</FormGroup>
											</Col>
											<Col md={6}>
												<FormGroup className="mb-3">
													<div className="mb-3">
														<Label className="form-label">Email </Label>
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
												</FormGroup>
											</Col>
											<Col md={6}>
												<FormGroup className="mb-3">
													<div className="mb-3">
														<Label className="form-label">Telephone *</Label>
														<Input
															name="telephone"
															type="type"
															onChange={validation.handleChange}
															onBlur={validation.handleBlur}
															value={validation.values.telephone || ""}
														/>
														{validation.touched.telephone &&
															validation.errors.telephone ? (
															<FormFeedback type="invalid">
																{validation.errors.telephone}
															</FormFeedback>
														) : null}
													</div>
												</FormGroup>
											</Col>
											<Col md={6}>
												<FormGroup className="mb-3">
													<div className="mb-3">
														<Label className="form-label">Profession *</Label>
														<Input
															name="profession"
															type="type"
															onChange={validation.handleChange}
															onBlur={validation.handleBlur}
															value={validation.values.profession || ""}
														/>
														{validation.touched.profession &&
															validation.errors.profession ? (
															<FormFeedback type="invalid">
																{validation.errors.profession}
															</FormFeedback>
														) : null}
													</div>
												</FormGroup>
											</Col>
											<Col md={6}>
												<FormGroup className="mb-3">
													<div className="mb-3">
														<Label htmlFor="formrow-situationMatrimonial-Input">Situation matrimonial *</Label>
														<select
															name="situationMatrimonial"
															onChange={validation.handleChange}
															onBlur={validation.handleBlur}
															value={validation.values.situationMatrimonial || ""}
															className="form-control">
															<option value="">selectionne </option>
															<option value="Marié">Marié</option>
															<option value="Célibataire">Célibataire</option>
															<option value="Divorcé">Divorcé</option>
															<option value="Veuve">Veuve</option>
														</select>
														{validation.touched.situationMatrimonial &&
															validation.errors.situationMatrimonial ? (
															<FormFeedback type="invalid">
																{validation.errors.situationMatrimonial}
															</FormFeedback>
														) : null}
													</div>
												</FormGroup>
											</Col>
											<Col md={6}>
												<FormGroup className="mb-3">
													<div className="mb-3">
														<Label className="form-label">Situation sanitaire *</Label>
														<Input
															name="situationSanitaire"
															type="type"
															onChange={validation.handleChange}
															onBlur={validation.handleBlur}
															value={validation.values.situationSanitaire || ""}
														/>
														{validation.touched.situationSanitaire &&
															validation.errors.situationSanitaire ? (
															<FormFeedback type="invalid">
																{validation.errors.situationSanitaire}
															</FormFeedback>
														) : null}
													</div>
												</FormGroup>
											</Col>
											<Col md={6}>
												<FormGroup className="mb-3">
													<div className="mb-3">
														<Label className="form-label">Age *</Label>
														<Input
															name="age"
															type="number"
															onChange={validation.handleChange}
															onBlur={validation.handleBlur}
															value={validation.values.age || ""}
														/>
														{validation.touched.age &&
															validation.errors.age ? (
															<FormFeedback type="invalid">
																{validation.errors.age}
															</FormFeedback>
														) : null}
													</div>
												</FormGroup>
											</Col>
											<Col md={6}>
												<FormGroup className="mb-3">
													<div className="mb-3">
														<Label htmlFor="formrow-sexe-Input">Sexe *</Label>
														<select
															name="sexe"
															onChange={validation.handleChange}
															onBlur={validation.handleBlur}
															value={validation.values.sexe || ""}
															className="form-control">
															<option value="">Selectionne</option>
															<option value="Homme">Homme</option>
															<option value="Femme">Femme</option>
														</select>
														{validation.touched.sexe &&
															validation.errors.sexe ? (
															<FormFeedback type="invalid">
																{validation.errors.sexe}
															</FormFeedback>
														) : null}
													</div>
												</FormGroup>
											</Col>
											<Col md={6}>
												<FormGroup className="mb-3">
													<div className="mb-3">
														<Label className="form-label">Vulnerabilité *</Label>
														<Input
															name="vulnerabilite"
															type="type"
															onChange={validation.handleChange}
															onBlur={validation.handleBlur}
															value={validation.values.vulnerabilite || ""}
														/>
														{validation.touched.vulnerabilite &&
															validation.errors.vulnerabilite ? (
															<FormFeedback type="invalid">
																{validation.errors.vulnerabilite}
															</FormFeedback>
														) : null}
													</div>
												</FormGroup>
											</Col>
											<Col md={6}>
												<FormGroup className="mb-3">
													<div className="mb-3">
														<Label className="form-label">Pays provenance *</Label>
														<Input
															name="paysProvenance"
															type="type"
															onChange={validation.handleChange}
															onBlur={validation.handleBlur}
															value={validation.values.paysProvenance || ""}
														/>
														{validation.touched.paysProvenance &&
															validation.errors.paysProvenance ? (
															<FormFeedback type="invalid">
																{validation.errors.paysProvenance}
															</FormFeedback>
														) : null}
													</div>
												</FormGroup>
											</Col>
											<Col md={6}>
												<FormGroup className="mb-3">
													<div className="mb-3">
														<Label className="form-label">Date arrivé *</Label>
														<Input
															name="dateArrive"
															type="date"
															onChange={validation.handleChange}
															onBlur={validation.handleBlur}
															value={validation.values.dateArrive || ""}
														/>
														{validation.touched.dateArrive &&
															validation.errors.dateArrive ? (
															<FormFeedback type="invalid">
																{validation.errors.dateArrive}
															</FormFeedback>
														) : null}
													</div>
												</FormGroup>
											</Col>
											<Col md={6}>
												<FormGroup className="mb-3">
													<div className="mb-3">
														<Label htmlFor="formrow-region-Input">region</Label>
														<select
															name="region"
															onChange={validation.handleChange}
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
														<Label htmlFor="formrow-prefecture-Input">Prefecture</Label>
														<select
															name="prefecture"
															id="prefecture"
															onChange={validation.handleChange}
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
														<Label htmlFor="formrow-commune-Input">Commune</Label>
														<select
															name="commune"
															id="commune"
															onChange={validation.handleChange}
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
											<Col md={6}>
												<FormGroup className="mb-3">
													<div className="mb-3">
														<Label className="form-label">Point d'entrée *</Label>
														<Input
															name="pointEntre"
															type="type"
															onChange={validation.handleChange}
															onBlur={validation.handleBlur}
															value={validation.values.pointEntre || ""}
														/>
														{validation.touched.pointEntre &&
															validation.errors.pointEntre ? (
															<FormFeedback type="invalid">
																{validation.errors.pointEntre}
															</FormFeedback>
														) : null}
													</div>
												</FormGroup>
											</Col>
											<Col md={6}>
												<FormGroup className="mb-3">
													<div className="mb-3">
														<Label className="form-label">Code d'oim *</Label>
														<Input
															name="codeOim"
															type="type"
															onChange={validation.handleChange}
															onBlur={validation.handleBlur}
															value={validation.values.codeOim || ""}
														/>
														{validation.touched.codeOim &&
															validation.errors.codeOim ? (
															<FormFeedback type="invalid">
																{validation.errors.codeOim}
															</FormFeedback>
														) : null}
													</div>
												</FormGroup>
											</Col>
											<Col md={12}>
												<FormGroup className="mb-3">
													<div className="mb-3">
														<Label className="form-label">Observation *</Label>
														<Input
															name="observation"
															type="type"
															onChange={validation.handleChange}
															onBlur={validation.handleBlur}
															value={validation.values.observation || ""}
														/>
														{validation.touched.observation &&
															validation.errors.observation ? (
															<FormFeedback type="invalid">
																{validation.errors.observation}
															</FormFeedback>
														) : null}
													</div>
												</FormGroup>
											</Col>
										</Row>

										<div>
											<Button type="submit" style={{ backgroundColor: '#192957' }} className="btn m-1 float-end">
												<i className='fa fa-save'></i> Modifier
											</Button>

											<Button color="danger" onClick={() => {
												if (personne?.type == 'Migrant') {
													history.push('/list-migrant')
												} else if (personne?.type == 'Réfugie') {
													history.push('/list-refugie')
												}
											}} className="waves-effect waves-light">
												<i className="fa fa-times"></i> annuler
											</Button>{" "}
										</div>
									</Form>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
		</React.Fragment>
	);
}
EditInfoPersonne.propTypes = {
	personne: PropTypes.object,
	onGetPersonne: PropTypes.func,
}

const mapStateToProps = ({ personnes }) => ({
	personne: personnes.personne,
})

const mapDispatchToProps = dispatch => ({
	onGetPersonne: id => dispatch(getPersonneDetail(id)),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(EditInfoPersonne))