import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Card, CardBody, Col, Row } from "reactstrap";
import { permissions } from "../../common/data/permission";
import Select from 'react-select';
import { withRouter } from 'react-router-dom';
import { getShowRole, putRole } from "../../helpers/backend_role";
import Swal from "sweetalert2";
const EditRole = props => {

	// console.log(permissionHelper('catastrophe','view_catastrophe'));

	const {match: { params },history} = props
	const {handleSubmit, getValues, register, control, formState: { errors } } = useForm({
		defaultValues: params.id ?  async() => getShowRole(params.id).then(response => {				
			let respRole = {
				...response,
				name: response.name,
				permission: response.permission ? response.permission : []
			}
			return respRole;
		}) : {
			name:'',
			permission: []
		}
	})
	useFieldArray({
		control,
		name: "permission",
	});

	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer)
			toast.addEventListener('mouseleave', Swal.resumeTimer)
		}
	})
	

	const onSubmit = (data) => {		

		console.log("fields ==== ",permissions);
		console.log("fields ==== ",data);

		return
		putRole(params.id,data).then(() =>{
			Toast.fire({
				icon: 'success',
				title: 'Role enregistré avec succes.'
			})
		});
	};

	function getPermissionByAttribut(attribut) {
		return permissions[attribut]
	}

	return (
		<>
			<div className="page-content">
				<div className="container-fluid">
					<Row>
						<Col>
							<Card style={{backgroundColor:'#fff'}}>
								<CardBody>
									<form onSubmit={handleSubmit(onSubmit)}>
										<div className="form-group">
											<label htmlFor="name">Role {getValues('name')}</label>
												<input
													{...register('name')}
													className="form-control"
												/>
										</div>
										<hr/>
										<Row>
											{Object.keys(permissions).map((p,index)=>
												<Col className="col-md-6 mb-2" key={index}>
													<label>{p}</label>
													<div className="form-group">
														<Controller
															name={`permission.${index}.${p}`}
															control={control}
															render={({ field:{onChange,value,name} })=>(
															<Select
																name={name}
																isMulti = {true}
																value = {value}
																options = {getPermissionByAttribut(p)}
																onChange={onChange}
															/>
															)}
														/>
													</div>
												</Col>
											)}
										</Row>
										<hr/>
										<Row>
											<Col>
												<button className="btn btn-danger btn-sm" onClick={()=>{history.push("/liste-role")}} type={'submit'}>Fermer</button>
												<button className="btn btn-primary btn-sm float-end" type={'submit'}>Mise à jour</button>
											</Col>
										</Row>
									</form>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</div>
			</div>
		</>
	)
}

export default withRouter(EditRole);
