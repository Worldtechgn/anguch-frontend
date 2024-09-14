import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { CardBody, FormFeedback, FormGroup, Input, Form, Label, Button } from "reactstrap";
import axiosApi from "../../helpers/api_helper";

const AddPersonneDeplace = props => {

	const [countInterne, setDeplaceinterne] = useState([]);
	const [personne, setPersonne] = useState([]);
	const [pers, setPers] = useState();
	const [setAge, setSetAge] = useState(0);
	const [resetDate, setResetDate] = useState();

	useEffect(() => {
		fetchAllDeplaceinterne();
		fetchAllPersonne();
	}, []);

	function handleSelectPersonne(data) {
		if (data) {
			axiosApi.get('/personne/' + data?.value).then(res => {
				setPers(res.data);
			})
		} else {
			setPers();
		}
	}

	const fetchAllDeplaceinterne = () => {
		axiosApi.get('/personne/deplaceinterne-encours').then(res => {
			setDeplaceinterne(res.data);
		})
	}

	const fetchAllPersonne = () => {
		axiosApi.get('/personne/getListePersonne').then(res => {
			setPersonne(res.data);
		})
	}

	function handleAge(e) {
		setResetDate(e.target.value)
		let date = e.target.value;
		var today = new Date();
		var birthDate = new Date(date);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		setSetAge(age)
	}

	const validation = useFormik({
		enableReinitialize: true,

		initialValues: {
			personne: pers ? pers.id : 0,
			isPersonne: (pers && pers.id) || 0,
			nom: (pers && pers.nom) || "",
			prenom: (pers && pers.prenom) || "",
			email: (pers && pers.email) || "",
			telephone: (pers && pers.telephone) || "",
			vulnerabilite: (pers && pers.vulnerabilite) || '',
			situationMatrimonial: (pers && pers.situationMatrimonial) || '',
			situationSanitaire: (pers && pers.situationSanitaire) || '',
			region: (pers && pers?.region?.id) || null,
			prefecture: (pers && pers?.prefecture?.id) || null,
			dateArrive: (pers && pers.dateArrive) || '',
			codeOim: (pers && pers.codeOim) || '',
			observation: (pers && pers.observation) || '',
			pointEntre: (pers && pers.pointEntre) || '',
			profession: (pers && pers.profession) || '',
			paysProvenance: (pers && pers.paysProvenance) || '',
			commune: (pers && pers?.commune?.id) || null,
			sexe: (pers && pers.sexe) || '',
			type: (pers && pers.type) || '',
			isDeplace: props.perTotal !== 'edit' ? '0' : '1',
			deplaceinterne: props.perTotal === 'edit' ? props.idMouvement : null
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
			prenom: Yup
				.string()
				.required("Le champ prenom est obligatoire"),
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

		}),
		onSubmit: values => {
			values['age'] = setAge;
			console.log(values);
			if (props.perTotal === 'edit') {
				axiosApi.post('/deplaceinterne/addPersonneToMouvement', values).then(res => {
					Swal.fire({
						toast: true,
						position: 'top-end',
						text: 'Enregistrement effectué avec success.',
						icon: 'success',
						showConfirmButton: false,
						timer: 3000
					})
					setSetAge(0)
					setResetDate('')
					setPers()
					validation.values.prenom = ""
					validation.values.nom = ""
					validation.values.email = ""
					validation.values.telephone = ""
					validation.values.vulnerabilite = ""
					validation.values.situationMatrimonial = ""
					validation.values.situationSanitaire = ""
					validation.values.observation = ""
					validation.values.profession = ""
					validation.values.sexe = ""
					validation.values.type = ""
					fetchAllDeplaceinterne()
					if (props.perTotal - (countInterne.length) === 0) {
						props.onSubmit(res)
					}
				}).catch(error => {
					Swal.fire({
						toast: true,
						position: 'top-end',
						text: 'Enregistrement nom effectué avec success.',
						icon: 'error',
						showConfirmButton: false,
						timer: 3000
					})
				})
			} else {
				axiosApi.post('/personne', values).then(res => {
					Swal.fire({
						toast: true,
						position: 'top-end',
						text: 'Enregistrement effectué avec success.',
						icon: 'success',
						showConfirmButton: false,
						timer: 3000
					})
					setSetAge(0)
					setResetDate('')
					setPers()
					validation.values.prenom = ""
					validation.values.nom = ""
					validation.values.email = ""
					validation.values.telephone = ""
					validation.values.vulnerabilite = ""
					validation.values.situationMatrimonial = ""
					validation.values.situationSanitaire = ""
					validation.values.observation = ""
					validation.values.profession = ""
					validation.values.sexe = ""
					validation.values.type = ""
					fetchAllDeplaceinterne()
					if (props.perTotal - (countInterne.length) === 0) {
						props.onSubmit(res)
					}
				}).catch(error => {
					Swal.fire({
						toast: true,
						position: 'top-end',
						text: 'Enregistrement nom effectué avec success.',
						icon: 'error',
						showConfirmButton: false,
						timer: 3000
					})
				})
			}

		},
	})

	return (
		<>
			<Modal.Header style={{ backgroundColor: '#fff', }}>
				<Modal.Title><b>{props.perTotal !== 'edit' ? props.perTotal + ' a ' : ''} </b> Ajouter des personnes deplaces internes <i>reste : {props.perTotal !== 'edit' ? props.perTotal - (countInterne.length) : ''} </i></Modal.Title>
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
								<Select name="personne"
									placeholder="personne deplace interne"
									isClearable={true}
									isSearchable={true}
									isDisabled={false}
									isLoading={false}
									isRtl={false}
									closeMenuOnSelect={false}
									onChange={handleSelectPersonne}
									options={personne.map(e => ({ label: e.prenom + ' ' + e.nom + ' ' + e.code, value: e.id }))} >
								</Select>
							</div>
							<div className="form-group col-md-6">
								<FormGroup className="mb-3">
									<div className="mb-3">
										<Label className="form-label">Type de personne deplace  *</Label>
										<select name="type" className="form-control" type="text" onChange={validation.handleChange} onBlur={validation.handleBlur} value={validation.values.type || ""}>
											<option value="">selectionne </option>
											<option value="Migrant">Migrant</option>
											<option value="Réfugie">Réfugie</option>
											<option value="Deplace interne">Deplace interne</option>
											<option value="Veuve">Veuve</option>
										</select>
										{validation.touched.type && validation.errors.type ? (
											<FormFeedback type="invalid"> {validation.errors.type} </FormFeedback>
										) : null}
									</div>
								</FormGroup>
							</div>
							<div className="form-group col-md-6">
								<FormGroup className="mb-3">
									<div className="mb-3">
										<Label className="form-label">Nom *</Label>
										<Input
											name="nom" type="text" onChange={validation.handleChange} onBlur={validation.handleBlur} value={validation.values.nom || ""}
										/>
										{validation.touched.nom && validation.errors.nom ? (
											<FormFeedback type="invalid"> {validation.errors.nom} </FormFeedback>
										) : null}
									</div>
								</FormGroup>
							</div>

							<div className="form-group col-md-6">
								<FormGroup className="mb-3">
									<div className="mb-3">
										<Label className="form-label">Prenom *</Label>
										<Input name="prenom" type="text" onChange={validation.handleChange} onBlur={validation.handleBlur} value={validation.values.prenom || ""}
										/>
										{validation.touched.prenom && validation.errors.prenom ? (
											<FormFeedback type="invalid"> {validation.errors.prenom} </FormFeedback>
										) : null}
									</div>
								</FormGroup>
							</div>

							<div className="form-group col-md-6">
								<FormGroup className="mb-3">
									<div className="mb-3">
										<Label className="form-label">Email </Label>
										<Input name="email" type="email" onChange={validation.handleChange} onBlur={validation.handleBlur} value={validation.values.email || ""}
										/>
										{validation.touched.email && validation.errors.email ? (
											<FormFeedback type="invalid"> {validation.errors.email} </FormFeedback>
										) : null}
									</div>
								</FormGroup>
							</div>

							<div className="form-group col-md-6">
								<FormGroup className="mb-3">
									<div className="mb-3">
										<Label className="form-label">Telephone *</Label>
										<Input name="telephone" type="text" onChange={validation.handleChange} onBlur={validation.handleBlur} value={validation.values.telephone || ""}
										/>
										{validation.touched.telephone && validation.errors.telephone ? (
											<FormFeedback type="invalid"> {validation.errors.telephone} </FormFeedback>
										) : null}
									</div>
								</FormGroup>
							</div>

							<div className="form-group col-md-6">
								<FormGroup className="mb-3">
									<div className="mb-3">
										<Label className="form-label">Profession *</Label>
										<Input name="profession" type="text" onChange={validation.handleChange} onBlur={validation.handleBlur} value={validation.values.profession || ""}
										/>
										{validation.touched.profession && validation.errors.profession ? (
											<FormFeedback type="invalid"> {validation.errors.profession} </FormFeedback>
										) : null}
									</div>
								</FormGroup>
							</div>

							<div className="form-group col-md-6">
								<FormGroup className="mb-3">
									<div className="mb-3">
										<Label className="form-label">Situation matrimonial  *</Label>
										<select name="situationMatrimonial" className="form-control" type="text" onChange={validation.handleChange} onBlur={validation.handleBlur} value={validation.values.situationMatrimonial || ""}>
											<option value="">selectionne </option>
											<option value="Marié">Marié</option>
											<option value="Célibataire">Célibataire</option>
											<option value="Divorcé">Divorcé</option>
											<option value="Veuve">Veuve</option>
										</select>
										{validation.touched.situationMatrimonial && validation.errors.situationMatrimonial ? (
											<FormFeedback type="invalid"> {validation.errors.situationMatrimonial} </FormFeedback>
										) : null}
									</div>
								</FormGroup>
							</div>

							<div className="form-group col-md-6">
								<FormGroup className="mb-3">
									<div className="mb-3">
										<Label className="form-label">Situation sanitaire *</Label>
										<Input name="situationSanitaire" type="text" onChange={validation.handleChange} onBlur={validation.handleBlur} value={validation.values.situationSanitaire || ""}
										/>
										{validation.touched.situationSanitaire && validation.errors.situationSanitaire ? (
											<FormFeedback type="invalid"> {validation.errors.situationSanitaire} </FormFeedback>
										) : null}
									</div>
								</FormGroup>
							</div>

							<div className="form-group col-md-6 row">
								<Label className="form-label">Age *</Label>
								<div className="col-md-9">
									<FormGroup className="mb-3">
										<div className="mb-3">
											<input name="age" type="date" onChange={handleAge} value={resetDate ? resetDate : ''} className="form-control" />
											{validation.touched.age && validation.errors.age ? (
												<FormFeedback type="invalid"> {validation.errors.age} </FormFeedback>
											) : null}
										</div>
									</FormGroup>
								</div>
								<div className="col-md-3">
									<input type="text" value={pers ? pers.age : setAge} disabled className={'form-control'} />
								</div>
							</div>

							<div className="form-group col-md-6">
								<FormGroup className="mb-3">
									<div className="mb-3">
										<Label className="form-label">Sexe  *</Label>
										<select className="form-control" name="sexe" type="text" onChange={validation.handleChange} onBlur={validation.handleBlur} value={validation.values.sexe || ""}>
											<option value="">selectionne </option>
											<option value="Homme">Homme</option>
											<option value="Femme">Femme</option>
										</select>
										{validation.touched.sexe && validation.errors.sexe ? (
											<FormFeedback type="invalid"> {validation.errors.sexe} </FormFeedback>
										) : null}
									</div>
								</FormGroup>
							</div>

							<div className="form-group col-md-6">
								<FormGroup className="mb-3">
									<div className="mb-3">
										<Label className="form-label">Vulnerabilite *</Label>
										<Input name="vulnerabilite" type="text" onChange={validation.handleChange} onBlur={validation.handleBlur} value={validation.values.vulnerabilite || ""}
										/>
										{validation.touched.vulnerabilite && validation.errors.vulnerabilite ? (
											<FormFeedback type="invalid"> {validation.errors.vulnerabilite} </FormFeedback>
										) : null}
									</div>
								</FormGroup>
							</div>

							<div className="form-group col-md-12">
								<FormGroup className="mb-3">
									<div className="mb-3">
										<Label className="form-label">Observation </Label>
										<Input
											name="observation"
											type="textarea"
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
							</div>
						</div>
						<div className="form-group mt-3">
							<Button type="button" onClick={props.onClose} className="btn btn-danger">
								<i className="fa fa-times"></i> Fermer
							</Button>
							{props.perTotal !== 'edit' && props.perTotal - (countInterne.length) === 0 ? '' :
								<Button type="submit" style={{ backgroundColor: '#192957' }} className="btn m-1 float-end">
									{pers ? <i className='fa fa-plus'></i> : <i className='fa fa-save'></i>} {pers ? 'Ajouter' : 'Enregister'}
								</Button>
							}
						</div>
					</Form>
				</CardBody>
			</Modal.Body>
		</>
	);
};

export default AddPersonneDeplace;
