import Modal from 'react-bootstrap/Modal';
import { CardBody, Table } from "reactstrap";

const EncoursDeplaceinterne = props => {
	const { countInterne } = props
	
	return (
		<>
			<Modal.Header style={{ backgroundColor: '#fff', }}>
				<Modal.Title>les personnes encours de déplacement interne </Modal.Title>
			</Modal.Header>
			<Modal.Body style={{ backgroundColor: '#fff', }}>
				<CardBody>
					<div className="table-responsive">
						<Table className="table table-striped mb-0">
							<thead>
								<tr>
									<th>Prenom</th>
									<th>Nom</th>
									<th>Telephone</th>
									<th>Profession</th>
									<th>Age</th>
									<th>Sexe</th>
									<th>Région</th>
									<th>Prefecture</th>
								</tr>
							</thead>
							<tbody>
								{
									countInterne.map((val, key) => (
										<tr key={key}>
											<td>{val?.prenom ? val?.prenom : '' || val.personne?.prenom ? val.personne?.prenom : '-'} </td>
											<td>{val?.nom ? val?.nom : '' || val.personne?.nom ? val.personne?.nom : ''} </td>
											<td>{val?.telephone ? val?.telephone : '' || val.personne?.telephone ? val.personne?.telephone : '-'} </td>
											<td>{val?.profession ? val?.profession : '' || val.personne?.profession ? val.personne?.profession : '-'} </td>
											<td>{val?.age ? val?.age : '' || val.personne?.age ? val.personne?.age : ''} </td>
											<td>{val?.sexe ? val?.sexe : '' || val.personne?.sexe ? val.personne?.sexe : ''} </td>
											<td>{val?.region?.nom ? val?.region?.nom : '' || val.personne?.region?.nom ? val.personne?.region?.nom : '-'} </td>
											<td>{val?.prefecture?.nom ? val?.prefecture?.nom : '' || val.personne?.prefecture?.nom ? val.personne?.prefecture?.nom : '-'} </td>
										</tr>
									))
								}
							</tbody>
						</Table>
					</div>
					<div className="form-group mt-3">
						<button type="button" onClick={props.onCloseListe} className="btn btn-danger">
							<i className="fa fa-times"></i> Fermer
						</button>
					</div>
				</CardBody>
			</Modal.Body>
		</>
	);
};

export default EncoursDeplaceinterne;
