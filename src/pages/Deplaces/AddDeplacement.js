import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import { Card, Col, Container, Row, CardBody, Button, FormFeedback, Input } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axiosApi from '../../helpers/api_helper';
import Swal from 'sweetalert2';

const AddDeplacement = (props) => {

	const { match: { params }, history } = props
	const [isAddMode, setIsAddMode] = useState(params.id ? true : false)
	const [listeCatastrophe, setCatastrophe] = useState([]);
	const [listePersonne, setPersonne] = useState([]);
	const [selectedOptions, setSelectedOptions] = useState([]);
	const [deplace, setDeplace] = useState({});
	const [selectedPersonne, setSelectedPersonne] = useState(null);
	const [typePers, setTypePers] = useState(null);

	useEffect(() => {
		fetchAllCatastrophe();
		fetchAllPersonne();
		if (params.id) {
			setIsAddMode(true)
			initDeplace(params.id)
		}
	}, [params]);


	function handleSelectPersonne(d) {
		if (d !== null) {
			axiosApi.get('/personne/' + d.value).then(res => {
				setDeplace(res.data);
				//console.table(res.data);
			})
			setSelectedPersonne(d.value);
		} else {
			setDeplace(null);
			setSelectedPersonne(null);
		}
	}

	function handleChangeType(type) {
		setTypePers(type.target.value)
	}

	const fetchAllCatastrophe = () => {
		axiosApi.get('/catastrophe/liste').then(res => {
			setCatastrophe(res.data);
		})
	}

	const fetchAllPersonne = () => {
		axiosApi.get('/personne/deplaceinterne').then(res => {
			setPersonne(res.data);
		})
	}

	const handlerSelect = (e) => {
		setSelectedOptions(e)
	}

	const catastrophes = listeCatastrophe.map((catas, index) => {
		return (
			<option value={catas.id} key={index}>
				{catas?.typeCatastrophe + ' ' + catas?.region?.nom}
			</option>
		)
	})

	// const personnes = listePersonne.map((person, index) => {
	// 	return (
	// 		<option value={person.id} key={index}>
	// 			{person?.prenom + ' ' + person?.nom}
	// 		</option>
	// 	)
	// })

	const initDeplace = (id) => {
		axiosApi.get(`/deplaceinterne/${id}`).then(res => {
			setDeplace(res.data)
			setSelectedOptions(res.data.lieuInstallation)
		})
	}

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			//personne: (deplace && deplace?.personne.id) || '',
			catastrophe: (deplace && deplace?.catastrophe?.id) || '',
			nom: (deplace && deplace?.nom) || '',
			prenom: (deplace && deplace?.prenom) || '',
			type: (deplace && deplace?.type) || '',
			codeOim: (deplace && deplace?.codeOim) || '',
			pointEntre: (deplace && deplace?.pointEntre) || '',
			profession: (deplace && deplace?.profession) || '',
			telephone: (deplace && deplace?.telephone) || '',
			email: (deplace && deplace?.email) || '',
			sexe: (deplace && deplace?.sexe) || '',
			situationMatrimonial: (deplace && deplace?.situationMatrimonial) || '',
			age: (deplace && deplace?.age) || '',
			vulnerabilite: (deplace && deplace?.vulnerabilite) || '',//
			lieuProvenance: (deplace && deplace?.lieuProvenance) || '',
			cause: (deplace && deplace?.cause) || '',
			date: (deplace && deplace?.date) || '',
			heure: (deplace && deplace?.heure) || '',
			lieuInstallation: (deplace && deplace?.lieuInstallation) || '',
			nbreHomme: (deplace && deplace?.nbreHomme) || 0,
			nbreFemme: (deplace && deplace?.nbreFemme) || 0,
			nbreEnfant: (deplace && deplace?.nbreEnfant) || 0,
			difficulite: (deplace && deplace?.difficulite) || '',
			description: (deplace && deplace?.description) || '',
			latitude: (deplace && deplace?.latitude) || '',
			longitude: (deplace && deplace?.longitude) || '',
			catastrophe: (deplace && deplace?.catastrophe) || 0,
			region: (deplace && deplace?.region) || 0,
			prefecture: (deplace && deplace?.preEmergency) || 0,
			commune: (deplace && deplace?.commune) || 0
		},
		validationSchema: Yup.object().shape({
			cause: Yup
				.string()
				.required("Le champ cause de depart est obligatoire"),
			catastrophe: Yup
				.string()
				.required("Le champ catastrophe est obligatoire"),
			nom: Yup
				.string()
				.required("Le champ nom est obligatoire"),
			prenom: Yup
				.string()
				.required("Le champ prenom est obligatoire"),
			profession: Yup
				.string()
				.required("Le champ profession est obligatoire"),
			situationMatrimonial: Yup
				.string()
				.required("Le champ situationMatrimonial est obligatoire"),
			age: Yup
				.string()
				.required("Le champ age est obligatoire"),
			telephone: Yup
				.string()
				.required("Le champ telephone est obligatoire"),
			vulnerabilite: Yup
				.string()
				.required("Le champ vulnerabilite est obligatoire"),
			date: Yup
				.string()
				.required("Le champ date est obligatoire"),
			heure: Yup
				.string()
				.required("Le champ heure est obligatoire"),
			nbreHomme: Yup
				.string()
				.required("Le champ nombre hommme est obligatoire"),
			nbreFemme: Yup
				.string()
				.required("Le champ nombre femme est obligatoire"),
			nbreEnfant: Yup
				.string()
				.required("Le champ nombre d'enfant moins de 10 ans est obligatoire"),
			lieuProvenance: Yup
				.string()
				.required("Le champ lieux de provenance est obligatoire"),
			difficulite: Yup
				.string()
				.required("Le champ difficulite est obligatoire"),
		}),
		onSubmit: (values) => {
			values['lieuInstallation'] = selectedOptions
			values['type'] = typePers
			values['personne'] = selectedPersonne
			if (!isAddMode) {
				createDeplaceinterne(values);
			} else {
				updateDeplace(values, params.id)
			}
		}
	})

	function createDeplaceinterne(fields) {
		axiosApi.post('/deplaceinterne', fields).then(res => {
			console.log(res);
			history.push('/list-deplacement')
			Swal.fire({
				toast: true,
				position: 'top-end',
				text: 'Enregistrement effectué avec success.',
				icon: 'success',
				showConfirmButton: false,
				timer: 2000
			})
		}).catch(error => {
			console.log(error);
			Swal.fire({
				toast: true,
				position: 'top-end',
				text: 'Enregistrement nom effectué avec success.',
				icon: 'error',
				showConfirmButton: false,
				timer: 2000
			})
		})
	}

	function updateDeplace(values, id) {
		axiosApi.put(`/deplaceinterne/${id}`, values).then(res => {
			console.log(res);
			history.push('/list-deplacement')
			Swal.fire({
				toast: true,
				position: 'top-end',
				text: 'Enregistrement effectué avec success.',
				icon: 'success',
				showConfirmButton: false,
				timer: 2000
			})
		}).catch(error => {
			console.log(error);
			Swal.fire({
				toast: true,
				position: 'top-end',
				text: 'Enregistrement nom effectué avec success.',
				icon: 'error',
				showConfirmButton: false,
				timer: 2000
			})
		})
	}


	const lieuInstallationOptions = [
		{ value: "Stade/Terrain", label: "Stade/Terrain" },
		{ value: "Maison des jeunes", label: "Maison des jeunes" },
		{ value: "Ecoles", label: "Ecoles" },
		{ value: "Familles d'accueil", label: "Familles d'accueil" },
		{ value: "Autre", label: "Autre" },
	]
	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid={true}>
					<Breadcrumbs title="Formulaire" breadcrumbItem="Gestion déplacés internes" />
					<Row>
						<Col lg={12}>
							<Card style={{ backgroundColor: '#fff', borderRadius: 4 }}>
								<CardBody>
									<form onSubmit={e => {
										e.preventDefault()
										formik.handleSubmit()
										return false
									}}>
										<div className="row form-row">
											<div className="form-group col-md-6">
												<label>Personne deplace interne *</label>
												<Select name="personne"
													placeholder="les personnes ... "
													isClearable={true}
													isSearchable={true}
													isDisabled={false}
													isLoading={false}
													isRtl={false}
													closeMenuOnSelect={false}
													onChange={handleSelectPersonne}
													options={listePersonne.map(e => ({ label: e?.prenom + ' ' + e?.nom, value: e?.id }))}
													className={'' + (formik.errors.personne && formik.touched.personne ? ' is-invalid' : '')} >
												</Select>
												{formik.errors.personne ? <FormFeedback type="invalid">
													{formik.errors.personne}
												</FormFeedback> : ''}
											</div>
											<div className="form-group col-md-6">
												<label>Type de personne *</label>
												<select name="type"
													onChange={handleChangeType}
													onBlur={formik.handleBlur}
													value={formik.values.type ? formik.values.type : typePers}
													className={'form-control' + (formik.errors.type && formik.touched.type ? ' is-invalid' : '')} >
													<option value="">Selectionne type </option>
													<option value="Deplace interne">Personnes deplacees internes</option>
													<option value="Migrant">Migrant</option>
													<option value="Réfugie">Réfugie</option>
												</select>
												{formik.errors.type ? <FormFeedback type="invalid">
													{formik.errors.type}
												</FormFeedback> : ''}
											</div>
											<div className="form-group col-md-6">
												<label>Nom *</label>
												<input
													name="nom"
													type="text"
													className={'form-control' + (formik.errors.nom && formik.touched.nom ? ' is-invalid' : '')}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.nom} />
												{formik.errors.nom ? <FormFeedback type="invalid">
													{formik.errors.nom}
												</FormFeedback> : ''}
											</div>

											<div className="form-group col-md-6">
												<label>Prenom *</label>
												<input
													name="prenom"
													type="text"
													className={'form-control' + (formik.errors.prenom && formik.touched.prenom ? ' is-invalid' : '')}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.prenom} />
												{formik.errors.prenom ? <FormFeedback type="invalid">
													{formik.errors.prenom}
												</FormFeedback> : ''}
											</div>

											<div className="form-group col-md-6">
												<label>Telephone *</label>
												<input
													name="telephone"
													type="text"
													className={'form-control' + (formik.errors.telephone && formik.touched.telephone ? ' is-invalid' : '')}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.telephone} />
												{formik.errors.telephone ? <FormFeedback type="invalid">
													{formik.errors.telephone}
												</FormFeedback> : ''}
											</div>

											<div className="form-group col-md-6">
												<label>Email </label>
												<input
													name="email"
													type="text"
													className={'form-control' + (formik.errors.email && formik.touched.email ? ' is-invalid' : '')}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.email} />
												{formik.errors.email ? <FormFeedback type="invalid">
													{formik.errors.email}
												</FormFeedback> : ''}
											</div>

											<div className="form-group col-md-6">
												<label>Profession *</label>
												<input
													name="profession"
													type="text"
													className={'form-control' + (formik.errors.profession && formik.touched.profession ? ' is-invalid' : '')}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.profession} />
												{formik.errors.profession ? <FormFeedback type="invalid">
													{formik.errors.profession}
												</FormFeedback> : ''}
											</div>

											<div className="form-group col-md-6">
												<label>Situation matrimonial  *</label>
												<select name="situationMatrimonial"
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.situationMatrimonial}
													className={'form-control' + (formik.errors.situationMatrimonial && formik.touched.situationMatrimonial ? ' is-invalid' : '')} >
													<option value="">Selectionne situationMatrimonial </option>
													<option value="Marié">Marié</option>
													<option value="Célibataire">Célibataire</option>
													<option value="Divorcé">Divorcé</option>
													<option value="Veuve">Veuve</option>
												</select>
												{formik.errors.situationMatrimonial ? <FormFeedback type="invalid">
													{formik.errors.situationMatrimonial}
												</FormFeedback> : ''}
											</div>

											<div className="form-group col-md-6">
												<label>Age *</label>
												<input
													name="age"
													type="number"
													className={'form-control' + (formik.errors.age && formik.touched.age ? ' is-invalid' : '')}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.age} />
												{formik.errors.age ? <FormFeedback type="invalid">
													{formik.errors.age}
												</FormFeedback> : ''}
											</div>

											<div className="form-group col-md-6">
												<label>Sexe *</label>
												<select name="sexe"
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.sexe}
													className={'form-control' + (formik.errors.sexe && formik.touched.sexe ? ' is-invalid' : '')} >
													<option value="">Selectionne sexe </option>
													<option value="Homme">Homme </option>
													<option value="Femme">Femme</option>
												</select>
												{formik.errors.sexe ? <FormFeedback type="invalid">
													{formik.errors.sexe}
												</FormFeedback> : ''}
											</div>

											<div className="form-group col-md-6">
												<label>Vulnerabilite *</label>
												<input
													name="vulnerabilite"
													type="text"
													className={'form-control' + (formik.errors.vulnerabilite && formik.touched.vulnerabilite ? ' is-invalid' : '')}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.vulnerabilite} />
												{formik.errors.vulnerabilite ? <FormFeedback type="invalid">
													{formik.errors.vulnerabilite}
												</FormFeedback> : ''}
											</div>
											{
												deplace?.type !== 'Deplace interne' && typePers !== 'Deplace interne' ?
													<div className="form-group col-md-6">
														<label>Point entre *</label>
														<input
															name="pointEntre"
															type="text"
															className={'form-control' + (formik.errors.pointEntre && formik.touched.pointEntre ? ' is-invalid' : '')}
															onChange={formik.handleChange}
															onBlur={formik.handleBlur}
															value={formik.values.pointEntre} />
														{formik.errors.pointEntre ? <FormFeedback type="invalid">
															{formik.errors.pointEntre}
														</FormFeedback> : ''}
													</div> : ''
											}
											{
												deplace?.type !== 'Deplace interne' && typePers !== 'Deplace interne' ?
													<div className="form-group col-md-6">
														<label>Code OIM *</label>
														<input
															name="codeOim"
															type="text"
															className={'form-control' + (formik.errors.codeOim && formik.touched.codeOim ? ' is-invalid' : '')}
															onChange={formik.handleChange}
															onBlur={formik.handleBlur}
															value={formik.values.codeOim} />
														{formik.errors.codeOim ? <FormFeedback type="invalid">
															{formik.errors.codeOim}
														</FormFeedback> : ''}
													</div> : ''
											}

											<div className="form-group col-md-6">
												<label>Date du commencement de l'arrivée des personnes *</label>
												<input
													name="date"
													type="date"
													className={'form-control' + (formik.errors.date && formik.touched.date ? ' is-invalid' : '')}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.date} />
												{formik.errors.date ? <FormFeedback type="invalid">
													{formik.errors.date}
												</FormFeedback> : ''}
											</div>

											<div className="form-group col-md-6">
												<label>Heure du commencement de l'arrivée des personnes *</label>
												<input
													name="heure"
													type="time"
													className={'form-control' + (formik.errors.heure && formik.touched.heure ? ' is-invalid' : '')}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.heure} />
												{formik.errors.heure ? <FormFeedback type="invalid">
													{formik.errors.heure}
												</FormFeedback> : ''}
											</div>

											<div className="form-group col-md-6">
												<label>Lieux de provenance *</label>
												<input
													name="lieuProvenance"
													type="text"
													className={'form-control' + (formik.errors.lieuProvenance && formik.touched.lieuProvenance ? ' is-invalid' : '')}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.lieuProvenance} />
												{formik.errors.lieuProvenance ? <FormFeedback type="invalid">
													{formik.errors.lieuProvenance}
												</FormFeedback> : ''}
											</div>

											<div className="form-group col-md-6">
												<label>Cause de départ *</label>
												<select name="cause"
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.cause}
													className={'form-control' + (formik.errors.cause && formik.touched.cause ? ' is-invalid' : '')} >
													<option value="">Selectionne cause de départ </option>
													<option value="Sècheresse">Sècheresse </option>
													<option value="Tornades">Tornades</option>
													<option value="Feux de brousse">Feux de brousse</option>
													<option value="Tornades">Tornades</option>
													<option value="Volcan">Volcan</option>
													<option value="Conflits">Conflits</option>
													<option value="Epidémie">Epidémie</option>
													<option value="Tremblement de terre">Tremblement de terre</option>
													<option value="Glissement de terrain">Glissement de terrain</option>
													<option value="Eboulement">Eboulement</option>
													<option value="Invasion d'insecte">Invasion d'insecte</option>
													<option value="Séisme">Séisme</option>
													<option value="Autre (à préciser)">Autre (à préciser)</option>
												</select>
												{formik.errors.cause ? <FormFeedback type="invalid">
													{formik.errors.cause}
												</FormFeedback> : ''}
											</div>

											<div className="form-group col-md-6">
												<label>Nombre des femmes affectées *</label>
												<input
													name="nbreFemme"
													type="number"
													className={'form-control' + (formik.errors.nbreFemme && formik.touched.nbreFemme ? ' is-invalid' : '')}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.nbreFemme} />
												{formik.errors.nbreFemme ? <FormFeedback type="invalid">
													{formik.errors.nbreFemme}
												</FormFeedback> : ''}
											</div>

											<div className="form-group col-md-6">
												<label>Nombre des hemmes affectées *</label>
												<input
													name="nbreHomme"
													type="number"
													className={'form-control' + (formik.errors.nbreHomme && formik.touched.nbreHomme ? ' is-invalid' : '')}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.nbreHomme}
												/>
												{formik.errors.nbreHomme ? <FormFeedback type="invalid">
													{formik.errors.nbreHomme}
												</FormFeedback> : ''}
											</div>

											<div className="form-group col-md-6">
												<label>Nombre d'enfant de moins de dix ans (-10 ans) *</label>
												<input
													name="nbreEnfant"
													type="number"
													className={'form-control' + (formik.errors.nbreEnfant && formik.touched.nbreEnfant ? ' is-invalid' : '')}
													value={formik.values.nbreEnfant}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur} />
												{formik.errors.nbreEnfant ? <FormFeedback type="invalid">
													{formik.errors.nbreEnfant}
												</FormFeedback> : ''}
											</div>

											<div className="form-group col-md-6">
												<label>Lieux d'installation *</label>
												{!isAddMode ?
													<Select name="lieuInstallation"
														labelColor="#dc3545"
														placeholder="Lieux d'installation "
														isMulti={true}
														className="select"
														isClearable={true}
														isSearchable={true}
														isDisabled={false}
														isLoading={false}
														isRtl={false}
														selected={selectedOptions}
														closeMenuOnSelect={false}
														onChange={handlerSelect}
														options={lieuInstallationOptions}
													>
													</Select> :
													<Select name="lieuInstallation"
														labelColor="#dc3545"
														placeholder="Lieux d'installation "
														isMulti={true}
														className="select"
														isClearable={true}
														isSearchable={true}
														isDisabled={false}
														isLoading={false}
														isRtl={false}
														value={selectedOptions}
														selected={selectedOptions}
														closeMenuOnSelect={false}
														onChange={handlerSelect}
														options={lieuInstallationOptions}
													>
													</Select>
												}
												{formik.errors.lieuInstallation ? <FormFeedback type="invalid">
													{formik.errors.lieuInstallation}
												</FormFeedback> : ''}
											</div>

											<div className="form-group col-md-6">
												<label>Difficulité *</label>
												<input
													name="difficulite"
													type="textarea"
													className={'form-control' + (formik.errors.difficulite && formik.touched.region ? ' is-invalid' : '')}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.difficulite}
												/>
												{formik.errors.difficulite ? <FormFeedback type="invalid">
													{formik.errors.difficulite}
												</FormFeedback> : ''}
											</div>

											<div className="form-group col-md-6">
												<label>Catastrophe *</label>
												<select
													name="catastrophe"
													className={'form-control' + (formik.errors.catastrophe && formik.touched.catastrophe ? ' is-invalid' : '')}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.catastrophe}
												>
													<option value="">Selectionne une catastrophe</option>
													{catastrophes}
												</select>
												{formik.errors.catastrophe ? <FormFeedback type="invalid">
													{formik.errors.catastrophe}
												</FormFeedback> : ''}
											</div>

											<div className="form-group col-md-12">
												<label>Commentaire</label>
												<Input
													name="description" type="textarea"
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.description}
													className={'form-control' + (formik.errors.description && formik.touched.region ? ' is-invalid' : '')} />
												{formik.errors.description ? <FormFeedback type="invalid">
													{formik.errors.description}
												</FormFeedback> : ''}
											</div>
										</div>

										<div className="form-group mt-2">
											<Button type="submit" style={{ backgroundColor: '#192957' }} disabled={formik.isSubmitting} className="btn m-1 float-end">
												{formik.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
												<i className='fa fa-save'></i> Enregister
											</Button>

											<Button color="danger" onClick={() => {
												history.push('/list-deplacement')
											}} className="waves-effect waves-light">
												<i className="uil uil-plus me-2"></i> annulle
											</Button>{" "}
										</div>
									</form>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
		</React.Fragment >
	);
};

export default AddDeplacement;