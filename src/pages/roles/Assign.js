import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, CardTitle, Table, Input } from "reactstrap"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { MDBIcon } from 'mdbreact';
// import Pagination from '../../components/Pagination';
import axiosApi from '../../helpers/api_helper';
import { useFormik } from 'formik';
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';

const Assign = props => {
	//filtre
	//const [sites, setRegions] = useState([]);
	const [search, setSearch] = useState("");

	const handSearch = (e) => {
		let value = e.target.value;
		value.length > 2 && setSearch(value);
	}

	const [roles, setRole] = useState([]);

	useEffect(() => {
		fetchAllRole();

	}, []);

	const fetchAllRole = () => {
		axiosApi.get('/role').then(res => {
			setRole(res.data);
		})
	}

	const roleList = roles.map(role => {
		return (
			<option value={role.id} key={role.id}>
				{role.nom}
			</option>
		)
	})


	const ressource = [
		{
			resourceName: "Dashboard",
			read: true,
			write: false,
			update: false,
			delete: true,
			name: "dashboard"
		},
		{
			resourceName: "Utlisateurs",
			read: true,
			write: false,
			update: false,
			delete: false,
			name: "utilisateur"
		},
		{
			resourceName: "Site inondable",
			read: false,
			write: false,
			update: false,
			delete: false,
			name: "site-inondable"
		},
		{
			resourceName: "Personne",
			read: false,
			write: false,
			update: false,
			delete: false,
			name: "list-info-personne"
		},
		{
			resourceName: "deplaçant",
			read: false,
			write: false,
			update: false,
			delete: false,
			name: "list-deplacement"
		},
		{
			resourceName: "Réfugie",
			read: false,
			write: false,
			update: false,
			delete: false,
			name: "list-refugie"
		},
		{
			resourceName: "Migrant",
			read: false,
			write: false,
			update: false,
			delete: false,
			name: "list-migrant"
		},
		{
			resourceName: "Role",
			read: false,
			write: false,
			update: false,
			delete: false,
			name: "liste-role"
		},
		{
			resourceName: "Assignation des roles",
			read: false,
			write: false,
			update: false,
			delete: false,
			name: "liste-permission"
		}
	];

	const [checked, setChecked] = useState([]);
	const checkList = ["Apple", "Banana", "Tea", "Coffee"];
	const handleCheck = (event) => {
		var updatedList = [...checked];
		if (event.target.checked) {
			updatedList = [...checked, event.target.checked];
		} else {
			updatedList.splice(checked.indexOf(event.target.checked), 0);
		}
		setChecked(updatedList);

		console.log(checked);
	};
	var isChecked = (item) =>
		checked.includes(item) ? "checked-item" : "not-checked-item";

	const handleClick = (e) => {
		e.preventDefault();
	}

	const validation = useFormik({
		enableReinitialize: true,

		initialValues: {
		},
	})
	return (
		<React.Fragment>
			<div className="page-content">
				<div className="container-fluid">
					<Breadcrumbs title="Tables" breadcrumbItem="Gestion des assignations des permissions" />
					<Row>
						<Col className="col-12">
							<Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
								<Row>
									<Col className="col-9">
									</Col>
									<Col className="col-3">
										<CardBody>
											<div className="">
												<div className="input-group input-group-sm">
													<input className="form-control my-0 py-1 float-right" type="text" placeholder="Recherche"
														onChange={handSearch}
														aria-label="Recherche" />
													<div className="input-group-prepend">
														<span className="input-group-text purple lighten-2" id="basic-text1">
															<MDBIcon className="text-dark" icon="search" />
														</span>
													</div>
												</div>
											</div>
										</CardBody>
									</Col>
								</Row>
							</Card>
						</Col>
						<Col className="col-12">
							<Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
								<CardBody>
									<CardTitle>La liste des roles</CardTitle>
									<div className="list-container">
										{checkList.map((item, index) => (
											<div key={index}>
												<input value={item} type="checkbox" onChange={handleCheck} />
												<span className={isChecked(item)}>{item}</span>
											</div>
										))}
									</div>
									<div className="table-responsive">
										<Table className="table table-striped mb-0" id="datatable">
											<thead>
												<tr>
													<th>Nom</th>
													<th>Lister</th>
													<th>Ajouter</th>
													<th>Modifier</th>
													<th>Supprimer</th>
												</tr>
											</thead>
											<tbody>
												{
													ressource.map((val, key) => (
														<tr key={key}>
															<td>{val.resourceName} </td>
															<td>
																<input value={val.read} type="checkbox" onChange={handleCheck} />
																<span className={isChecked(val.read)}>{val.read}</span>
															</td>
															<td>{val?.write} </td>
															<td>{val?.update} </td>
															<td>{val?.delete} </td>
														</tr>
													))
												}
											</tbody>
										</Table><br />
										<button type="submit" className="btn btn-primary w-md float-rigth"
											onClick={handleClick}>
											Assigne
										</button>
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</div>
			</div>
		</React.Fragment>
	);
};


export default Assign
