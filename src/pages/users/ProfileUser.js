import React, { useState, useEffect } from "react";
import {
	Container,
	Card,
	CardBody,
	Button,
	Label,
	Input,
	FormFeedback,
	Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { withRouter } from "react-router-dom";
//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";
import { useDispatch } from "react-redux";
import {
	profileNewUtilisateur as onUpdateProfileUtilisateur,
	passwordNewUtilisateur as onUpdatePasswordUtilisateur,
} from "../../store/actions";


const ProfileUser = () => {
	const dispatch = useDispatch();

	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [prenom, setPrenom] = useState("");
	const [nom, setNom] = useState("");
	// const [id, setId] = useState();

	useEffect(() => {
		if (localStorage.getItem("authUser")) {
			const obj = JSON.parse(localStorage.getItem("user"));
			setNom(obj.first_name);
			setPrenom(obj.last_name);
			setEmail(obj.email);
			setPhone(obj.phone);
			// setId(obj.id);
		}
	}, []);

	const validation = useFormik({
		enableReinitialize: true,
		initialValues: {
			first_name: nom || '',
			last_name: prenom || '',
			email: email || '',
			phone: phone || '',
		},
		validationSchema: Yup.object({
			first_name: Yup.string().required("Saisir votre nom"),
			last_name: Yup.string().required("Saisir votre prenom"),
			email: Yup.string().required("Saisir votre email"),
			phone: Yup.string().required("Saisir votre telephone")
		}),
		onSubmit: (values) => {
			dispatch(onUpdateProfileUtilisateur(values));
		}
	});

	const validationPassword = useFormik({
		enableReinitialize: true,
		initialValues: {
			password: '',
			oldPassword: '',
		},
		validationSchema: Yup.object({
			password: Yup.string().required("Nouveau mot de passe"),
			oldPassword: Yup.string().required("ancien mot de passe"),
		}),
		onSubmit: (values) => {
			dispatch(onUpdatePasswordUtilisateur(values));
		}
	});


	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<Breadcrumb title="Dashoard" breadcrumbItem="Profil" />

					<Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
						<CardBody>
							<Form
								className="form-horizontal"
								onSubmit={(e) => {
									e.preventDefault();
									validation.handleSubmit();
									return false;
								}}>
								<div className="row">
									<div className="col-md-6">
										<div className="form-group mt-4">
											<Label className="form-label">Nom *</Label>
											<Input
												name="first_name"
												className="form-control"
												placeholder="Saisir votre nom"
												type="text"
												onChange={validation.handleChange}
												onBlur={validation.handleBlur}
												value={validation.values.first_name || ""}
												invalid={
													validation.touched.first_name && validation.errors.first_name ? true : false
												}
											/>
											{validation.touched.first_name && validation.errors.first_name ? (
												<FormFeedback type="invalid">{validation.errors.first_name}</FormFeedback>
											) : null}
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-group mt-4">
											<Label className="form-label">Prenom *</Label>
											<Input
												name="last_name"
												className="form-control"
												placeholder="Saisir votre prenom"
												type="text"
												onChange={validation.handleChange}
												onBlur={validation.handleBlur}
												value={validation.values.last_name || ""}
												invalid={
													validation.touched.last_name && validation.errors.last_name ? true : false
												}
											/>
											{validation.touched.last_name && validation.errors.last_name ? (
												<FormFeedback type="invalid">{validation.errors.last_name}</FormFeedback>
											) : null}
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-group mt-4">
											<Label className="form-label">Email *</Label>
											<Input
												name="email"
												className="form-control"
												placeholder="Saisir votre nom"
												type="text"
												onChange={validation.handleChange}
												onBlur={validation.handleBlur}
												value={validation.values.email || ""}
												invalid={
													validation.touched.email && validation.errors.email ? true : false
												}
											/>
											{validation.touched.email && validation.errors.email ? (
												<FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
											) : null}
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-group mt-4">
											<Label className="form-label">Téléphone *</Label>
											<Input
												name="phone"
												className="form-control"
												placeholder="Numero de telephone"
												type="text"
												onChange={validation.handleChange}
												onBlur={validation.handleBlur}
												value={validation.values.phone || ""}
												invalid={
													validation.touched.phone && validation.errors.phone ? true : false
												}
											/>
											{validation.touched.phone && validation.errors.phone ? (
												<FormFeedback type="invalid">{validation.errors.phone}</FormFeedback>
											) : null}
										</div>
									</div>
								</div>
								<div className="text-end mt-4">
									<Button style={{ backgroundColor: '#192957' }} type="submit"> Modifier </Button>
								</div>
							</Form>
						</CardBody>
					</Card>

					<Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
						<CardBody>
							<Form
								className="form-horizontal"
								onSubmit={(e) => {
									e.preventDefault();
									validationPassword.handleSubmit();
									return false;
								}}>
								<div className="row">
									<div className="col-md-6">
										<div className="form-group mt-4">
											<Label className="form-label">Ancien mot de passe *</Label>
											<Input
												name="oldPassword"
												className="form-control"
												placeholder="Saisir votre ancien mot de passe"
												type="password"
												onChange={validationPassword.handleChange}
												onBlur={validationPassword.handleBlur}
												value={validationPassword.values.oldPassword || ""}
												invalid={
													validationPassword.touched.oldPassword && validationPassword.errors.oldPassword ? true : false
												}
											/>
											{validationPassword.touched.oldPassword && validationPassword.errors.oldPassword ? (
												<FormFeedback type="invalid">{validationPassword.errors.oldPassword}</FormFeedback>
											) : null}
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-group mt-4">
											<Label className="form-label">Nouveau mot de passe *</Label>
											<Input
												name="password"
												className="form-control"
												placeholder="Nouveau mot de passe"
												type="password"
												onChange={validationPassword.handleChange}
												onBlur={validationPassword.handleBlur}
												value={validationPassword.values.password || ""}
												invalid={
													validationPassword.touched.password && validationPassword.errors.password ? true : false
												}
											/>
											{validationPassword.touched.password && validationPassword.errors.password ? (
												<FormFeedback type="invalid">{validationPassword.errors.password}</FormFeedback>
											) : null}
										</div>
									</div>
								</div>
								<div className="text-end mt-4">
									<Button style={{ backgroundColor: '#192957' }} type="submit"> Changer le mot de passe </Button>
								</div>
							</Form>
						</CardBody>
					</Card>
				</Container>
			</div>
		</React.Fragment>
	);
};

export default (withRouter(ProfileUser))