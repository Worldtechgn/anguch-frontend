import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Controller, useForm } from 'react-hook-form';
import { Form } from 'reactstrap';
import { putTypeEnquete } from '../../../helpers/backend_type_enquete';

function EditModal({typeEnquete,onHide,loadData}) {

  const { register, handleSubmit, control, formState: { isLoading, errors }} = useForm({
    defaultValues: {
      name: typeEnquete.name
    }
  })

  const onSubmit = (data) => {
    putTypeEnquete(typeEnquete.id, data).then(response =>{
      onHide()
      loadData()
    }).catch(err => console.log(err));
  }

  const handleClose = () =>{
    onHide()
  }

  return (
    <>
      <Modal.Header closeButton style={{ backgroundColor: '#fff' }}>
        <Modal.Title>{'Editer le type d\'enquête'}</Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        noValidate>
        <Modal.Body style={{ backgroundColor: '#fff' }}>
          <div className='form-group'>
            <label htmlFor='name'>Nom</label>
            <Controller
              control={control}
              name="name"
              render = {
                ({field:{ onChange,value, name}})=>(
                  <input
                    className='form-control'
                    type="text"
                    onChange={onChange}
                    name={name}
                    defaultValue={value}
                    {...register('name',{ required: true })}
                  />
                )
              }
            />
            {errors.name && errors.name.type === "required" && <span className='text-red'>This is required</span>}
            {errors.name && errors.name.type === "maxLength" && <span className='text-red'>Max length exceeded</span> }
          </div>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#fff' }}>
          <Button variant="danger" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="primary" type="submit">
            Sauvegarder
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
}

export default EditModal;