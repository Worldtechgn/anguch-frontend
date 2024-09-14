import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { Form } from 'reactstrap';
import { postTypeEnquete } from '../../../helpers/backend_type_enquete';

function AddModal({loadData}) {

  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  function makeRevision(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const { register, handleSubmit, formState: {errors }} = useForm({
    defaultValues:{
      name: ''
    }
  })

  const onSubmit = (data) => {
    console.log(data);
    postTypeEnquete({
      ...data,
      revision: makeRevision(24)
    }).then(()=>{
      setShow(false);
      loadData()
    })
  }

  return (
    <>
     <Button variant="primary" onClick={handleShow}>
        Ajouter un type d'enqête
      </Button>

      <Modal show={show} onHide={handleClose} animation={false} >
        <Form onSubmit={handleSubmit(onSubmit)} >
          <Modal.Header closeButton style={{ backgroundColor: '#fff'}}>
            <Modal.Title>{'Nouveau type d\'enquête'}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#fff' }}>
            <div className='form-group'>
              <label htmlFor='name'>Nom</label>
              <input className='form-control'
                {...register('name',{ required: true })}
              />
              {errors.name && errors.name.type === "required" && <span>This is required</span>}
              {errors.name && errors.name.type === "maxLength" && <span>Max length exceeded</span> }
            </div>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: '#fff'}}>
            <Button variant="danger" onClick={handleClose}>
              Fermer
            </Button>
            <Button type='submit' variant="primary" >
              Sauvegarder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default AddModal;