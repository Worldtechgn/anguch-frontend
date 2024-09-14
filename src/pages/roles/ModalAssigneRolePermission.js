import React, { useEffect, useMemo, useState, useCallback } from "react"
import { isEmpty } from "lodash"
import "bootstrap/dist/css/bootstrap.min.css"
import * as Yup from "yup"
import { useFormik } from "formik"

//import components

import {
	Col,
	Row,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	Input,
	Label,
} from "reactstrap"
import { Breadcrumbs } from "@material-ui/core"

function ModalAssigneRolePermission() {
	const [modal, setModal] = useState(false)


	const [user, setUser] = useState([])

	// validation
	const validation = useFormik({
		// }),
		onSubmit: values => {
			toggle()
		},
	})


	const toggle = useCallback(() => {
		if (modal) {
			setModal(false)
		} else {
			setModal(true)
		}
	}, [modal]);



	return (
		<React.Fragment>
			<div className="page-content">
				<div className="container-fluid">
					<Breadcrumbs title="Contacts" breadcrumbItem="User List" />

					<Modal isOpen={modal} toggle={toggle}>
						<ModalHeader toggle={toggle} tag="h4">
							Assignation des permission
						</ModalHeader>
						<ModalBody>
							<Form
								onSubmit={e => {
									e.preventDefault()
									validation.handleSubmit()
									return false
								}}
							>
								<Row>
									<Col className="col-12">
										<div className="mb-3">
											<Label className="form-label">Role</Label>
											<Input
												name="designation"
												type="designation"
											/>
										</div>
									</Col>
								</Row>
								<Row>
									<Col>
										<div className="text-end">
											<button
												type="submit"
												className="btn btn-success save-user"
											>
												Assigner
											</button>
										</div>
									</Col>
								</Row>
							</Form>
						</ModalBody>
					</Modal>
				</div>
			</div>
		</React.Fragment>
	)
}

export default ModalAssigneRolePermission