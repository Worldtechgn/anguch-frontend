import { useFormik } from "formik";
import { MDBIcon } from "mdbreact"
import { useEffect, useState } from "react";
import { 
  Button, 
  Card,
  CardBody, 
  Col,
  Container, 
  FormFeedback, 
  Row, 
  Table, 
  Modal, 
  ModalHeader, 
  ModalBody,
  ModalFooter, 
  CardTitle,
} from "reactstrap"
import axiosApi from "../../helpers/api_helper";
import * as Yup from 'yup';
import Swal from "sweetalert2";

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types"
import { getProduits } from "../../store/produit/action";
import { DownloadExcel } from "react-excel-export";
import { getPrixDesProduitBackend, getPrixProduitNoPaginateBackend } from "../../helpers/backend_prix_produit";
import { useForm } from "react-hook-form";
import DetailsPrixProduit from "./detailsPrixProduit";

const PrixProduit = (props) => {

  const {
    onGetProduit, 
    produits
  } = props

  const newDate = new Date()
  const [dateAjout, setDateAjout] = useState(`${newDate.getFullYear()}-${(newDate.getMonth() + 1).toString().padStart(2, '0')}`)
  const [search, setSearch] = useState("")
  const [modal, setModal] = useState(false);
  const [listPrice, setListPrice] = useState([])
  const [label, setLabel] = useState("Ajouter le prix des produit")
  const [isShow, setIsShow] = useState(false)
  const [classBtn, setClassBtn] = useState("#192957")
  const [isEdit, setIsEdit] = useState(false)
  const [produit_ids,setProduit_ids] = useState('')

  const [prix_produits, setPrix_produits] = useState([])

  const [modalFile, setModalFile] = useState(false)
  const [file, setFile] = useState(false)
  const [pdtSelect,setPdtSelect] = useState({})
  const [pathPreuve, setPathPreuve] = useState('')
  const [fileId, setFileId] = useState('')

  useEffect(() => {
    initPrixProduit()
    onGetProduit()
  }, [onGetProduit])

  const initialValues = {
    addedPrix: []
  }
  const validationSchema = {}
  produits.forEach((prd, i) => {
    const elm = listPrice.filter(l => l.produit.id === prd.id)[0]

    initialValues[`id_${i}`] = elm?.id || 0
    initialValues[`produit_${i}`] = prd.id
    initialValues[`unite_${i}`] = elm?.unite || ""
    initialValues[`prix_${i}`] = parseInt(elm?.prix) || 0

    validationSchema[`prix_${i}`] = Yup.string().required(`Le prix ${prd.name} est obligatoire`)
  });
 
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object().shape(validationSchema),
    onSubmit: (values, actions) => {
      const datas = []
      for (let idx = 0; idx < produits.length; idx++) {
        if (values[`unite_${idx}`] !== ""  && values[`prix_${idx}`] > 0) {
          datas.push({
            id: values[`id_${idx}`],
            nom: produits[idx].nom,
            date: dateAjout+'-01',
            produit: values[`produit_${idx}`],
            unite: values[`unite_${idx}`],
            prix: values[`prix_${idx}`],
            isNew: false
          });
        }
      }

      values.addedPrix.forEach(aP => {
        if (aP.nom !== "" && aP.unite !== ""  && aP.prix > 0) {
          datas.push({
            id: -1,
            nom: aP.nom,
            date: dateAjout+'-01',
            produit: 0,
            unite: aP.unite,
            prix: aP.prix,
            isNew: true
          });
        }
      });
      if(isEdit){
        axiosApi.patch(`/produit-prefecture/${produit_ids}`, datas).then(res => {
          actions.resetForm(initialValues)
          actions.setSubmitting(false)
          setIsShow(false)
          setClassBtn("#192957")
          setLabel("Ajouter le prix de produit")
          initPrixProduit()
          onGetProduit()
        }, (err) => {
          setIsShow(false)
          setClassBtn("#192957")
          setLabel("Ajouter le prix de produit")
          actions.setSubmitting(false);
          initPrixProduit()
          onGetProduit()
        })
      }else{
        axiosApi.post('/produit-prefecture', datas).then(res => {
          actions.resetForm(initialValues)
          actions.setSubmitting(false)
          setIsShow(false)
          setClassBtn("#192957")
          setLabel("Ajouter le prix de produit")
          initPrixProduit()
          onGetProduit()
        }, (err) => {
          setIsShow(false)
          setClassBtn("#192957")
          setLabel("Ajouter le prix de produit")
          actions.setSubmitting(false);
          initPrixProduit()
          onGetProduit()
        })
      }
    }
  })


  const format_date = (date_str) => {
    const month = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
    const dateArr = new Date(date_str)
    return `${month[dateArr.getUTCMonth()]} ${dateArr.getFullYear()}`;
  }

  const handleAddProduit = (values, setValues) => {
    setValues({
      ...values,
      addedPrix: [
        ...values.addedPrix, 
        {
          nom: '',
          unite: '',
          prix: 0
        }
      ]
    })
  }

  const changeDateAjout = (e) => {
    setDateAjout(e.target.value)
  }

  const initPrixProduit = async () => {
    getPrixProduitNoPaginateBackend().then(resp =>{
      setPrix_produits(resp)
    })
  }

  const handleEditProduit = () => {
    setIsShow(true)
    setLabel("Femer")
    setClassBtn("btn-danger")
    const pdt_date = new Date(listPrice[0].date)
    setDateAjout(`${pdt_date.getFullYear()}-${(pdt_date.getMonth() + 1).toString().padStart(2, '0')}`)
    setModal(!modal);
    setIsEdit(true)
  }

  const onSetModals = (etat=null) => etat === null ? setModal(!modal) : setModal(etat)

  const handleDeleteProduits = (periode, region, prefecture) => {
    Swal.fire({
      title: 'Suppression d\'une soumission',
      text: 'Etes-vous sûre de supprimer cette soumission',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
      confirmButtonText: 'OUI',
      cancelButtonText: 'NON'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosApi.delete(`/produit-prefecture/delete/${periode}/${region}/${prefecture}`).then((res) => {
          initPrixProduit()
          onGetProduit()
        })
      }
    })
  }


  // 
  const handleShowAdd = () => {
    modeEdit()
    formik.resetForm(initialValues)
  }

  const modeEdit = () => {
    if (!isShow) {
      setLabel("Femer")
      setClassBtn("#fe0000")
      setIsShow(true)
    } else {
      setClassBtn("#192957")
      setLabel("Ajouter le prix de produit")
      setIsShow(false)
    }
  }
  const handleSaveProuit = () => {
    setIsShow(false)
    setClassBtn("#192957")
    setLabel("Ajouter le prix de produit")
  }


  const handSearch = (e) => setSearch(e.target.value)

  const month = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

  const toggle = async (produit_ids='', active=false) => {
    setModal(!modal)
    if (active) {
      setProduit_ids(produit_ids)
      getPrixDesProduitBackend(produit_ids).then(resp =>{
        setListPrice(resp)
      })
    } else {
      setListPrice([])
    }
  }

  const togleFileProduit = (pdt) => {
    setModalFile(!modalFile)
    setPdtSelect(pdt)
    setFile(false)
    if(pdt){
      axiosApi.get(`/files/document-preuves/${pdt.date_prix}/${pdt.prefecture}`).then(response => {
        setPathPreuve('')
        if(response.data.path){
          setFile(true)
          setFileId(response.data.id)
          setPathPreuve(response.data.path)
        }
      })
    }
  }
  
  const formData = new FormData();
  const {register, handleSubmit,watch} = useForm();
  const onSubmitFile = async (data) => {
		const watchedData = watch();    
    for (const key of Object.keys(watchedData.document_preuves)) {
      formData.append('document_preuves', watchedData.document_preuves[key])
    }
    formData.append('type_data','prix_produit')
    formData.append('date_prix_produit',pdtSelect.date_prix)
    formData.append('prefecture',pdtSelect.prefecture)
    axiosApi.post('/files/upload', formData).then(resp => {
      // console.log(resp);
      setModalFile(!modalFile)
		}).catch(error => {
      setModalFile(!modalFile)
			Swal.fire({
				toast: true,
				position: 'top-end',
				text: 'Enregistrement nom effectué avec success.',
				icon: 'error',
				showConfirmButton: false,
				timer: 2000
			})
		})
	};

  const deleteFile = () =>{
    Swal.fire({
      title: 'Vous êtes sur le point de supprimer ce document de preuve',
      text: 'Êtes-vous sûr de continuer ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'OUI',
      cancelButtonText: 'NON'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosApi.delete(`/files/file-delete/${fileId}`).then(res => {
          setFile(!file)
          Swal.fire({
            toast: true,
            position: 'top-end',
            text: 'Suppression effectué avec success.',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          })

        }).catch(erro => {
          console.log(erro);
          Swal.fire({
            toast: true,
            position: 'top-end',
            text: 'Suppression echoué.',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
          })
        })
      }
    })

  }

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            {/* <Col className="col-md-2">
              <div className="form-group">
                <Button className={"btn btn-sm "} type="button" onClick={handleShowAdd} style={{ backgroundColor: classBtn }}>{ label }</Button>
              </div>
            </Col> */}
            <Col className="col-md-2">
              {
                !modal &&
                <DownloadExcel
                  data={prix_produits.filter(prix_produit => {
                    return prix_produit?.region.toLowerCase().includes(search.toLowerCase()) 
                    || prix_produit?.prefecture.toLowerCase().includes(search.toLowerCase()) 
                    || prix_produit?.user_first_name.toLowerCase().includes(search.toLowerCase())
                    || prix_produit?.user_last_name.toLowerCase().includes(search.toLowerCase())
                    || format_date(prix_produit?.date_prix).toLowerCase().includes(search.toLowerCase())
                  }).map(el=>{
                    return{
                      Periode: format_date(el?.date_prix),
                      Region: el?.region,
                      Prefecture: el?.prefecture,
                      PointFocal: `${el?.user_first_name} - ${el?.user_last_name}`,
                      Nombre: parseInt(el?.nombre)
                    }
                  })}
                  buttonLabel="Exporter"
                  style={{ bgColor: "#cfed39" }}
                  fileName="liste-des-produits"
                  className="button_export btn btn-success btn-primary"
                > </DownloadExcel>
              }
            </Col>
            <Col className="col-md-4"></Col>
            <Col className="col-md-4">
              <div className="card-tools d-flex align-items-center col-md-12">
                {
                  !modal &&
                  <div className="input-group input-group-sm">
                    <input className="form-control my-0 py-1 float-right" type="text" placeholder="Recherche"
                      onChange={handSearch}
                      aria-label="Recherche" />
                    <div className="input-group-prepend">
                      <span className="input-group-text purple lighten-2" style={{ backgroundColor: '#192957' }} id="basic-text1">
                        <MDBIcon className="text-write" icon="search" style={{ color: '#fff' }} />
                      </span>
                    </div>
                  </div>
                }
              </div>
            </Col>
            <hr />
          </Row>
            
          {!modal && isShow &&
          <Row>
            <Col className="m-auto col-md-9">
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardBody>
                  <CardTitle className="mt-2 mb-4">Ajouter les prix des produits </CardTitle>
                  <form onSubmit={e => {
                    e.preventDefault()
                    formik.handleSubmit()
                    return false
                  }}>
                    <Row>
                      <div className="form-group col-md-4">
                        <label htmlFor="dateId">Période</label>
                        <input type="month" onChange={(e) => changeDateAjout(e)} value={dateAjout} className="form-control" />
                        {formik.errors.date ? <FormFeedback type="invalid">
                          {formik.errors.date}
                        </FormFeedback> : ''}
                      </div>
                    <Row>
                    <h5 className="mt-3">Produits</h5>
                    </Row>
                      {
                        produits.map((pdt, index) => (
                          <div className="col-md-12 mb-2" key={pdt.id}>
                            <Row>
                              <input type="hidden" name={`produit_${index}`} />
                              <input type="hidden" name={`id_${index}`} />
                              <h6 className="col-md-4 my-auto">{pdt.name}</h6>
                              <div className="form-group col-md-4">
                                <label htmlFor={`unite_${index}`}>Unité {pdt.name}</label>
                                <select className={"form-control" + (formik.errors[`unite_${index}`] ? ' is-invalid' : '')}
                                  id={`unite_${index}`}
                                  name={`unite_${index}`}
                                  onChange={formik.handleChange}
                                  value={formik.values[`unite_${index}`]}
                                >
                                  <option value="">Sélectionner un produit</option>
                                  {["Kg", "Tonne", "Sac", "Grenier", "Litre", "baquette"].map((unite, index) => <option key={index} value={unite}>{unite}</option>)}
                                </select>
                                {formik.errors[`unite_${index}`] ? <FormFeedback type="invalid">
                                  {formik.errors[`unite_${index}`]}
                                </FormFeedback> : ''}
                              </div>
                              <div className="form-group col-md-4">
                                <label htmlFor={`prix_${index}`}>Prix {pdt.name}</label>
                                <input className={"form-control" + (formik.errors[`prix_${index}`] && formik.touched[`prix_${index}`] ? 'is-invalid' : '')}
                                  placeholder="prix du produit"
                                  id={`prix_${index}`}
                                  name={`prix_${index}`}
                                  type="number"
                                  min={0}
                                  onChange={formik.handleChange}
                                  value={formik.values[`prix_${index}`]}
                                />
                                {formik.errors[`prix_${index}`] ? <FormFeedback type="invalid">
                                  {formik.errors[`prix_${index}`]}
                                </FormFeedback> : ''}
                              </div>
                            </Row>

                          </div>
                        ))
                      }
                      <h5 className="mt-3">Autres produits</h5>
                      {
                        formik.values.addedPrix.map((adp, idx) => {
                          const addErrors = formik.errors.addedPrix?.length && formik.errors.addedPrix[idx] || {};
                          const addTouched = formik.touched.addedPrix?.length && formik.touched.addedPrix[idx] || {};
                          return (
                            <div className="col-md-12 mb-2" key={idx+1}>
                              <Row>
                                <div className="form-group col-md-4">
                                  <label htmlFor={`addedPrix.${idx}.nom`}>Nom du produit {idx + 1 }</label>
                                  <input className={"form-control" + (addErrors.nom && addTouched.nom ? 'is-invalid' : '')} 
                                    placeholder="nom du produit"
                                    id={`addedPrix.${idx}.nom`}
                                    name={`addedPrix.${idx}.nom`}
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.addedPrix[idx].nom}
                                  />
                                </div>
                                <div className="form-group col-md-4">
                                  <label htmlFor={`addedPrix.${idx}.unite`}>Unité produit {idx + 1 }</label>
                                  <select className={"form-control"  + (addErrors.nom && addTouched.nom ? 'is-invalid' : '')}
                                    id={`addedPrix.${idx}.unite`}
                                    name={`addedPrix.${idx}.unite`}
                                    onChange={formik.handleChange}
                                    value={adp.unite}
                                  >
                                    <option value="">Sélectionner un produit</option>
                                    {["Kg", "Tonne", "Sac", "Grenier", "Litre", "baquette"].map((unite, index) => <option key={index} value={unite}>{unite}</option>)}
                                  </select>
                                </div>
                                <div className="form-group col-md-4">
                                  <label htmlFor={`addedPrix.${idx}.prix`}>Prix produit{idx+1}</label>
                                  <input className={"form-control"  + (addErrors.nom && addTouched.nom ? 'is-invalid' : '')}
                                    placeholder="prix du produit"
                                    id={`addedPrix.${idx}.prix`}
                                    name={`addedPrix.${idx}.prix`}
                                    type="number"
                                    min={0}
                                    onChange={formik.handleChange}
                                    value={adp.prix}
                                  />
                                </div>
                              </Row>
  
                            </div>
                          )
                        })
                      }
                      
                    </Row>
                    <Button type="button" style={{ backgroundColor: '#192957' }} onClick={e => handleAddProduit(formik.values, formik.setValues)} className="btn btn-sm btn-primary">
                      <i className='fa fa-plus'></i> Ajouter un produit
                    </Button>
                    <hr />
                    <Row>
                      <div className="form-group col-md-12">
                        <Button type="submit" style={{ backgroundColor: '#192957' }} disabled={formik.isSubmitting} className="btn btn-sm btn-default float-end">
                          {formik.isSubmitting && <span className="spinner-border btn-primary spinner-border-sm mr-1"></span>}
                          <i className='fa fa-save'></i> Sauvegarder
                        </Button>
                        <Button type="button" style={{ backgroundColor: '#fe0000' }} onClick={handleSaveProuit} className="btn btn-sm btn-secondary float-end mx-2">
                          {formik.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                          <i className='fa fa-times'></i> Fermer
                        </Button>
                      </div>
                    </Row>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>}

          {!isShow &&
          <Row>
            <Col className="col-md-12">
              {
                !modal &&
                <div className="table-responsive">
                  <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                    <CardBody>
                      <CardTitle className="mt-2 mb-4">Liste des prix de produits </CardTitle>
                      <Table className="table table-striped mb-0 table-hover" id="table-to-xls">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Mois</th>
                            <th>Région</th>
                            <th>Préfecture</th>
                            <th>Point focal</th>
                            <th>Produit</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {prix_produits.filter(prix_produit => {
                            return prix_produit?.region.toLowerCase().includes(search.toLowerCase()) 
                            || prix_produit?.prefecture?.toLowerCase().includes(search.toLowerCase()) 
                            || prix_produit?.user_first_name.toLowerCase().includes(search.toLowerCase())
                            || prix_produit?.user_last_name.toLowerCase().includes(search.toLowerCase())
                            || format_date(prix_produit?.date_prix).toLowerCase().includes(search.toLowerCase())
                          }).map((pdt, index) => <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{format_date(pdt?.date_prix)}</td>
                            <td>{pdt?.region}</td>
                            <td>{pdt?.prefecture}</td>
                            <td>{pdt?.user_first_name} {pdt?.user_last_name}</td>
                            <td>
                              <div>
                                <Button className="btn btn-sm btn-success" onClick={(e) => toggle(pdt?.produit_ids, true)}>
                                  <strong>{pdt?.nombre}</strong>
                                </Button>
                              </div>
                            </td>
                            <td>
                              <Button className="btn btn-sm"  onClick={(e) => toggle(pdt?.produit_ids, true)} style={{ backgroundColor: '#192957' }}><i className="fa fa-eye"></i></Button>{' '}
                              <Button className="btn btn-sm btn-success"  onClick={(e) => togleFileProduit(pdt, true)}><i className="fa fa-paperclip"></i></Button>
                              <Button className="btn btn-sm ms-1 btn-danger" onClick={() => { handleDeleteProduits(pdt?.date_prix, pdt?.region, pdt?.prefecture) }} ><i className="fa fa-trash"></i> </Button>
                            </td>
                          </tr>)}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </div>
              }
              {
                modal &&
                <DetailsPrixProduit
                  listsPrice={listPrice}
                  initPrixProduit={initPrixProduit}
                  onGetProduit={onGetProduit}
                  onSetModals={onSetModals}
                  onHandleEditProduit={handleEditProduit}
                />
              }
              {
                modalFile && 
                <Modal size="lg" backdrop={false} style={{ backgroundColor: '#fff', }} isOpen={modalFile} toggle={togleFileProduit}>
                  <ModalHeader toggle={togleFileProduit}>{'Document de preuve'}</ModalHeader>
                  <form className="needs-validation" id="form_traitement" onSubmit={handleSubmit(onSubmitFile)}>
                    <ModalBody>
                      {!file && 
                        <div className="form-group">
                          <label>Document de preuve</label>
                          <input type="file" className="form-control" name={'document_preuves'} {...register('document_preuves')} accept=".pdf" />
                        </div>
                      }
                      {file &&
                        <Row className="mt-2">
                          <Col className="col-12">
                            <Button className="btn btn-sm btn-danger mb-2" onClick={deleteFile} >Supprimer</Button>
                            <object data={pathPreuve} width="100%" height="500vh">{pathPreuve}</object>
                          </Col>
                        </Row>
                      }
                    </ModalBody>
                    <ModalFooter>
                      <Button className="btn btn-sm btn-primary" type="submit" style={{ backgroundColor: '#192957' }}>Sauvegarder</Button>
                      <Button className="btn btn-sm" type="button" color="danger" onClick={togleFileProduit}>Fermer</Button>
                    </ModalFooter>
                  </form>
                </Modal>
              }
            </Col>
          </Row>}
        </Container>
      </div>
    </>
  )
}

// export default PrixProduit

PrixProduit.propTypes = {
  produits: PropTypes.array,
  onGetProduit: PropTypes.func,
}

const mapStateToProps = ({produits }) => ({ 
  produits: produits.produits
})

const mapDispatchToProps = dispatch => ({
  onGetProduit: () => dispatch(getProduits())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PrixProduit))