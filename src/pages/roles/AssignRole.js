import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, CardTitle, Table } from "reactstrap"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
// import Pagination from '../../components/Pagination';
import axiosApi from '../../helpers/api_helper';
import * as Yup from 'yup';
// import { checkObjectInArray } from './utils/Helper';

const AssignRole = () => {
	//filtre
	//const [sites, setRegions] = useState([]);

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
			id: 1,
			resourceName: "Dashboard",
			read: true,
			write: false,
			update: false,
			delete: true,
			name: "dashboard"
		},
		{
			id: 2,
			resourceName: "Utlisateurs",
			read: true,
			write: false,
			update: false,
			delete: false,
			name: "utilisateur"
		},
		{
			id: 3,
			resourceName: "Site inondable",
			read: false,
			write: false,
			update: false,
			delete: false,
			name: "site-inondable"
		},
		{
			id: 4,
			resourceName: "Personne",
			read: false,
			write: false,
			update: false,
			delete: false,
			name: "list-info-personne"
		},
		{
			id: 5,
			resourceName: "deplaçant",
			read: false,
			write: false,
			update: false,
			delete: false,
			name: "list-deplacement"
		},
		{
			id: 6,
			resourceName: "Réfugie",
			read: false,
			write: false,
			update: false,
			delete: false,
			name: "list-refugie"
		},
		{
			id: 7,
			resourceName: "Migrant",
			read: false,
			write: false,
			update: false,
			delete: false,
			name: "list-migrant"
		},
		{
			id: 8,
			resourceName: "Role",
			read: false,
			write: false,
			update: false,
			delete: false,
			name: "liste-role"
		},
		{
			id: 9,
			resourceName: "Assignation des roles",
			read: false,
			write: false,
			update: false,
			delete: false,
			name: "liste-permission"
		}
	];

	const changeRole = (e) => {
		setAssignRole(e.target.value)
	}

	const roleData = {
		id: "",
		resourceName: "",
		read: false,
		write: false,
		update: false,
		delete: false,
		name: "",
		permission: []
	};
	const [assignRole, setAssignRole] = useState();
	const [users, setUsers] = useState();

	useEffect(() => {
		setUsers(ressource);
	}, []);

	// const checkInArray = (item) => {
	// 	return checkObjectInArray(item, roleData.permission, 'id')
	// };

	const checkPermission = (e, index) => {
		// let permissionsData = { ...permissions };
		// const checkedStatus = e.target.checked;
		// permissionsData.allPermissions[index].isChecked = checkedStatus;
		// setPermissions(permissionsData);
	};

	const handleClick = (e) => {
		e.preventDefault();
	}

	const initialValues = {
		role: '',
	};
	const validationSchema = Yup.object().shape({
		role: Yup
			.string("nom should be a string")
			.required("nom est obligatoire"),
	});

	const onSubmit = (fields, { setStatus, setSubmitting }) => {
		setStatus();


		setSubmitting(false);
	}

	return (
		<React.Fragment>
			<div className="page-content">
				<div className="container-fluid">
					<Breadcrumbs title="Tables" breadcrumbItem="Gestion des assignations des permissions" />
					<Row>
						<Col className="col-12">
							<Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
								<Row>
									<Col className="col-4">
										<CardBody>
											<div className="input-group input-group-sm">
												<select className="form-control my-0 py-1 float-right" onChange={changeRole} name="" id="">
													<option value="">Selctionne un Role</option>
													{roleList}
												</select>
											</div>
										</CardBody>
									</Col>
									<Col className="col-3">
										<CardBody>
											<div className="input-group input-group-sm">
												<button className="btn btn-success">
													<i className="fa fa-save"> Assigne</i>
												</button>
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
																<div className="checkbox checkbox-circle checkbox-color-scheme">
																	<input
																		className="form-check-input"
																		type="checkbox"
																		value={JSON.stringify(val.read)}
																		checked={val.read ? true : false}
																		onChange={e => checkPermission(e, key)}
																	/>
																	<label className="form-check-label" htmlFor={val.name + '' + val.id}>
																		{val.name}
																	</label>
																</div>
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


export default AssignRole
