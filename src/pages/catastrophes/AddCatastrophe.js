import React, { useEffect, useState } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Label,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from "reactstrap"

import { connect, useDispatch } from 'react-redux';
import PropTypes from "prop-types"
import { withRouter, Link} from 'react-router-dom';
import Select from 'react-select';

import classnames from "classnames"
import { 
  getCatastrophes, 
  getCommunes, 
  getDenres, 
  getMateriels, 
  postCatastrophes,
  putCatastrophes
} from "../../store/actions";
import DenreArray from "./DenreArray";
import MaterialArray from "./MaterielArray";
import { 
  getShowCatastrophe,
} from "../../helpers/backend_catastrophe"
import { getPrefecturesByRegions } from "../../helpers/backend_prefecture";
import { getCommunesByPrefectures } from "../../helpers/backend_commune";
import { getRegions } from "../../helpers/backend_region";

const AddCatastrophe = (props) => {
  const [isEdit,setIsEdit] = useState(false)
  const dispatch = useDispatch()
  const { 
    onGetMateriels,
    onGetDenres,
    onGetCatastrophes,
    typeDataMateriels,
    match: { params },
  } = props;

  useEffect(() => {
    onGetMateriels();
    onGetDenres();
    onGetCatastrophes();
	}, [
    onGetDenres,
    onGetMateriels,
    onGetCatastrophes
  ])

  const [prefectures, setPrefectures] = useState([])
  const [communes, setCommunes] = useState([])

  const [activeTab, setactiveTab] = useState(1)
  
  const { register, handleSubmit, control, setValue ,values, formState: { isLoading }} = useForm({
    enableReinitialize: true,
    defaultValues: params.id ? async() => getShowCatastrophe(params.id).then(response => {

      getPrefecturesByRegions(response?.region?.id).then(response => setPrefectures(response))
      getCommunesByPrefectures(response?.prefecture?.id).then(response => setCommunes(response))

      let resCastrophe = {
        ...response,
        region:{value: response.region.id, label: response.region.nom},
        prefecture:{value: response.prefecture.id, label: response.prefecture.nom},
        commune:{value: response.commune.id, label: response.commune.nom},
      }
      return resCastrophe
    }) : {
      region: "",
      prefecture: "",
      commune: "",
      typeCatastrophe: "",
      date: "",
      heure: "",
      nbreTotalMenage: "",
      nbreTotalPersonne: "",
      nbreHomme: "",
      nbreFemme: "",
      nbreEnfant: "",
      nbreMort: "",
      nbreBlesse: "",
      quantiteDenre: "",
      typeDenre:  [{nom:"",quantite:"",unite:""}],
      uniteDenre:"",
      material: [{nom:"",quantite:""}],
      duree: "",
      uniteDuree: "",
      traite: "",
      description: "",
      mobile: false
    }
  });
  const [catastrophe, setCatastrophe] = useState({})
  const showCatastrophe = async (id,setValue) => {
    const _catastrophe = await getShowCatastrophe(id)
    setCatastrophe(_catastrophe)
  }
  const[regions, setRegions] = useState([])
  const regionPrefectureCommune = () =>{
    getRegions().then(response => {
      setRegions(response)
    })
  }

  useEffect(() => {
    if(params.id){
      showCatastrophe(params.id,setValue)

      if(isEdit){
        setIsEdit(false)
      }else{
        setIsEdit(true)
      }
    }
    regionPrefectureCommune()
  },[params.id]);

  const onSubmit = data => {
    toggleTab(activeTab + 1)
    if(activeTab === 3){
      data.nbreTotalMenage = parseInt(data.nbreTotalMenage.toString())
      data.nbreTotalPersonne = parseInt(data.nbreTotalPersonne.toString())
      data.nbreHomme = parseInt(data.nbreHomme.toString())
      data.nbreFemme = parseInt(data.nbreFemme)
      data.nbreEnfant = parseInt(data.nbreEnfant)
      data.nbreMort = parseInt(data.nbreMort)
      data.nbreBlesse = parseInt(data.nbreBlesse)
      data.quantiteDenre = parseInt(data.quantiteDenre)
      data.region = data.region.value
      data.prefecture = data.prefecture.value
      data.commune = data.commune.value

      if(params.id){
        dispatch(putCatastrophes(params.id, data, props.history));
      }else{
        dispatch(postCatastrophes(data, props.history));
      }
    }
  };


  function toggleTab(tab) {
    if (activeTab !== tab) {
      if (tab >= 1 && tab <= 3) {
        setactiveTab(tab)
      }
    }
  }

  return (

    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          >
          <Row>
            <Col lg="12">
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardBody>
                  <h4 className="card-title mb-4">Profil alimentaire</h4>
                  <div className="wizard clearfix">
                    <div className="steps clearfix">
                      <ul>
                        <NavItem
                          className={classnames({ current: activeTab === 1 })}>
                          <NavLink
                            className={classnames({ current: activeTab === 1 })}
                            onClick={() => {
                              setactiveTab(1)
                            }}
                          >
                            <span className="number">1.</span>{" "}
                              Identification
                            </NavLink>
                        </NavItem>
                        <NavItem className={classnames({ current: activeTab === 2 })}>
                          <NavLink
                            className={classnames({ active: activeTab === 2 })}
                            onClick={() => {
                              setactiveTab(2)
                            }}
                          >
                            <span className="number me-2">2.</span>{" "}
                              Types denres et matériels
                            </NavLink>
                        </NavItem>
                        <NavItem className={classnames({ current: activeTab === 3 })}>
                          <NavLink
                            className={classnames({ active: activeTab === 3 })}
                            onClick={() => {
                              setactiveTab(3)
                            }}
                          >
                            <span className="number">3.</span>{" "}
                            Etat de traitement
                          </NavLink>
                        </NavItem>
                      </ul>
                    </div>
                    <div className="content clearfix">
                      <div className="body">
                        <TabContent
                          activeTab={activeTab}
                        >
                          <TabPane tabId={1}>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-firstname-input1">
                                    Region
                                  </Label>
                                  <Controller
                                    control={control}
                                    name="region"
                                    render={({
                                      field: {value, name,onChange}
                                    }) => 
                                      <Select name={name}
                                        placeholder="Region"
                                        isMulti={false}
                                        className="select"
                                        isClearable={false}
                                        isSearchable={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        isRtl={false}
                                        closeMenuOnSelect={true}
                                        onChange={
                                          (event) => {
                                            onChange(event);
                                            getPrefecturesByRegions(event.value).then(response => setPrefectures(response));
                                          }
                                        }
                                        value={value}
                                        defaultValues={value}
                                        options={ regions && regions.map( val=>({value:val.id, label:val.nom}))}
                                      />
                                    }
                                  />
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-lastname-input2">
                                    Préfecture
                                  </Label>
                                  {/* <input type="hidden" name="prefectureId" {...register('prefectureId')}/> */}
                                  <Controller
                                    control={control}
                                    name="prefecture"
                                    render={({
                                      field: {onChange,value, name}
                                    }) => 
                                      <Select name={name}
                                        placeholder="Prefecture"
                                        isMulti={false}
                                        className="select"
                                        isClearable={false}
                                        isSearchable={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        isRtl={false}
                                        closeMenuOnSelect={true}
                                        onChange={
                                          (event) => {
                                            onChange(event);
                                            getCommunesByPrefectures(event.value).then(response => setCommunes(response));
                                          }
                                        }
                                        value={value}
                                        defaultValues={value}
                                        options={ prefectures && prefectures.map( val=>({value:val.id, label:val.nom}))}
                                      />
                                    }
                                  />
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-phoneno-input3">
                                    Commune
                                  </Label>
                                  <Controller
                                    control={control}
                                    name="commune"
                                    render={({
                                      field: {onChange, value, name}
                                    }) => 
                                      <Select name={name}
                                        placeholder="Type d'installation"
                                        isMulti={false}
                                        className="select"
                                        isClearable={false}
                                        isSearchable={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        isRtl={false}
                                        closeMenuOnSelect={true}
                                        onChange={onChange}
                                        value={value}
                                        defaultValues={value}
                                        options={ communes && communes.map( val=>({value:val.id, label:val.nom}))}
                                      />
                                    }
                                  />
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-email-input4">
                                    Catastrophe
                                  </Label>
                                  <select
                                    className={'form-control'}
                                    {...register('typeCatastrophe')}
                                  >
                                    <option>--Sélectionner--</option>
                                    {typeDataMateriels.catastrophes.length > 0 && typeDataMateriels.catastrophes.map((cat,index) =><option key={index} value={cat.nam}>{cat.name}</option>)}
                                  </select>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-date-input3">
                                    Date
                                  </Label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    id="basicpill-date-input5"
                                    placeholder="Sélectionner la date"
                                    {...register('date')}
                                  />
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-nbreTotalMenage-input4">
                                    Nombre de manage
                                  </Label>
                                  <input
                                      type="number"
                                      className="form-control"
                                      min={0}
                                      id="basicpill-nbreTotalMenage-input5"
                                      placeholder="Entre le nombre de manage"
                                      {...register('nbreTotalMenage')}
                                    />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-nbreTotalPersonne-input3">
                                    Nombre de personne
                                  </Label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    min={0}
                                    id="basicpill-nbreTotalPersonne-input5"
                                    placeholder="Entrer le nombre de personne"
                                    {...register('nbreTotalPersonne')}
                                  />
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-nbreHomme-input4">
                                    Nombre d'homme
                                  </Label>
                                  <input
                                      type="number"
                                      min={0}
                                      className="form-control"
                                      id="basicpill-nbreHomme-input5"
                                      placeholder="Entrer le nombre d'homme"
                                      {...register('nbreHomme')}
                                    />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-nbreEnfant-input3">
                                    Nombre d'enfant
                                  </Label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    min={0}
                                    id="basicpill-nbreEnfant-input5"
                                    placeholder="Entrer le nombre de personne"
                                    {...register('nbreEnfant')}
                                  />
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-nbreFemme-input4">
                                    Nombre de femme
                                  </Label>
                                  <input
                                      type="number"
                                      min={0}
                                      className="form-control"
                                      id="basicpill-nbreFemme-input5"
                                      placeholder="Entrer le nombre d'homme"
                                      {...register('nbreFemme')}
                                    />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-nbreBlesse-input3">
                                    Nombre de blessés
                                  </Label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    min={0}
                                    id="basicpill-nbreBlesse-input5"
                                    placeholder="Entrer le nombre de blessés"
                                    {...register('nbreBlesse')}
                                  />
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-nbreMort-input4">
                                    Nombre de mort
                                  </Label>
                                  <input
                                      type="number"
                                      min={0}
                                      className="form-control"
                                      id="basicpill-nbreMort-input5"
                                      placeholder="Entrer le nombre de mort"
                                      {...register('nbreMort')}
                                    />
                                </div>
                              </Col>
                            </Row>
                          </TabPane>
                          <TabPane tabId={2}>
                            <div className="form-group col-md-12 mt-3">
                              <label className='mb-4'>Type de denrées alimentaires détruite:</label><br />
                                <DenreArray 
                                  useFieldArray={useFieldArray} 
                                  register={register} control={control}
                                  denres={typeDataMateriels.denres}
                                  denresInit={(catastrophe && catastrophe.typeDenre) || [{nom:"",quantite:"",unite:""}]}
                                />
                            </div>
                            <div className="form-group col-md-12 mt-3">
                              <label className='mb-4'>Matériels touchés :</label><br />
                              <MaterialArray
                                useFieldArray={useFieldArray} 
                                register={register} control={control}
                                materiels={typeDataMateriels.materiels}
                                materielsInit={(catastrophe && catastrophe.material) || [{nom:"",quantite:""}]}
                              />
                            </div>
                          </TabPane>
                          <TabPane tabId={3}>
                              <Row>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-cardno-input12">
                                      Etat de traitement
                                    </Label>
                                    <select 
                                      className="form-control" 
                                      name="traite"
                                      defaultValue={catastrophe && catastrophe.traite}
                                      {...register('traite', {value: catastrophe && catastrophe.traite})}>
                                      <option>--Sélectionner--</option>
                                      {["Non","Oui"].map((option,index)=><option key={index} value={option}>{option}</option>)}
                                    </select>
                                  </div>
                                </Col>

                                <Col lg="3">
                                  <div className="mb-3">
                                    <Label for="basicpill-duree-catastrophe-input">
                                      Durée de la catastrophe *
                                    </Label>
                                    <input
                                      type = "number"
                                      name = "duree"
                                      defaultValue={catastrophe && catastrophe.duree}
                                      nim = {0}
                                      className = "form-control"
                                      {...register('duree', {value: catastrophe && catastrophe.duree})}
                                      id = "basicpill-duree-catastrophe-input"
                                      placeholder = "Durée de la catastrophe"
                                    />
                                  </div>
                                </Col>
                                <Col lg="3">
                                  <div className="mb-3">
                                    <Label for="basicpill-card-verification-input">
                                      Unité de la durée *
                                    </Label>
                                    <select 
                                      className="form-control"
                                      defaultValue={catastrophe && catastrophe.uniteDuree}
                                      name="uniteDuree"
                                      {...register('uniteDuree',{value: catastrophe && catastrophe.uniteDuree})}
                                    >
                                      {["Minute","Heure","Jours","Mois","Année"].map((u,index)=><option key={index} value={u}>{u}</option>)}
                                    </select>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg={12}>
                                  <div className="form-group">
                                    <label>Description</label>
                                    <textarea 
                                      name="description"
                                      defaultValue={catastrophe && catastrophe.description}
                                      className="form-control" 
                                      placeholder="Description"
                                      {...register('description',{value: catastrophe && catastrophe.description})}></textarea>
                                  </div>
                                </Col>
                              </Row>
                          </TabPane>
                        </TabContent>
                      </div>
                    </div>
                    <div className="actions clearfix">
                      <ul>
                        <li className="previous">
                          <Link
                            to="#"
                            className="btn btn-danger"
                            style={{ backgroundColor: 'red' }}
                            onClick={() => props.history.push('/liste-catastrophe')}
                            >Fermer</Link>
                        </li>
                        <li
                          className={
                            activeTab === 1 ? "previous disabled" : "previous"
                          }
                        >
                          <Link
                            to="#"
                            className="btn btn-primary"
                            onClick={() => {
                              toggleTab(activeTab - 1)
                            }}
                          >
                            Précédente
                          </Link>
                        </li>
                        <li
                          className={activeTab === 3 ? "next" : "Valider"}
                        >
                          <Button
                            style={{ backgroundColor: '#192957' }}
                            className="btn btn-primary"
                            type="submit"
                          >
                            {activeTab === 3 ? "Valider" : "Suivante"}
                          </Button>
                        </li>
                      </ul>
                    </div>

                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>        
        </Form>
        </Container>
      </div>
    </React.Fragment>
  )
}

// export default AddCatastrophe

AddCatastrophe.propTypes = {
	catastrophe: PropTypes.object,
  typeDataMateriels:PropTypes.object,
  produits: PropTypes.array,
  catastrophes:PropTypes.array,
  denres:PropTypes.array,
  materiels:PropTypes.array,
  onGetRegions: PropTypes.func,
  onGetPrefectures: PropTypes.func,
  onGetCommunes: PropTypes.func,
  onGetDenres: PropTypes.func,
  onGetMateriels: PropTypes.func,
  onGetCatastrophes: PropTypes.func,
  postCatastrophes: PropTypes.func,
  putCatastrophes: PropTypes.func,
}

const mapStateToProps = ({
   typeDataMateriels,
   catastrophes
  }) => ({ 
    typeDataMateriels: typeDataMateriels,
    catastrophe: catastrophes.catastrophe
  })

const mapDispatchToProps = dispatch => ({
  onGetDenres: () => dispatch(getDenres()),
  onGetMateriels: () => dispatch(getMateriels()),
  onGetCatastrophes: () => dispatch(getCatastrophes()),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(AddCatastrophe))
