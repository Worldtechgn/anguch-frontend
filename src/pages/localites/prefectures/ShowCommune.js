import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { withRouter } from 'react-router-dom';
import { CardBody, Table } from "reactstrap";

const ShowCommune = props => {
	const [edit, setEdit] = useState([]);

	useEffect(() => {
		setEdit(props.showCommunes)
	}, [props]);

	return (
		<>
			<Modal.Header style={{ backgroundColor: '#fff', }}>
				<Modal.Title>Les communes de la préfecture de {edit.nom} </Modal.Title>
			</Modal.Header>
			<Modal.Body style={{ backgroundColor: '#fff', }}>
				<CardBody>
					<div className="table-responsive">
						<Table className="table table-striped mb-0" id="datatable">
							<thead>
								<tr>
									<th>#</th>
									<th>communes</th>
								</tr>
							</thead>
							<tbody>
								{
									edit?.commune?.map((val, key) => (
										<tr key={key}>
											<td>{key + 1} </td>
											<td>{val?.nom} </td>
										</tr>
									))
								}
							</tbody>
						</Table>
					</div>
					<div className="form-group mt-2">
						<button type="button" onClick={props.onClose} className="btn btn-danger">
							<i className="fa fa-times"></i> Fermer
						</button>
					</div>
				</CardBody>
			</Modal.Body>
		</>
	);
};

export default (withRouter(ShowCommune));
