import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, CardTitle, Table, Button } from "reactstrap"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "../Tables/datatables.scss"
import { Link } from 'react-router-dom';
import { MDBIcon } from 'mdbreact';
import Pagination from '../../components/Pagination';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import axiosApi from '../../helpers/api_helper';

ReactHTMLTableToExcel.format = (s, c) => {
	if (c && c['table']) {
		const html = c.table;
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');
		const rows = doc.querySelectorAll('tr');

		for (const row of rows) row.removeChild(row.firstChild);

		c.table = doc.querySelector('table').outerHTML;
	}
	return s.replace(/{(\w+)}/g, (m, p) => c[p]);
};
const ListeDeplaceInterne = props => {
	const { history } = props;

	const [personnes, setDeplaceinterne] = useState([]);

	useEffect(() => {
		fetchAllDeplaceinterne()
	}, [])

	const fetchAllDeplaceinterne = () => {
		axiosApi.get('/deplaceinterne').then(res => {
			setDeplaceinterne(res.data);
		})
	}
	//filtre
	const [search, setSearch] = useState("");
	const handSearch = (e) => {
		let value = e.target.value;
		value.length > 2 && setSearch(value);
	}

	const handPaginate = (e) => {
		let showPage = e.target.value;
		setRecordsPerPage(showPage)
	}

	//pagination de
	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage, setRecordsPerPage] = useState(30);

	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	const currentRecords = personnes.slice(indexOfFirstRecord, indexOfLastRecord);
	const nPages = Math.ceil(personnes.length / recordsPerPage)

	return (
		<React.Fragment>
			<div className="page-content">
				<div className="container-fluid">
					<Breadcrumbs title="Tables" breadcrumbItem="Gestion des personnes deplaces internes" />
					<Row>
						<Col className="col-12">
							<Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
								<CardBody>
									<Row>
										<Col className="col-4">
											<Button style={{ backgroundColor: '#192957' }} onClick={() => {
												history.push('/add-deplace-interne')
											}} className="waves-effect waves-light">
												<i className="uil uil-plus me-2"></i> Ajouter un deplace interne
											</Button>{" "}
										</Col>
										<div className="card-tools d-flex align-items-center col-lg-4">
											<ReactHTMLTableToExcel
												id="test-table-xls-button"
												className="button btn btn-success"
												table="table-to-xls"
												filename="liste-des-personnes"
												sheet="tablexls"
												buttonText="Exporter"
											/>
										</div>

										<div className="card-tools d-flex align-items-center col-lg-3">
											<div className="input-group input-group-sm">
												<input className="form-control my-0 py-1" type="text" onChange={handSearch} placeholder="Recherche"
													aria-label="Recherche" />
												<div className="input-group-prepend">
													<span className="input-group-text purple lighten-3" id="basic-text1">
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
									<CardTitle>
										<div className="row">
											<div className="card-tools d-flex align-items-center col-lg-6">
												<div className="input-group input-group-sm">
													La liste des personnes deplaces internes
												</div>
											</div>
											<div className="card-tools d-flex align-items-center col-lg-3">
											</div>
											<div className="card-tools d-flex align-items-center col-lg-3">
												<div className="input-group input-group-sm float-end">
													<select className="form-control input-group-addon" onChange={handPaginate}>
														<option value={10}>10</option>
														<option value={30}>30</option>
														<option value={50}>50</option>
													</select>
												</div>
											</div>
										</div>

									</CardTitle>
									<div className="table-responsive">
										<Table className="table table-striped mb-0" id="table-to-xls">
											<thead>
												<tr>
													<th>#</th>
													<th className='text-center'>Leux provenance</th>
													<th style={{ height: 30 }}>Cause</th>
													<th className='text-center'>Personnes</th>
													<th className='text-center' style={{ height: 30 }}>Lieux d'installation</th>
													<th className='text-center'>Position de famille</th>
													<th className='text-center'>Date et heure d'arrivée</th>
													<th>Region</th>
													<th className='text-center'>Action</th>
												</tr>
											</thead>
											<tbody>
												{
													currentRecords
														.filter((val) => {
															return (val.position.toLowerCase().indexOf(search.toLowerCase()) >= 0
																|| val.dateArrive.toLowerCase().indexOf(search.toLowerCase()) >= 0
																|| val?.region?.nom.toLowerCase().indexOf(search.toLowerCase()) >= 0
																|| val?.prefecture?.nom.toLowerCase().indexOf(search.toLowerCase()) >= 0
																|| val?.commune?.nom.toLowerCase().indexOf(search.toLowerCase()) >= 0
																|| val.lieuProvenance.toLowerCase().indexOf(search.toLowerCase()) >= 0
															);
														})
														.map((val, key) => (
															<tr key={key}>
																<td scope="row">{key + 1} </td>
																<td>{val?.lieuProvenance} </td>
																<td style={{ height: 30 }}>
																	<ul>
																		{val?.cause.map((p, index) => (
																			<li key={index}>{p.label}</li>
																		))}
																	</ul>
																</td>
																<td className='text-center'>{val?.nbreTotalPersonne} </td>
																<td style={{ height: 30 }}>
																	<ul>
																		{val?.lieuInstallation.map((p, index) => (
																			<li key={index}>{p.label}</li>
																		))}
																	</ul>
																</td>
																<td>{val?.position} </td>
																<td>{val?.date} </td>
																<td>{val?.region?.nom} </td>
																<td className="row">
																	<div className="col-md-4">
																		<Link to={`/view-deplace-interne/${val.id}`}
																			className='btn btn-info btn-sm'>
																			<i className="fa fa-eye"></i>
																		</Link>
																	</div>{" "}
																	<div className="col-md-4">
																		<Link to={`/edit-deplace-interne/${val.id}`}
																			className='btn btn-success btn-sm'>
																			<i className="uil uil-edit me-2"></i>
																		</Link>
																	</div>
																</td>
															</tr>
														))
												}
											</tbody>
										</Table>
										{
											personnes.length > recordsPerPage ? <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} /> : ''
										}
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


export default ListeDeplaceInterne
