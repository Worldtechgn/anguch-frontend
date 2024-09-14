import { Col, Card, CardBody, CardTitle, Button } from "reactstrap"
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import Swal from 'sweetalert2';
import { deleteEnqueteDeplaceInternes } from "../../../helpers/backend_enquete_type_data";
import permissionHelper from "../../../common/permission_helper";

export const renderDataEnqueteDeplaceInterne = (enqueteDeplaceInterne, onRefreshData) => {

	const refreshData = () => {
		onRefreshData()
	}

	return (
		<Col className="col-12">
			<Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
				<CardBody>
					<CardTitle>La liste des enquête souapiti</CardTitle>
					<div className="table-responsive">
						<table className="table table-striped mb-0 table-hover">
							<thead>
								<tr>
									<th>#</th>
                  <th>Type d'enquête</th> 
                  <th>Date d'enquête</th> 
                  <th>Commune</th> 
                  <th>Localité menage</th> 
                  <th>Code menage</th>
                  <th>Chef menage</th> 
                  <th>Age</th>
                  <th>Sexe</th> 
                  <th>Profession</th> 
                  <th>Active actuelle</th> 
                  <th>Téléphone</th> 
                  <th>Taille menage</th> 
                  <th>Nombre de femme</th> 
                  <th>Nombre d'handicap</th>
                  <th>Nombre d'enfant</th> 
									<th className='text-center'>Action</th>
								</tr>
							</thead>
							<tbody>
								{
                  enqueteDeplaceInterne.map((item, index) => <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.enquete_name }</td> 
                    <td>{item.commune_name }</td> 
                    <td>{dayjs(item.date_enquete).format("DD-MM-YYYY") }</td> 
                    <td>{item.localite_menage}</td> 
                    <td>{item.code_menage}</td>
                    <td>{item.chef_menage}</td> 
                    <td>{item.age}</td>
                    <td>{item.sexe}</td> 
                    <td>{item.profession}</td> 
                    <td>{item.active_actuelle}</td> 
                    <td>{item.telephone}</td> 
                    <td>{item.taille_menage}</td> 
                    <td>{item.nombre_femme}</td> 
                    <td>{item.nombre_handicap}</td>
                    <td>{item.nombre_enfant}</td> 
                    <td>
                      <Link className="btn btn-sm btn-primary" to={`/souapiti/view/${item.id}`}>
                        <i className="fa fa-eye"></i>
                      </Link>
                      {permissionHelper('enqueteDeplaceInterne','update_enqueteDeplaceInterne') && <Link className="btn btn-sm btn-success" to={`/souapiti/edit/${item.id}`}>
                        <i className="fa fa-edit"></i>
                      </Link>}
                      {permissionHelper('enqueteDeplaceInterne','delete_enqueteDeplaceInterne') && <Button className="btn-sm btn-danger" onClick={() => {
                          Swal.fire({
														title: 'Vous êtes sur le point de supprimer cette enquête',
														text: 'Êtes-vous sûr de continuer ?',
														icon: 'warning',
														showCancelButton: true,
														confirmButtonColor: '#3085d6',
														cancelButtonColor: '#d33',
														confirmButtonText: 'OUI',
														cancelButtonText: 'NON'
													}).then((result) => {
														if (result.isConfirmed) {
															deleteEnqueteDeplaceInternes(item.id).then(res => {
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
                        }
                      }>
                        <i className="fa fa-trash"></i>
                      </Button>}
                    </td>
                  </tr>)
                }
							</tbody>
						</table>
					</div>
				</CardBody>
			</Card>
		</Col>
	)
}