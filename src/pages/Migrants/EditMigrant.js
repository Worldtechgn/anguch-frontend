import React, { useEffect, useMemo, useState } from 'react';

import {
	Card,
	Col,
	Container,
	Row,
	CardBody,
	CardTitle,
	FormGroup,
	Label,
	Form,
	Input,
	FormFeedback,
	Button,
} from "reactstrap"

import REGIONS from "../../data/regionData.json"
import PREFECTURE from "../../data/prefectureData.json"
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
import { updatePersonne } from '../../helpers/backend_helper';


const EditMigrant = props => {
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
			region: (personne && personne?.region?.id) || "",
			prefecture: (personne && personne?.prefecture?.id) || "",
			dateArrive: (personne && personne.dateArrive) || "",
			codeOim: (personne && personne.codeOim) || "",
			observation: (personne && personne.observation) || "",
			pointEntre: (personne && personne.pointEntre) || "",
			profession: (personne && personne.profession) || "",
			paysProvenance: (personne && personne.paysProvenance) || "",
			sexe: (personne && personne.sexe) || "",
			type: (personne && personne.type) || "Migrant"
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
			codeOim: Yup
				.string()
				.required("Le champ code oim est obligatoire"),
			pointEntre: Yup
				.string()
				.required("Le point d'entrée est obligatoire"),
			observation: Yup
				.string()
				.required("Le champ d'observation est obligatoire"),
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
				region: values?.region?.id,
				prefecture: values?.prefecture?.id,
				dateArrive: values.dateArrive,
				codeOim: values.codeOim,
				observation: values.observation,
				pointEntre: values.pointEntre,
				profession: values.profession,
				paysProvenance: values.paysProvenance,
				sexe: values.sexe,
				type: personne.type
			}
			updatePersonne(personne.id, onUpdatePersonne);
			history.push('/list-migrant')

		},
	})

	//filtre region et prefecture
	const [prefecturetList, setPrefectureList] = useState([])
	const [selectedRegion] = useState()

	useEffect(() => {
		setPrefectureList(PREFECTURE)
	}, [])

	function getFilteredList() {
		if (!selectedRegion) {
			return prefecturetList
		}
		return prefecturetList.filter(item => item.id_region == selectedRegion)
	}

	var filteredList = useMemo(getFilteredList, [selectedRegion, prefecturetList])

	//
	const regions = REGIONS.map(region => {
		return (
			<option value={region.id_region} key={region.id_region}>
				{region.fields.name}
			</option>
		)
	})

	const prefectures = filteredList.map(pref => {
		return (
			<option value={pref.id_prefecture} key={pref.id_prefecture}>
				{pref.name}
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

							<Card>
								<CardBody>
									<CardTitle className="mb-4">Formulaire de modification des migrants </CardTitle>
									<Form className="needs-validation" onSubmit={e => {
										e.preventDefault()
										validation.handleSubmit()
										return false
									}}>
										<Row>
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
											<button type="submit" className="btn btn-primary w-md float-rigth">
												Modifier
											</button>

											<Button color="danger" onClick={() => {
												history.push('/list-migrant')
											}} className="waves-effect waves-light">
												<i className="uil uil-plus me-2"></i> annulle
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
EditMigrant.propTypes = {
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
)(withRouter(EditMigrant))