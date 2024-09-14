import { useEffect, useState } from "react"
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Container, Modal, Row, Table } from "reactstrap"
import Swal from "sweetalert2"
import { deleteTraitement, getTraitementCatastrophe } from "../../helpers/backend_catastrophe"
import axiosApi from "../../helpers/api_helper"
import Traitement from "./Traitement"

const ViewTraitement = (props) => {

  const { match: { params }, history} = props
  const [files,setFiles] = useState([])
  const [traitement,setTraitement] = useState({})

  const [showEditModal, setShowEditModal] = useState(false);
	const handleCloseEditModal = () => setShowEditModal(false);
	const handleShowEditModal = () => setShowEditModal(true);
  
  function initData(){
    getTraitementCatastrophe(params.id).then(resp =>{
      setFiles(resp.files)
      setTraitement(resp.traitement)
    })
  }
  useEffect(() => {
    initData()
  },[params])

  const [path, setPath] = useState('')
  const [show, setShow] = useState(false)
  const handleViewFile = (path) => {
    setPath(path)
    setShow(true)
  }

  function handleBack(){
    history.push(`/view-catastrophe/${traitement.catastrophe.id}`)
  }

  const onSubmitTraitement = () => {
		handleCloseEditModal();
	};



  return (
    <>
      <div  className="page-content">
        <Container fluid={true}>
          <Row className="mb-2">
            <Col className="col-12">
              <Button onClick={()=>handleBack()} color={'warning'}>Fermer</Button> {" "}
              <Button onClick={
                () => {
                  Swal.fire({
                    title: 'Vous êtes sur le point de supprimer ce document de preuve',
                    text: 'Êtes-vous sûr de continuer ?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33' ,
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'OUI',
                    cancelButtonText: 'NON'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deleteTraitement(traitement.id).then(res => {
                        history.push(`/view-catastrophe/${traitement.catastrophe.id}`)
                      })
                    }
                  })
                }
                } color={'danger'} className="float-rigth"> Supprimer le traitement </Button> {" "}

                {/* <Button color='primary' className="waves-effect waves-light" style={{ backgroundColor: '#192957' }} onClick={() => traitementModal()}>
                  Ajouter le fichier
                </Button> */}

                <Modal
                  show={showEditModal}
                  onHide={handleCloseEditModal}
                  animation={true}
                  backdrop="static"
                  keyboard={false}
                  centered
                >
                  <Traitement
                    catastrophe={traitement.catastrophe}
                    show={handleShowEditModal}
                    onSubmitTraitement={onSubmitTraitement}
                    handleCloseEditModal={handleCloseEditModal}
                  />
                </Modal>


            </Col>
          </Row>
          <Row>
            <Col className={show ? "col-md-4" : 'col-md-12'}>
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardHeader><CardTitle> Traitement: <strong>{traitement && traitement?.catastrophe?.typeCatastrophe}</strong> </CardTitle></CardHeader>
                <CardBody>
                  {traitement.commentaire}
                  <hr/>
                  <Table>
                    <tbody>
                      {files.map((file,index)=> <tr key={index}>
                        <td>{'document de preuvre ' + (index + 1)}</td>
                        <td>
                          <Button onClick={()=>handleViewFile(file.path)} className={'btn-sm'} style={{ backgroundColor: '#192957' }}><i className="fa fa-eye"></i></Button> {" "}
                          <Button onClick={()=>{
                            Swal.fire({
                              title: 'Vous êtes sur le point de supprimer ce document de preuve',
                              text: 'Êtes-vous sûr de continuer ?',
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonColor: '#d33' ,
                              cancelButtonColor: '#3085d6',
                              confirmButtonText: 'OUI',
                              cancelButtonText: 'NON'
                            }).then((result) => {
                              if (result.isConfirmed) {
                                axiosApi.del(`/files/file-delete/${file.id}`).then(res => {
                                  initData()
                                })
                              }
                            })
                          }} color="red" className='btn-sm btn-danger'><i className='fa fa-trash'></i></Button>
                        </td>
                      </tr>)}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            {show && <Col className="col-md-8">
              <Button className="btn btn-sm btn-warning" onClick={()=>{setShow(!show)}}>Masquer</Button>
              <Card>
                <CardBody>
                  <object data={path} width="100%" height="500vh">{path}</object>
                </CardBody>
              </Card>
            </Col>}
          </Row>
        </Container>
      </div>
    </>
  )
}

export default ViewTraitement