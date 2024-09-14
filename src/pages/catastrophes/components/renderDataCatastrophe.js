import { Col, Card, CardBody, CardTitle, Button } from "reactstrap"
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import Swal from 'sweetalert2';
import axiosApi from '../../../helpers/api_helper';
import permissionHelper from "../../../common/permission_helper";

export const RenderDataCatastrophe = ({catastrophes, onRefreshData}) => {

	const refreshData = () => {
		onRefreshData()
	}

	return (
		<Col className="col-12">
			<Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
				<CardBody>
					<CardTitle>La liste des catastrophes</CardTitle>
					<div className="table-responsive">
						<table className="table table-striped mb-0 table-hover">
							<thead>
								<tr>
									<th>#</th>
									<th>Point focal</th>
									<th>Période</th>
									<th>Region</th>
									<th>Prefecture</th>
									<th>Menage total</th>
									<th>Personnes total</th>
									<th>Type</th>
									<th className='text-center'>Etat</th>
									<th className='text-center'>Action</th>
								</tr>
							</thead>
							<tbody>
								{
									catastrophes.map((val, key) => (
										<tr key={key}>
											<td>{key + 1} </td>
											<td>{`${val?.first_name} ${val?.last_name}`.toUpperCase()} </td>
											<td>{dayjs(val.date).format("MMM-YYYY")} </td>
											<td>{val?.region_nom} </td>
											<td>{val?.prefecture_nom}</td>
											<td>{val?.nbreTotalMenage}</td>
											<td>{val?.nbreTotalPersonne}</td>
											<td>{val?.typeCatastrophe}</td>
											{
												val?.traite == 'Oui' || val?.traite == "OUI" ?
													<td><span className="btn btn-success btn-sm">Traité</span></td> :
													<td className='text-center'>{
														val?.traite == 'Non' || val?.traite == 'NON' ? <span className="btn btn-danger btn-sm">Non</span> : ''
															|| val?.traite == 'Encours' ? <span className="btn btn-warning btn-sm">Encours</span> : ''
													}</td>
											}
											<td className='text-center'>
												<Link to={`/view-catastrophe/${val.catastrophe_id}`}
													className='btn btn-info btn-sm'>
													<i className="fa fa-eye" aria-hidden="true"></i>
												</Link>{" "}
												{permissionHelper('catastrophe','update_catastrophe') && <Link to={`/edit-catastrophe/${val.catastrophe_id}`}
													className='btn btn-success btn-sm'><i className="fa fa-edit"></i>
												</Link>}{" "}
												{
													permissionHelper('catastrophe','delete_catastrophe') && <Button onClick={() => {
														Swal.fire({
															title: 'Vous êtes sur le point de supprimer cette catastrophe',
															text: 'Êtes-vous sûr de continuer ?',
															icon: 'warning',
															showCancelButton: true,
															confirmButtonColor: '#3085d6',
															cancelButtonColor: '#d33',
															confirmButtonText: 'OUI',
															cancelButtonText: 'NON'
														}).then((result) => {
															if (result.isConfirmed) {
																axiosApi.delete('catastrophe/' + val.catastrophe_id).then(res => {
																	refreshData()
																	Swal.fire({
																		toast: true,
																		position: 'top-end',
																		text: 'Suppression effectué avec success.',
																		icon: 'success',
																		showConfirmButton: false,
																		timer: 2000
																	})

																}).catch(erro => {
																	console.log(erro);
																	Swal.fire({
																		toast: true,
																		position: 'top-end',
																		text: 'Suppression a echoué.',
																		icon: 'error',
																		showConfirmButton: false,
																		timer: 2000
																	})
																})
															}
														})
													}} className='btn btn-danger btn-sm'><i className="fa fa-trash"></i></Button>
												}
											</td>
										</tr>
									))
								}
							</tbody>
						</table>
					</div>
				</CardBody>
			</Card>
		</Col>
	)
}