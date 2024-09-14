import { useFormik } from 'formik';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Input } from 'reactstrap';

export const ModalDisponibilite = (props) => {

  const { onHandleDisponibilite } = props

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const aliment_locaux_arr = ["Riz", "Haricot", "Maïs", "Manioc", "Huile", "Autres à préciser"]
  const disponibilite_produit_etat = ["Très Bon", "Bon", "Mauvais", "Très mauvais"]


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      aliment: "",
      disponibilite: "",
      raison: "",
    },
    onSubmit: (values, actions) => {
      onHandleDisponibilite(values)
      actions.resetForm({ aliment: "", disponibilite: "", pdtRaison: "" })
    }
  })

  return (
    <>
      <Button variant="primary" className='float-end btn btn-sm' style={{ backgroundColor: '#192957' }} onClick={handleShow}>Ajouter</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ backgroundColor: '#fff' }}>
          <Modal.Title>Disponibilité</Modal.Title>
        </Modal.Header>
        <Form className="needs-validation" onSubmit={e => {
          e.preventDefault()
          formik.handleSubmit()
          return false
        }}>
          <Modal.Body style={{ backgroundColor: '#fff' }}>
            <div className="form-group">
              <label htmlFor="pdt_aliment">Aliment</label>
              <select
                id="pdt_aliment"
                className="form-control"
                name="aliment"
                onChange={formik.handleChange}
                value={formik.values.aliment}
              >
                <option>Sélectionner</option>
                {aliment_locaux_arr.map((val, index) => <option key={index} value={val}>{val}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="pdt_disponibilite">Disponibilité</label>
              <select
                id="pdt_disponibilite"
                className="form-control"
                name="disponibilite"
                onChange={formik.handleChange}
                value={formik.values.disponibilite}
              >
                <option>Sélectionner</option>
                {disponibilite_produit_etat.map((val, index) => <option key={index} value={val}>{val}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="pdt_raison">Raison</label>
              <Input
                id="pdt_raison"
                className="form-control"
                name="raison"
                placeholder="Saisser la raison"
                onChange={formik.handleChange}
                value={formik.values.raison}
              />
            </div>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: '#fff' }}>
            <Button variant="secondary" className='btn btn-sm btn-danger' onClick={handleClose}>
              Fermer
            </Button>
            <Button type="submit" className='btn btn-sm btn-default' style={{ backgroundColor: '#192957' }} onClick={handleClose}>
              Sauvegarder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}