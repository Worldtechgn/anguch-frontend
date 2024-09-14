import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, CardBody, FormGroup, Label, Input, Button, Table, CardHeader } from "reactstrap"

//Import Breadcrumb
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types"
import { getShowCatastrophe } from '../../store/catastrophes/action';
import Modal from 'react-bootstrap/Modal';
import Traitement from './Traitement';
import EtatTraitement from './etatTraitement';
import { Link } from 'react-router-dom';
import { getShowCatastropheFiles } from '../../helpers/backend_catastrophe';

const ViewCatastrophe = props => {

	const { match: { params }, history, onShowCatastrophe, catastrophe } = props;

	useEffect(() => {
		onShowCatastrophe(params.id)
    catastropheFile();
	}, [onShowCatastrophe]);

  const [showEditModal, setShowEditModal] = useState(false);
	const handleCloseEditModal = () => setShowEditModal(false);
	const handleShowEditModal = () => setShowEditModal(true);

  const traitement = () => {
		handleShowEditModal();
	};

	const onSubmitTraitement = () => {
    onShowCatastrophe(params.id)
		handleCloseEditModal(false);
	};

  const[showEtatTraitement, setEtatShowTraitement] = useState(false);
  const handleCloseEtatTraitementModal = () =>setEtatShowTraitement(false)
  const handleShowEtatTraitementModal = () => setEtatShowTraitement(true)

  const handleEtatTraitement = () => {
    handleShowEtatTraitementModal()
  }

  const onSubmitEtatTraitement = () =>{
    handleCloseEtatTraitementModal(false)
    onShowCatastrophe(params.id)
  }

  const [fileCatastrohes, setFileCatastrophes] = useState([])
  const catastropheFile = () => {
    getShowCatastropheFiles(params.id).then(response => {
      setFileCatastrophes(response)
    }).catch(err =>{
      console.log(err);
    })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {/* <Breadcrumbs title="Formulaire" breadcrumbItem="Gestion des points focaux" /> */}
          <Row>
            <Col className="col-12">
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardBody>
                  <Row>
                    <Col className="col-12">
                      <Button color='danger' onClick={() => {
                        history.push('/liste-catastrophe')
                      }} className="waves-effect waves-light">
                        <i className="far fa-arrow-alt-circle-left"></i> Retour
                      </Button> {" "}
                      <Button color='primary' className="waves-effect waves-light" style={{ backgroundColor: '#192957' }} onClick={() => traitement(catastrophe)}>
                        Documents de preuves
                      </Button> {" "}
                      <Button color='secondary' className="waves-effect waves-light" onClick={() => handleEtatTraitement(catastrophe)}>
                        Traiter le catastrophe
                      </Button>
                     <hr />
                    </Col>
                    <div className="row">
                      <div className="border col-md-4">
                        <h3 className="font-size-20">Point focal : {catastrophe?.user?.first_name } {catastrophe?.user?.last_name} </h3><hr />
                        <ul className="list-unstyled product-desc-list text-muted"><li>
                          <i className="mdi mdi-circle-medium me-1 align-middle"></i><b>Prenom : </b>{catastrophe?.user?.first_name} </li>
                          <li><i className="mdi mdi-circle-medium me-1 align-middle"></i><b>Nom : </b>{catastrophe?.user?.last_name}</li>
                          <li><i className="mdi mdi-circle-medium me-1 align-middle"></i><b>Email : </b>{catastrophe?.user?.email}</li>
                          <li><i className="mdi mdi-circle-medium me-1 align-middle"></i><b>Telephone : </b>{catastrophe?.user?.phone}</li>
                          <li><i className="mdi mdi-circle-medium me-1 align-middle"></i>
                            <b>Lieu <a href={`http://maps.google.com/maps?&z=10&q=${catastrophe.lat}+${catastrophe.lng}&ll=${catastrophe.lat}+${catastrophe.lng}`} target='_blank'> <i className='fa fa-map-marker'></i> {catastrophe.lat}, {catastrophe.lng}</a> </b>
                          </li>
                        </ul>
                      </div>
                      <div className="border col-md-8">
                        <div className="text-muted">
                          <h3 className="font-size-20">
                            Etat de traitement :{" "}
                            {
                              catastrophe?.traite == 'Non' ? <span className="badge bg-info font-size-14 me-1">Non traiter</span> : ''
                                || catastrophe?.traite == 'Encours' ? <span className="badge bg-warning font-size-14 me-1">traitemeent encours</span> : <span className="badge bg-success font-size-14 me-1">Traité</span>
                            }
                          </h3>
                        </div>
                        <div style={styleTraitement}>
                          <Table>
                            <tbody>
                            {catastrophe?.traitement?.map((cat, index) => (
                              <tr key={index}>
                                <td>{cat.date}</td>
                                <td>{cat.commentaire}</td>
                                <td>
                                  <Link to={`/catastrophe/traitement/${cat.id}`} className="btn btn-primary btn-sm" style={{ backgroundColor: '#192957' }} ><i className='fa fa-eye'></i></Link>
                                </td>
                              </tr>
                            ))}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg={12}>
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardBody>
                  <Row>
                    <Col md={6}>
                      <FormGroup className="mb-3">
                        <div className="mb-3">
                          <Label htmlFor="formrow-typeCatastrophe-Input">Type de catastrophe </Label>
                          <input type="text" className='form-control' value={catastrophe.typeCatastrophe} disabled />
                        </div>
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup className="mb-3">
                        <div className="mb-3 col-md-12">
                          <Label className="form-label">Date et heure de la survenue de la catastrophe *</Label>
                          <div className='row'>
                            <div className='col-md-8'>
                              <input
                                className='form-control col-md-8'
                                disabled
                                value={catastrophe.date}
                              />
                            </div>
                            <div className='col-md-4'>
                              <input
                                className='form-control col-md-4'
                                disabled
                                value={catastrophe.heure}
                              />
                            </div>
                          </div>
                        </div>
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup className="mb-3">
                        <div className="mb-3">
                          <Label className="form-label">Nombre total de ménages affectés *</Label>
                          <input
                            disabled
                            className='form-control'
                            type="number"
                            value={catastrophe.nbreTotalMenage}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="mb-3">
                        <div className="mb-3">
                          <Label className="form-label">Nombre des hommes affectées *</Label>
                          <input
                            className='form-control'
                            disabled
                            type="number"
                            value={catastrophe.nbreHomme}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="mb-3">
                        <div className="mb-3">
                          <Label className="form-label">Nombre des femmes affectées *</Label>
                          <input
                            disabled
                            className='form-control'
                            type="number"
                            value={catastrophe.nbreFemme || ''}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="mb-3">
                        <div className="mb-3">
                          <Label className="form-label">Nombre d'enfant de moins de dix ans (-10 ans) affectées *</Label>
                          <input
                            disabled
                            className='form-control'
                            type="number"
                            value={catastrophe.nbreEnfant || ''}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="mb-3">
                        <div className="mb-3">
                          <Label className="form-label">Nombre de blessés*</Label>
                          <input
                            disabled
                            className='form-control'
                            type="number"
                            value={catastrophe.nbreBlesse || ''}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="mb-3">
                        <div className="mb-3">
                          <Label className="form-label">Nombre de morts*</Label>
                          <input
                            disabled
                            className='form-control'
                            type="number"
                            value={catastrophe.nbreMort || ''}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardBody>
                  <div className="form-group col-md-12 mt-3">
                    <label className='mb-4'>Type de denrées alimentaires détruite:</label><br />
                    {catastrophe?.typeDenre?.map((option, index) => (
                      <div className="row" key={index}>
                        {option.quantite === '' ? '' : <div className="col-md-4">
                          <div className="form-check" >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={option.nom}
                              defaultChecked={true}
                            />
                            <label className="form-check-label" htmlFor={option.nom}>
                              {option.nom}
                            </label>
                          </div>
                        </div>}
                        {option.quantite === '' ? '' : <div className="col-md-4">
                          <div className="form-check">
                            <input
                              className="form-control"
                              type="number"
                              disabled
                              value={option.quantite}
                              placeholder="Quantite"
                            />
                          </div>
                        </div>}
                        {option.quantite === '' ? '' : <div className="col-md-4">
                          <div className="form-check">
                            <input className='form-control' value={option.unite || ''} disabled={true} />
                          </div>
                        </div>}
                        {option.unite === '' ? '' : <hr className='mt-2' />}
                      </div>
                    ))}

                  </div>
                </CardBody>
              </Card>
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardBody>
                <div className="form-group col-md-12">
                    <label className='mb-4'>Matériels touchés *</label><br />
                    {catastrophe?.material?.map((option, index) => (

                      <div className="row" key={index}>
                        {option.quantite === '' ? '' :
                          <div className="col-md-6">
                            <div className="form-check" >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={option.nom}
                                value={option.isAdded || ''}
                                defaultChecked={option.quantite !== '' ? true : false}
                              />
                              <label className="form-check-label" htmlFor={option.name}>
                                {option.nom}
                              </label>
                            </div>
                          </div>}
                        {option.quantite === '' ? '' : <div className="col-md-6">
                          <div className="form-check">
                            <input
                              className="form-control"
                              type="number"
                              disabled={true}
                              value={option.quantite || ''}
                              placeholder={option.nom === 'Argents' ? 'Montant GNF' : 'Quantite'}
                            />
                          </div>
                        </div>}
                        {option.quantite === '' ? '' : <hr className='mt-2' />}
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardBody>
                  <Row>
                    <Col md={6}>
                      <FormGroup className="mb-3">
                        <div className="mb-3">
                          <Label className="form-label">Durée de la catastrophe *</Label>
                          <input
                            className='form-control'
                            disabled
                            type="number"
                            value={catastrophe.duree || ''}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="mb-3">
                        <div className="mb-3">
                          <Label htmlFor="formrow-uniteDuree-Input">Unité de la durée *</Label>
                          <input
                            disabled={true}
                            className='form-control'
                            value={catastrophe.uniteDuree || ''}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="mb-3">
                        <div className="mb-3">
                          <Label htmlFor="formrow-traite-Input">Etat de Traitement *</Label>
                          <input
                            disabled={true}
                            className='form-control'
                            value={catastrophe?.traite || ''}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="mb-3">
                        <div className="mb-3">
                          <Label htmlFor="formrow-region-Input">region</Label>
                          <input
                            disabled
                            value={catastrophe?.region?.nom || ''}
                            className="form-control" />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="mb-3">
                        <div className="mb-3">
                          <Label htmlFor="formrow-prefecture-Input">Prefecture</Label>
                          <input
                            disabled
                            id="prefecture"
                            value={catastrophe?.prefecture?.nom || ''}
                            className="form-control" />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="mb-3">
                        <div className="mb-3">
                          <Label htmlFor="formrow-commune-Input">Commmune</Label>
                          <input
                            disabled
                            id="commune"
                            value={catastrophe?.commune?.nom || ''}
                            className="form-control" />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md={12}>
                      <FormGroup className="mb-3">
                        <div className="mb-3">
                          <Label className="form-label">Description</Label>
                          <Input
                            disabled
                            type="textarea"
                            value={catastrophe?.description || ''}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              {
                fileCatastrohes.length > 0 && 
                <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                  <CardHeader>Documents de preuves</CardHeader>
                  <CardBody>
                    {
                      fileCatastrohes.map((file,index) => <figure className='figure' key={index}>
                          <a href={file.path} target='_blank'>
                            <img src={file.path} rel="noopener noreferrer" className=' figure-img img-fluid rounded img img-thumbnail' width={50}/>
                          </a>
                      </figure> )
                    }
                  </CardBody>
                </Card>
              }
            </Col>
            <Modal
							show={showEditModal}
							onHide={handleCloseEditModal}
							animation={true}
							backdrop="static"
							keyboard={false}
							centered
						>
							<Traitement
								catastrophe={catastrophe}
								show={handleShowEditModal}
								onSubmitTraitement={onSubmitTraitement}
								handleCloseEditModal={handleCloseEditModal}
							/>
						</Modal>

            <Modal
							show={showEtatTraitement}
							onHide={handleCloseEtatTraitementModal}
							animation={true}
							backdrop="static"
							keyboard={false}
							centered
						>
							<EtatTraitement
								catastrophe={catastrophe}
								show={handleShowEtatTraitementModal}
								onSubmitEtatTraitement={onSubmitEtatTraitement}
								handleCloseEtatTraitementModal={handleCloseEtatTraitementModal}
							/>
						</Modal>

          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

ViewCatastrophe.propTypes = {
	catastrophe: PropTypes.object,
	onShowGetCatastrophe: PropTypes.func,
}

const mapStateToProps = ({ catastrophes }) => ({ catastrophe: catastrophes.catastrophe })

const mapDispatchToProps = dispatch => ({
	onShowCatastrophe: (id) => dispatch(getShowCatastrophe(id))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(ViewCatastrophe))

const styleTraitement = {
  height:'150px',
  minHeight:'150px',
  overflowY: 'scroll',
}