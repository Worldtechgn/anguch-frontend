import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, CardTitle, Table } from "reactstrap"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { MDBIcon } from 'mdbreact';

import axiosApi from '../../helpers/api_helper';
import Modal from "react-bootstrap/Modal";
import EditRoleAssign from './EditRole';
import AddRole from './AddRole';

const ListeRole = (props) => {

	const {history} = props;

	const [search, setSearch] = useState("");
	const [showModal, setShowModal] = useState(false);
	const handleCloseModal = () => setShowModal(false);
	const handleShowModal = () => setShowModal(true);

	const [showEditModal, setShowEditModal] = useState(false);
	const handleCloseEditModal = () => setShowEditModal(false);
	const handleEditModal = () => setShowEditModal(true);


	const onSubmitAddRole = () => {
		fetchAllRole()
		setShowModal(false);
	};

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

	const onSubmitEditRole = () => {

	};

	const editRole = (role) => {
		history.push(`/roles/${role.id}/edit`)
	}

	return (
		<React.Fragment>
			<div className="page-content">
				<div className="container-fluid">
					<Breadcrumbs title="Tables" breadcrumbItem="Gestion des roles" />
					<Row>
						<Col className="col-12">
							<Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
								<Row>
									<Col className="col-9">
										<CardBody>
											<div className="float-right">
												<button style={{ backgroundColor: '#192957' }} className="btn btn-success" onClick={handleShowModal}>
													{" "}
													<i className="fa fa-plus fa-2"></i> Role
												</button>
											</div>

										</CardBody>
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
									<div className="table-responsive">
										<Table className="table table-striped mb-0" id="datatable">
											<thead>
												<tr>
													<th>#</th>
													<th>Nom</th>
													{/* <th>Action</th> */}
												</tr>
											</thead>
											<tbody>
												{
													roles.filter((val) => {
														return search.toLowerCase() === ''
															? val : val?.name.toLowerCase().includes(search.toLowerCase());
													}).map((val, key) => (
														<tr key={key}>
															<td>{key + 1} </td>
															<td>{val?.name} </td>
															<td>
																<button className="btn btn-success btn-sm mr-2"
																	onClick={() => editRole(val)}
																><i className="fa fa-edit"></i> Edit</button>
															</td>
														</tr>
													))
												}
											</tbody>
										</Table>
										<Modal
											show={showModal}
											onHide={handleCloseModal}
											animation={true}
											backdrop="static"
											keyboard={false}
											centered
										>
											<AddRole onSubmit={onSubmitAddRole} onClose={handleCloseModal} />
										</Modal>
										<Modal
											size="lg"
											show={showEditModal}
											onHide={handleCloseEditModal}
											animation={true}
											backdrop="static"
											keyboard={false}
											centered
										>
											<EditRoleAssign
												show={handleEditModal}
												onSubmitEdit={onSubmitEditRole}
												onCloseEdit={handleCloseEditModal}
											/>
										</Modal>
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
export default ListeRole
