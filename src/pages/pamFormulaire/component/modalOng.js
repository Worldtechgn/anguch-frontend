import { useFormik } from 'formik';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FormFeedback, Input, Row } from 'reactstrap';
import * as Yup from 'yup';

export const ModalOng = (props) => {

  const { onHandleOng } = props

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showPoint, setShowPoint] = useState(false);

  const type_ongs = ['Internationale', 'Nationale', 'Locale']

  const changeIntervien = (e) => {
    const result = e.target.value;
    if (result === 'NON') {
      setShowPoint(true);
    } else {
      setShowPoint(false);
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nom: "",
      type: "",
      resident: "",
      intervient: "",
      point: ""
    },
    validationSchema: Yup.object().shape({
      nom: Yup
        .string()
        .required("Le champ nom de l'ong est obligatoire"),
      resident: Yup
        .string()
        .required("Le champ resident de l'ong est obligatoire"),
      intervient: Yup
        .string()
        .required("Le champ intervient de l'ong est obligatoire"),
      type: Yup
        .string()
        .required("Le champ type de l'ong est obligatoire")
    }),
    onSubmit: (values, actions) => {
      onHandleOng(values)
      actions.resetForm({ nom: "", type: "", resident: "", intervient: "", point: "" })
      setShow(false)
    }
  })

  return (
    <>
      <Button variant="primary" className='float-end btn btn-sm' style={{ backgroundColor: '#192957' }} onClick={handleShow}>Ajouter</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ backgroundColor: '#fff' }}>
          <Modal.Title>Ong opérants</Modal.Title>
        </Modal.Header>
        <Form className="needs-validation" onSubmit={e => {
          e.preventDefault()
          formik.handleSubmit()
          return false
        }}>
          <Modal.Body style={{ backgroundColor: '#fff' }}>
            <Row>
              <div className="form-group">
                <label htmlFor="nom_id">Nom</label>
                <Input
                  name='nom'
                  type="text"
                  placeholder="Saisir nom de l'ong"
                  className={"form-control " + (formik.errors.nom && formik.touched.nom ? ' is-invalid' : '')}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="nom_id"
                />
                {formik.errors.nom ? <FormFeedback type="invalid">
                  {formik.errors.nom}
                </FormFeedback> : ''}
              </div>
              <div className="form-group">
                <label htmlFor="nom_id">Type</label>
                <select
                  className={"form-control " + (formik.errors.type && formik.touched.type ? ' is-invalid' : '')}
                  name="type"
                  onChange={formik.handleChange}>
                  <option>Sélectionner</option>
                  {type_ongs.map((type, index) => <option value={type} key={index}>{type}</option>)}
                </select>
                {formik.errors.type ? <FormFeedback type="invalid">
                  {formik.errors.type}
                </FormFeedback> : ''}
              </div>

              <div className="form-group">
                <label htmlFor="resident_id">Resident</label>
                <select
                  className={"form-control " + (formik.errors.resident && formik.touched.resident ? ' is-invalid' : '')}
                  name="resident"
                  onChange={formik.handleChange}>
                  <option>Sélectionner</option>
                  <option value={'OUI'}>OUI</option>
                  <option value={'NON'}>NON</option>
                </select>
                {formik.errors.resident ? <FormFeedback type="invalid">
                  {formik.errors.resident}
                </FormFeedback> : ''}
              </div>

              <div className="form-group">
                <label htmlFor="intervient_id">Intervient</label>
                <select
                  className={"form-control " + (formik.errors.intervient && formik.touched.intervient ? ' is-invalid' : '')}
                  name="intervient"
                  onChange={(e) => { formik.handleChange(e); changeIntervien(e) }}>
                  <option>Sélectionner</option>
                  <option value={'OUI'}>OUI</option>
                  <option value={'NON'}>NON</option>
                </select>
                {formik.errors.intervient ? <FormFeedback type="invalid">
                  {formik.errors.intervient}
                </FormFeedback> : ''}
              </div>

              {showPoint ? <div className="form-group">
                <label htmlFor="point_id">Point focal</label>
                <Input
                  name='point'
                  type="text"
                  placeholder="Saisir point focal de l'ong"
                  className={"form-control " + (formik.errors.point && formik.touched.point ? ' is-invalid' : '')}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="point_id"
                />
                {formik.errors.point ? <FormFeedback type="invalid">
                  {formik.errors.point}
                </FormFeedback> : ''}
              </div> : ''}
            </Row>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: '#fff' }}>
            <Button variant="secondary" className='btn btn-sm btn-danger' onClick={handleClose}>
              Fermer
            </Button>
            <Button type="submit" className='btn btn-sm btn-default' style={{ backgroundColor: '#192957' }}>
              Sauvegarder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}