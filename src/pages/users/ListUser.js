import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, CardTitle, Table, Button } from "reactstrap"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types"
// import { getusers } from "../../store/cites/actions"
import { MDBIcon } from 'mdbreact';
// import Pagination from '../../components/Pagination';
import Swal from 'sweetalert2';
import axiosApi from '../../helpers/api_helper';
import Modal from "react-bootstrap/Modal";
import Pagination from '../../components/Pagination';
import AddUsers from './AddUusers';
import EditUsers from './EditUsers';
import { getUtilisateurs } from '../../store/actions';

const ListUser = props => {

	const [showModal, setShowModal] = useState(false);
	const handleCloseModal = () => setShowModal(false);
	const handleShowModal = () => setShowModal(true);

	const [editData, setEditData] = useState("");
	const [showEditModal, setShowEditModal] = useState(false);
	const handleCloseEditModal = () => setShowEditModal(false);
	const handleEditModal = () => setShowEditModal(true);

	const {onGetUtilisateurs, utilisateurs} = props;
	const [search, setSearch] = useState("");
	const [filterUtilisteurs, setFilterUsers] = useState([])
	let called = false;
	useEffect(() => {
		onGetUtilisateurs()
	}, [onGetUtilisateurs,search])

	const editUser = item => {
		setEditData(item);
		handleEditModal();
	};

	const onSubmitAddUser = () => {
		onGetUtilisateurs()
		handleCloseModal(false);
	};

	const onSubmitEditUser = () => {
		onGetUtilisateurs();
		handleCloseEditModal(false)
	};


	const handSearch = (e) => {
		let value = e.target.value;
		setSearch(value);
		setFilterUsers(
			utilisateurs.filter(user => {
				return user.first_name.includes(search.toLowerCase())
					// || user?.region?.nom.toLowerCase().includes(search.toLowerCase())
					// || user?.prefecture?.nom.toLowerCase().includes(search.toLowerCase())
					// || user.last_name.toLowerCase().indexOf(search.toLowerCase())
					// || user.email.toLowerCase().indexOf(search.toLowerCase())
					// || user.phone.toLowerCase().indexOf(search.toLowerCase())
					// || user?.role?.name.toLowerCase().indexOf(search.toLowerCase())
			})
		);
	}

	//pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage] = useState(30);

	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	const currentRecords = utilisateurs.slice(indexOfFirstRecord, indexOfLastRecord);
	const nPages = Math.ceil(utilisateurs.length / recordsPerPage)

	return (
		<React.Fragment>
			<div className="page-content">
				<div className="container-fluid">
					<Breadcrumbs title="Tables" breadcrumbItem="Gestion des utilisateurs" />
					<Row>
						<Col className="col-12">
							<Card style={{ backgroundColor: '#fff', borderRadius: 4 }}>
								<CardBody>
									<Row>
										<Col className="col-4">
											<Button style={{ backgroundColor: '#192957' }} onClick={handleShowModal} className="waves-effect waves-light btn btn-sm">
												<i className="uil uil-plus me-2"></i> Ajouter un utilisateur
											</Button>{" "}
										</Col>
										<div className="card-tools d-flex align-items-center col-lg-4">
										</div>

										<div className="card-tools d-flex align-items-center col-lg-3">
											<div className="input-group input-group-sm">
												<input className="form-control my-0 py-1 float-right" type="text" placeholder="Recherche"
													onChange={handSearch}
													aria-label="Recherche" />
												<div className="input-group-prepend">
													<span className="input-group-text purple lighten-2" style={{ backgroundColor: '#192957' }} id="basic-text1">
														<MDBIcon className="text-write" icon="search" />
													</span>
												</div>
											</div>
										</div>
									</Row>
								</CardBody>
							</Card>
						</Col>
						<Col className="col-12">
							<Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
								<CardBody>
									<CardTitle>La liste des users</CardTitle>
									<div className="table-responsive">
										<Table className="table table-striped mb-0" id="datatable">
											<thead>
												<tr>
													<th>#</th>
													<th>Nom</th>
													<th>Prenom</th>
													<th>Email</th>
													<th>Telephone</th>
													<th>Commune</th>
													<th>Role</th>
													<th>Action</th>
												</tr>
											</thead>
											<tbody>
												{
													utilisateurs.map((val, key) => (
														<tr key={key}>
															<td>{key + 1} </td>
															<td>{val?.first_name} </td>
															<td>{val?.last_name} </td>
															<td>{val?.email} </td>
															<td>{val?.phone} </td>
															<td>{val?.commune?.nom} </td>
															<td>{val?.role?.name} </td>
															<td>
																<button onClick={() => editUser(val)} className='btn btn-success btn-sm'>
																	<i className="uil uil-edit me-2"></i>
																</button>{" "}

																<Button onClick={() => {
																	Swal.fire({
																		title: 'Vous êtes sur point de ',
																		text: 'Êtes-vous sûr de continuer ?',
																		icon: 'warning',
																		showCancelButton: true,
																		confirmButtonColor: '#3085d6',
																		cancelButtonColor: '#d33',
																		confirmButtonText: 'OUI'
																	}).then((result) => {
																		if (result.isConfirmed) {
																			axiosApi.delete('site/' + val.id).then(res => {
																				if (res.data) {
																					Swal.fire({
																						toast: true,
																						position: 'top-end',
																						text: 'Suppression effectué avec success.',
																						icon: 'success',
																						showConfirmButton: false,
																						timer: 2000
																					})
																				} else {
																					Swal.fire({
																						toast: true,
																						position: 'top-end',
																						text: 'Suppression a echoué.',
																						icon: 'error',
																						showConfirmButton: false,
																						timer: 2000
																					})
																				}
																			})

																		}
																	})
																}} className='btn btn-danger btn-sm'>
																	<i className="uil uil-trash me-2"></i>
																</Button>
															</td>
														</tr>
													))
												}
											</tbody>
										</Table>
										{
											utilisateurs.length > recordsPerPage ? <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} /> : ''
										}

									</div>
								</CardBody>

								<Modal
									show={showModal}
									onHide={handleCloseModal}
									animation={true}
									backdrop="static"
									keyboard={false}
									centered
								>
									<AddUsers
										onSubmit={onSubmitAddUser}
										onClose={handleCloseModal}
									/>
								</Modal>

								<Modal
									show={showEditModal}
									onHide={handleCloseEditModal}
									animation={true}
									backdrop="static"
									keyboard={false}
									centered
								>
									<EditUsers
										user={editData}
										show={handleEditModal}
										onSubmitEdit={onSubmitEditUser}
										onCloseEdit={onSubmitAddUser}
									/>
								</Modal>
							</Card>
						</Col>
					</Row>
				</div>
			</div>
		</React.Fragment>
	);
};

ListUser.propTypes = {
	utilisateurs: PropTypes.array,
	onGetUtilisateurs: PropTypes.func,
}

const mapStateToProps = ({ utilisateurs }) => ({
	utilisateurs: utilisateurs.utilisateurs,
})

const mapDispatchToProps = dispatch => ({
	onGetUtilisateurs:() => dispatch(getUtilisateurs())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(ListUser))