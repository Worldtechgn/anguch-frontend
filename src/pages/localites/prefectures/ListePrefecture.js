import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, CardTitle, Table, Button } from "reactstrap"
//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types"
// import { getusers } from "../../store/cites/actions"
import { MDBIcon } from 'mdbreact';
// import Pagination from '../../components/Pagination';
import AddEditPrefecture from './AddEditPrefecture';
import Modal from "react-bootstrap/Modal";
import Pagination from '../../../components/Pagination';
import { getPrefectures } from '../../../store/actions';
import ShowCommune from './ShowCommune';

const ListePrefecture = props => {

	const [showModal, setShowModal] = useState(false);
	const handleCloseModal = () => setShowModal(false);
	const handleShowModal = () => setShowModal(true);

	const [editData, setEditData] = useState("");
	const [showEditModal, setShowEditModal] = useState(false);
	const handleCloseEditModal = () => setShowEditModal(false);
	const handleEditModal = () => setShowEditModal(true);

	const [showShwoModal, setShowCommuneModal] = useState(false);
	const handleCloseCommuneModal = () => setShowCommuneModal(false);
	const handleShowCommuneModal = () => setShowCommuneModal(true);
	const [communes, setShowCommune] = useState();
	const { prefectures, onGetPrefectures, history } = props;


	useEffect(() => {
		onGetPrefectures()
	}, [onGetPrefectures])


	const editUser = item => {
		setEditData(item);
		handleEditModal();
	};

	const communeShow = data => {
		setShowCommune(data);
		handleShowCommuneModal();
	}

	const onSubmitAddEditPrefecture = data => {
		onGetPrefectures()
		handleCloseModal(false);
		handleCloseEditModal(false);
	};

	const onSubmitEditUser = data => {
		onGetPrefectures();
		//handleCloseModal(false);
		handleCloseEditModal(false)
	};

	const [search, setSearch] = useState("");

	const handSearch = (e) => {
		let value = e.target.value;
		value.length > 2 && setSearch(value);
	}

	//pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage] = useState(30);

	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	const currentRecords = prefectures.slice(indexOfFirstRecord, indexOfLastRecord);
	const nPages = Math.ceil(prefectures.length / recordsPerPage)

	return (
		<React.Fragment>
			<div className="page-content">
				<div className="container-fluid">
					<Breadcrumbs title="Tables" breadcrumbItem="Gestion des prefectures" />
					<Row>
						<Col className="col-12">
							<Card style={{ backgroundColor: '#fff', borderRadius: 4 }}>
								<CardBody>
									<Row>
										<Col className="col-4">
											<Button style={{ backgroundColor: '#192957' }} onClick={handleShowModal} className="waves-effect waves-light">
												<i className="uil uil-plus me-2"></i> Ajouter une prefecture
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
									<CardTitle>La liste des prefectures</CardTitle>
									<div className="table-responsive">
										<Table className="table table-striped mb-0" id="datatable">
											<thead>
												<tr>
													<th>#</th>
													<th>Prefectures</th>
													<th>Nombre des commune</th>
													<th>Action</th>
												</tr>
											</thead>
											<tbody>
												{
													currentRecords.map((val, key) => (
														<tr key={key}>
															<td>{key + 1} </td>
															<td>{val?.nom} </td>
															<td>
																<i onClick={() => communeShow(val)} className='btn btn-success btn-sm'>{val?.commune?.length}</i>
															</td>
															<td>
																<button onClick={() => editUser(val)} className='btn btn-success btn-sm'>
																	<i className="uil uil-edit me-2"></i>
																</button>{" "}
															</td>
														</tr>
													))
												}
											</tbody>
										</Table>
										{
											prefectures.length > recordsPerPage ? <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} /> : ''
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
									<AddEditPrefecture
										onSubmit={onSubmitAddEditPrefecture}
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
									<AddEditPrefecture
										user={editData}
										show={handleEditModal}
										onSubmitEdit={onSubmitEditUser}
										onClose={onSubmitAddEditPrefecture}
									/>
								</Modal>

								<Modal
									show={showShwoModal}
									onHide={handleCloseCommuneModal}
									animation={true}
									backdrop="static"
									keyboard={false}
									centered
								>
									<ShowCommune
										showCommunes={communes}
										onClose={handleCloseCommuneModal}
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

ListePrefecture.propTypes = {
	prefectures: PropTypes.array,
	onGetPrefectures: PropTypes.func,
}

const mapStateToProps = ({ prefectures }) => ({
	prefectures: prefectures.prefectures,
})

const mapDispatchToProps = dispatch => ({
	onGetPrefectures: () => dispatch(getPrefectures()),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(ListePrefecture))

