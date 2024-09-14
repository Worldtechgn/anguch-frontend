import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FormFeedback, Input, Row } from 'reactstrap';
import * as Yup from 'yup';
import { getDenres } from '../../../helpers/backend_type_data_catastrophe';

export const ModalHabitudeAlimentaire = (props) => {

  const {onHandleChangeHabitudeAlimentaire } = props

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const aliment_locaux_arr = ["Riz", "Haricot", "Maïs", "Manioc", "Huile", "Autres à préciser"]
  const[aliment_locaux_arr, setAliment_locaux_arr] = useState([])
  const initAlimentaire = () => {
    getDenres().then(resp => setAliment_locaux_arr(resp.map(r => r.name)))
  }

  useEffect(()=>{
    initAlimentaire()
  },[])

  const [isNotflotte, setIsNOFlotte] = useState(false)
  const handleFlotte = (e) => {
    if (e.target.value === 'Non') {
      setIsNOFlotte(true)
    } else {
      setIsNOFlotte(false)
    }
  }
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      aliment: "",
      grossiste: "OUI",
      capacite: "OUI",
      magasin: "OUI",
      flotte: "OUI",
      raison: ""
    },
    validationSchema: Yup.object().shape({
      aliment: Yup
        .string()
        .required("Le champ produit est obligatoire"),
      grossiste: Yup
        .string()
        .required("Le champ grossiste est obligatoire"),
      capacite: Yup
        .string()
        .required("Le champ capacité est obligatoire"),
      magasin: Yup
        .string()
        .required("Le champ magasin est obligatoire"),
      flotte: Yup
        .string()
        .required("Le champ flotte est obligatoire"),
    }),
    onSubmit: (values, actions) => {
      onHandleChangeHabitudeAlimentaire(values)
      actions.resetForm({aliment:""})
      setShow(false)
    }
  })

  return (
    <>
      <Button variant="primary" className='float-end btn btn-sm' style={{ backgroundColor: '#192957' }} onClick={handleShow}>Ajouter</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ backgroundColor: '#fff' }}>
          <Modal.Title>Habitudes alimentaires</Modal.Title>
        </Modal.Header>
        <Form className="needs-validation" onSubmit={e => {
						e.preventDefault()
						formik.handleSubmit()
						return false
					}}>
          <Modal.Body style={{ backgroundColor: '#fff' }}>
            <Row>
              <div className={"form-group "}>
                <label>Nom aliment</label>
                <select
                  name="aliment"
                  placeholder="Sélectionner"
                  onChange={formik.handleChange}
                  className={`form-control` + (formik.errors.aliment && formik.touched.aliment ? ' is-invalid' : '')}
                  onBlur={formik.handleBlur}
									value={formik.values.aliment || ""}
                >
                  <option>Sélectionner</option>
                  {aliment_locaux_arr.map((option, index) => <option key={index} value={option}>{option}</option>)}
                </select>
                {formik.errors.aliment ? <FormFeedback type="invalid">
                  {formik.errors.aliment}
                </FormFeedback> : ''}
              </div>
            </Row>
            <Row>
              <p style={{ marginTop: '20px' }}>a. Existe-t-il de grossistes pour cette spéculations ci-dessus dans votre zone d’habitation ?</p>
              <div className="form-group col-md-4">
                <select
                  name="grossiste"
                  className={"form-control" + (formik.errors.grossiste && formik.touched.grossiste ? ' is-invalid' : '')}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
									value={formik.values.grossiste || ""}
                >
                  <option value={'OUI'}>{'OUI'}</option>
                  <option value={'NON'}>{'NON'}</option>
                </select>
                {formik.errors.grossiste ? <FormFeedback type="invalid">
                  {formik.errors.grossiste}
                </FormFeedback> : ''}
              </div>
            </Row>
            <Row>
              <p>b. Ces grossistes ont-ils la capacité de fournir une livraison quel que soit la quantité en 24H ?</p>
              <div className="form-group col-md-4">
                <select
                  name="capacite"
                  className={"form-control" + (formik.errors.capacite && formik.touched.capacite ? ' is-invalid' : '')}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
									value={formik.values.capacite || ""}
                >
                  <option value={'OUI'}>{'OUI'}</option>
                  <option value={'NON'}>{'NON'}</option>
                </select>
                {formik.errors.capacite ? <FormFeedback type="invalid">
                  {formik.errors.capacite}
                </FormFeedback> : ''}
              </div>
            </Row>
            <Row>
              <p style={{ marginTop: '20px' }}>c. Ces grossistes disposent-ils des magasins de stockage dans votre zone ?</p>
              <div className="form-group col-md-4">
                <select
                  name="magasin"
                  className={"form-control " + (formik.errors.magasin && formik.touched.magasin ? ' is-invalid' : '')}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
									value={formik.values.magasin || ""}
                >
                  <option value={'OUI'}>{'OUI'}</option>
                  <option value={'NON'}>{'NON'}</option>
                </select>
                {formik.errors.magasin ? <FormFeedback type="invalid">
                  {formik.errors.magasin}
                </FormFeedback> : ''}
              </div>
            </Row>
            <Row>
              <p style={{ marginTop: '20px' }}>d. Disposent-ils de flottes de transport capable de répondre a tout besoin ?</p>
              <div className="form-group col-md-4">
                <select
                  name="flotte"
                  className={"form-control" + (formik.errors.flotte && formik.touched.flotte ? ' is-invalid' : '') }
                  onChange={handleFlotte}
                  onBlur={formik.handleBlur}
									value={formik.values.flotte || ""}
                >
                  <option value={'OUI'}>{'OUI'}</option>
                  <option value={'NON'}>{'NON'}</option>
                </select>
                {formik.errors.flotte ? <FormFeedback type="invalid">
                  {formik.errors.flotte}
                </FormFeedback> : ''}
              </div>
              {isNotflotte &&
                <div className="form-group col-md-8">
                  <Input
                    name="raison"
                    className={"form-control" + (formik.errors.raison && formik.touched.raison ? ' is-invalid' : '')}
                    onChange={formik.handleChange}
                    placeholder={"Raison la raison"}
                    onBlur={formik.handleBlur}
                    value={formik.values.raison || ""}
                  />
                  {formik.errors.raison ? <FormFeedback type="invalid">
                    {formik.errors.raison}
                  </FormFeedback> : ''}
                </div>
              }
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