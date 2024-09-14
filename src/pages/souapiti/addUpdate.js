import React, { useEffect, useState } from "react"
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
import { Link} from 'react-router-dom';
import classnames from "classnames"
import { getEnqueteTypeData, getShowEnqueteDeplaceInternes, postEnqueteDeplaceInternes, putEnqueteDeplaceInternes } from "../../helpers/backend_enquete_type_data";
import Select from 'react-select';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import ArrayTypeMaison from "./components/ArrayTypeMaison";
import DepenseTrimestresArray from "./components/DepenseTrimestreArray ";
import { getRegions } from "../../helpers/backend_region";
import { getCommunesByPrefectures } from "../../helpers/backend_commune";
import { getTypeEnquete } from "../../helpers/backend_type_enquete";
import { getPrefecturesByRegions } from "../../helpers/backend_prefecture";

const AddUpdatePage = (props) => {

  const { 
    match: { params },
    history
  } = props;

  function toggleTab(tab) {
    if (activeTab !== tab) {
      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab)
      }
    }
  }

  function serializerArray(data) {
    return data.length > 0 ? data.map(item => item.value) : []
  }
  
  function unSerializerArray(data) {
    return data.map(item => ({value:item,label:item}))
  }

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
  
  const [activeTab, setactiveTab] = useState(1)
  const { register, handleSubmit, control, formState: { isLoading, errors }} = useForm({
    enableReinitialize: true,
    defaultValues: params.id ? async() => getShowEnqueteDeplaceInternes(params.id).then(
      response => {
        const _prefecture = response?.commune?.prefecture
        let respEnquete = {
          ...response,
          region: {value:_prefecture.region.id,label: _prefecture.region.nom },
          prefecture: {value: _prefecture.id, label: _prefecture.nom },
          type_enquete: {value:response?.type_enquete?.id, label: response?.type_enquete?.name},
          type_reinstallation: {value: response.type_reinstallation[0], label:response.type_reinstallation[0]},
          type_accompagnement: unSerializerArray(response.type_accompagnement),
          besoin_prioritaire: unSerializerArray(response.besoin_prioritaire),
          service_sociaux: unSerializerArray(response.service_sociaux),
          attente_compensation: unSerializerArray(response.attente_compensation),
          type_demande_habitation: unSerializerArray(response.type_demande_habitation),
          motif_satisfaction_demande: unSerializerArray(response.motif_satisfaction_demande),
          type_aide: unSerializerArray(response.type_aide),
          aide_suppelementaire: unSerializerArray(response.aide_suppelementaire),
          attente_personnelle: unSerializerArray(response.attente_personnelle),
          type_activite: unSerializerArray(response.type_activite),
          obstacle: unSerializerArray(response.obstacle),
          source_revenue: unSerializerArray(response.source_revenue),
          lieu_naissance: {value: response.lieu_naissance, label: response.lieu_naissance},
          commune: {value: response?.commune?.id, label: response?.commune?.nom },
          provenance_eau: {value: response.provenance_eau, label: response.provenance_eau },
          user: response.user.id,
        }

        getPrefecturesByRegions(_prefecture?.region?.id).then(response => setPrefectures(response))
        getCommunesByPrefectures(_prefecture.id).then(response => setCommunes(response))

        return respEnquete
    }) : {
      revision: makeRevision(20),
      date_enregistrement: new Date(),
      date_enquete: "",
      localite_menage: "",
      code_menage: "",
      chef_menage: "",
      age: 0,
      sexe: "",
      profession: "",
      active_actuelle: "",
      telephone: "",
      taille_menage: "",
      nombre_femme: "",
      nombre_handicap: "",
      nombre_enfant: "",
      type_reinstallation: [],
      retour_processus_reinstallation: "",
      maison_touche: [],
      dedommagement: "",
      impliquer_pour_decision: "",
      cause_implication: "",
      type_accompagnement: [],
      besoin_prioritaire: [],
      service_sociaux: [],
      attente_compensation: [],
      terre_perdu: "",
      type_terre: "",
      type_demande_habitation: [],
      motif_satisfaction_demande: [],
      aide_entreprendre: "",
      type_aide: [],
      retour_collaboration: "",
      apreciation_collaration: "",
      aide_suppelementaire: [],
      attente_personnelle: [],
      type_activite: [],
      obstacle: [],
      source_revenue: [],
      depense_trimestre: [],
      provenance_eau: "",
      distance_provenance_eau: "",
      naissance_suvenue: "",
      lieu_naissance: "",
      observation: "",
      type_enquete: "",
      region: "",
      prefecure: "", 
    }
  });
  
  const onSubmit = data => {
    toggleTab(activeTab + 1)
    if(activeTab === 4){
      let dataEnquete = {
        ...data,
        type_reinstallation: [data.type_reinstallation.value],
        type_accompagnement: serializerArray(data.type_accompagnement),
        besoin_prioritaire: serializerArray(data.besoin_prioritaire),
        service_sociaux: serializerArray(data.service_sociaux),
        attente_compensation: serializerArray(data.attente_compensation),
        type_demande_habitation: serializerArray(data.type_demande_habitation),
        motif_satisfaction_demande: serializerArray(data.motif_satisfaction_demande),
        type_aide: serializerArray(data.type_aide),
        aide_suppelementaire: serializerArray(data.aide_suppelementaire),
        attente_personnelle: serializerArray(data.attente_personnelle),
        type_activite: serializerArray(data.type_activite),
        obstacle: serializerArray(data.obstacle),
        source_revenue: serializerArray(data.source_revenue),
        lieu_naissance: data.lieu_naissance.value,
        commune: data.commune.value,
        prefecture: data.prefecture.value,
        region: data.region.value,
        provenance_eau: data.provenance_eau.value,
        type_enquete: data.type_enquete.value,
      }
      if(params.id){
        putEnqueteDeplaceInternes(params.id, dataEnquete).then(res=>{
          history.push(`/souapiti/view/${res.id}`)
        }).catch(err => console.log(err))
      }else{
        postEnqueteDeplaceInternes(dataEnquete).then(response => {
          history.push(`/souapiti/view/${response.id}`)
        }).catch(err => console.log(err))
      }
    }
  }

  const [typeDataEnquete,setTypeDataEnquete] = useState([])
  const initTypeDataEnquete = () =>{
    getEnqueteTypeData().then(response => {
      setTypeDataEnquete(response)
    })
  }

  const [regions, setRegions] = useState([])
  const [prefectures, setPrefectures] = useState([])
  const [communes, setCommunes] = useState([])
  const [type_enquetes, setType_enquetes] = useState([])
  const regionPrefectureCommune = () =>{
    getRegions().then(response => {
      setRegions(response)
    })
  }

  useEffect(() =>{
    regionPrefectureCommune()
    initTypeDataEnquete()
    getTypeEnquete().then(resp => {
      setType_enquetes(resp)
    })
  },[])

  const [showImpliquePourDecision,setShowImpliquePourDecision] = useState(false)
  const onChangeImpliquePourDecision = (e) => setShowImpliquePourDecision(e.target.value === "NON" ? true : false)  
  
  const [showTerrePerdu,setShowTerrePerdu] = useState(false)
  const onChangeTerrePerdu = (e) => setShowTerrePerdu(e.target.value === "OUI" ? true : false)
  
  const [showAideEntreprendre,setShowAideEntreprendre] = useState(false)
  const onChangeAideEntreprendre = (e) => setShowAideEntreprendre(e.target.value === "OUI" ? true : false)
  
  const [showRetourCollaboration,setShowRetourCollaboration] = useState(false)
  const onChangeRetourCollaboration  = (e) => setShowRetourCollaboration(e.target.value === "OUI" ? true : false)
  
  
  return(
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          >
          <Row>
            <Col lg="12">
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardBody>
                  <h4 className="card-title mb-4">Formulaire d'enquête SOUAPITI</h4>
                  <div className="wizard clearfix">
                    <div className="steps clearfix">
                      <ul>
                        <NavItem className={classnames({ current: activeTab === 1 })}>
                          <NavLink
                            className={classnames({ current: activeTab === 1 })}
                            onClick={() => {
                              setactiveTab(1)
                            }}
                          >
                            <span className="number">1.</span>{" "}
                              Informations sur le ménage
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
                              Informations sur la réinstallation
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
                              Revenus et depenses
                          </NavLink>
                        </NavItem>
                        <NavItem className={classnames({ current: activeTab === 4 })}>
                          <NavLink
                            className={classnames({ active: activeTab === 4 })}
                            onClick={() => {
                              setactiveTab(4)
                            }}
                          >
                            <span className="number">4.</span>{" "}
                              Conclusion et observations
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
                                    Type d'enquete
                                  </Label>
                                  <Controller
                                    control={control}
                                    name="type_enquete"
                                    render={({
                                      field: {onChange, value, name}
                                    }) => 
                                      <Select name={name}
                                        placeholder="Type d'enquête"
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
                                        options={ type_enquetes && type_enquetes.map( val=>({value:val.id, label:val.name}))}
                                      />
                                    }
                                  />
                                </div>
                              </Col> 
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-firstname-input1">
                                    Date enquête 
                                  </Label>
                                  <input className="form-control" type="date" {...register('date_enquete',{ 
                                    required: true,
                                  })} />
                                  {errors.date_enquete && <div className="text-danger">{'le champs date d\'enquête obligatoire'}</div>}
                                </div>
                              </Col>

                              <Col lg="6">
                                <label>Region</label>
                                <div className="mb-3">
                                <Controller
                                    control={control}
                                    name="region"
                                    render={({field:{onChange,value, name}})=>(
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
                                        options={ regions && regions.map(val=>({value:val.id, label:val.nom}))}
                                      />
                                    )}
                                  />
                                </div>
                              </Col>
                              <Col lg="6">
                                <label>Prefecture</label>
                                <div className="mb-3">
                                  <Controller
                                    control={control}
                                    name="prefecture"
                                    render={({field:{onChange,value, name}})=>(
                                      <Select name={name}
                                        placeholder="Préfecture"
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
                                        options={ prefectures && prefectures.map(val=>({value:val.id, label:val.nom}))}
                                      />
                                    )}
                                  />
                                </div>
                              </Col>
                              <Col lg="6">
                                <label>Commune</label>
                                <div className="mb-3">
                                  <Controller
                                    control={control}
                                    name="commune"
                                    render={
                                      ({field: {onChange, value, name}})=>(
                                        <Select name={name}
                                          placeholder="Commune"
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
                                          options={ communes && communes.map(val=>({value:val.id, label:val.nom}))}
                                      />)
                                    }
                                  />
                                </div>
                              </Col>

                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-lastname-input2">
                                    Localité/District/Village
                                  </Label>
                                  <input className="form-control" type="text" {...register('localite_menage',{ 
                                    required: true,
                                    message: 'Localité du menage obligatoire'
                                  })} />
                                  {errors.localite_menage && <div className="text-danger">{'le champs localité du menage obligatoire'}</div>}
                                </div>
                              </Col>

                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-phoneno-input3">
                                    Code ménage/Numéro d'identification
                                  </Label>
                                  <input className="form-control" type="text" {...register('code_menage',{ 
                                    required: true,
                                    message: 'code du menage obligatoire'
                                  })} />
                                  {errors.code_menage && <div className="text-danger">{'le champs code du menage obligatoire'}</div>}
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-email-input4">
                                    Nom et prénom chef(fe) de ménage
                                  </Label>
                                  <input className="form-control" type="text" {...register('chef_menage',{ 
                                    required: true,
                                    message: 'Nom et prenonm chef(fe) du menage obligatoire'
                                   })}/>
                                  {errors.chef_menage && <div className="text-danger">{'le champs nom et prenonm chef(fe) du menage obligatoire'}</div>}
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-date-input3">
                                    Age
                                  </Label>
                                  <input className="form-control" type="number" min={0} {...register('age',{ 
                                    required: true,
                                    message: 'L\'age est obligatoire'
                                  })}/>
                                  {errors.age && <div className="text-danger">{'Le champs l\'age est obligatoire'}</div>}
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-nbreTotalMenage-input4">
                                    Sexe
                                  </Label>
                                  <select className="form-control" {...register('sexe',{ 
                                    required: true,
                                    message: 'Le sexe est obligatoire'
                                  })}>
                                    <option>--Sélectionner--</option>
                                    {['Masculin','Feminin'].map((val, index) =><option key={index} value={val}>{val}</option>)}
                                  </select>
                                  {errors.sexe && <div className="text-danger">{'Le champs sexe est obligatoire'}</div>}
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-nbreTotalPersonne-input3">
                                    Profession
                                  </Label>
                                  <input className="form-control" {...register('profession',{ 
                                    required: true,
                                    message: 'Profession est obligatoire'
                                  })}/>
                                  {errors.profession && <div className="text-danger">{'Le champs profession est obligatoire'}</div>}
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-nbreTotalPersonne-input3">
                                    Activité actuelle
                                  </Label>
                                  <input className="form-control" {...register('active_actuelle',{ 
                                    required: true, 
                                    message: 'Activité actuelle est obligatoire'
                                  })}/>
                                  {errors.active_actuelle && <div className="text-danger">{'Le champs activité actuelle est obligatoire'}</div>}
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-nbreHomme-input4">
                                    Téléphone
                                  </Label>
                                  <input className="form-control" {...register('telephone')}/>
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-nbreEnfant-input3">
                                    Taille totale du ménage
                                  </Label>
                                  <input className="form-control" type="number" {...register('taille_menage',{ 
                                    required: true,
                                    message: 'Taille totale du ménage est obligatoire'
                                  })}/>
                                  {errors.taille_menage && <div className="text-danger">{'Le champs taille totale du ménage est obligatoire'}</div>}
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-nbreEnfant-input3">
                                    Nombre de femme du ménage
                                  </Label>
                                  <input className="form-control" type="number" {...register('nombre_femme',{ 
                                    required: true, 
                                    message: 'Nombre de femme du ménage est obligatoire'
                                  })}/>
                                  {errors.nombre_femme && <div className="text-danger">{'Le champs nombre de femme du ménage est obligatoire'}</div>}
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-nbreFemme-input4">
                                    Nombre de pesonne handicapée (PH) dans le ménage
                                  </Label>
                                  <input className="form-control" {...register('nombre_handicap',{ 
                                    required: true,
                                    message: 'Nombre de pesonne handicapée (PH) dans le ménage est obligatoire'
                                  })}/>
                                  {errors.nombre_handicap && <div className="text-danger">{'Le champs nombre de pesonne handicapée (PH) dans le ménage est obligatoire'}</div>}
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-nbreBlesse-input3">
                                    Nombre d'Enfant -10 ans
                                  </Label>
                                  <input className="form-control" type={'number'} min={0} {...register('nombre_enfant')}/>
                                </div>
                              </Col>
                            </Row>
                          </TabPane>
                          <TabPane tabId={2}>
                            <Row>
                              <div className="form-group col-md-6 mt-3">
                                <label>Q1. Quel type de réinstallation avez-vous subit ?</label>
                                <Controller
                                  control={control}
                                  name="type_reinstallation"
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
                                      options={ typeDataEnquete['typeInstallation'] && typeDataEnquete['typeInstallation'].map( val=>({value:val.name,label:val.name}))}
                                    />
                                  }
                                />
                              </div>
                              <div className="form-group col-md-6 mt-3">
                                <label>Q2. Comment avez-vous vécu le processus de votre réinstallation</label>
                                <select className="form-control" {...register('retour_processus_reinstallation')}>
                                  {['Très satisfait','Satisfait','Peu satisfait',	'Pas satisfait'].map((val,index)=><option key={index} value={val}>{val}</option>)}
                                </select>
                              </div>
                              <div className="form-group col-md-12 mt-3">
                                <p>Q3. Maisons touchées(Nombre détruite - Type, Nombre réconstruite - Type - Par qui ?)</p>
                                <div className="row">
                                  <div className="col-md-12">
                                    <ArrayTypeMaison 
                                      useFieldArray={useFieldArray} 
                                      register={register} 
                                      control={control}
                                      maisonTouches={[{type:'',nombre:''}]}
                                    />
                                  </div>
                                </div>
                                <label></label><br />
                              </div>
                              <div className="form-group col-md-12 mt-3">
                                <label>Q4. Avez-vous été dédommagé autrement ?</label>
                                <Controller
                                  control={control}
                                  name="dedommagement"
                                  render={
                                    ({ 
                                      field: { onChange, value, name}}) =>(
                                      <Select 
                                        name={name}
                                        placeholder="Selectionne activite"
                                        isMulti={true}
                                        className="select"
                                        isClearable={false}
                                        isSearchable={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        isRtl={false}
                                        closeMenuOnSelect={false}
                                        onChange={onChange}
                                        value={value}
                                        defaultValues={value}
                                        options={ ["Espèces (montant)", "Nature"].map( val=>({value:val,label:val}))}
                                      />
                                    )
                                  }
                                />
                              </div>
                              <div className="form-group col-md-6 mt-3">
                                <label>Q5. Avez-vous été régulièrement impliqués pour toutes les prises de décisions vous concernant pendant ce processus de réinstallation ?</label>
                                <select className="form-control" {...register('impliquer_pour_decision')} onChange={onChangeImpliquePourDecision}>
                                  {["OUI","NON"].map((val,index)=><option key={index} value={val}>{val}</option>)}
                                </select>
                              </div>
                              {showImpliquePourDecision && <div className="form-group col-md-6 mt-3">
                                <label>Si non pourquoi ? </label>
                                <input className="form-control" {...register('cause_implication')}/>
                              </div>}
                              <div className="form-group col-md-12 mt-3">
                                <label>Q6. Quels types d'accompagnement ont été mis en place pendant le processus de votre réinstallation ?</label><br />
                                <Controller
                                  control={control}
                                  name="type_accompagnement"
                                  render={
                                    ({ 
                                      field: { onChange, value, name}}) =>(
                                      <Select 
                                        name={name}
                                        placeholder="Selectionne activite"
                                        isMulti={true}
                                        className="select"
                                        isClearable={false}
                                        isSearchable={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        isRtl={false}
                                        closeMenuOnSelect={false}
                                        onChange={onChange}
                                        value={value}
                                        defaultValues={value}
                                        options={ typeDataEnquete['typeAccompagnement'] && typeDataEnquete['typeAccompagnement'].map( val=>({value:val.name,label:val.name}))}
                                      />
                                    )
                                  }
                                />
                              </div> 
                              <div className="form-group col-md-6 mt-3">
                                <label>Q7. Quels sont vos principaux besoins prioritaires ?</label>
                                <Controller
                                  control={control}
                                  name="besoin_prioritaire"
                                  render={
                                    ({
                                      field:{ onChange, value, name}
                                    })=>(<Select name={name}
                                      placeholder="Besoins prioritaires"
                                      isMulti={true}
                                      className="select"
                                      isClearable={false}
                                      isSearchable={true}
                                      isDisabled={false}
                                      isLoading={false}
                                      isRtl={false}
                                      onChange={onChange}
                                      closeMenuOnSelect={false}
                                      value={value}
                                      defaultValues={value}
                                      options={typeDataEnquete['prioritaire'] && typeDataEnquete['prioritaire'].map( val=>({value:val.name,label:val.name}))}
                                    />
                                  )}
                                />
                                
                              </div>
                              <div className="form-group col-md-6 mt-3">
                                <label>Q8. Avez-vous accès aux services sociaux de base ?</label>
                                <Controller
                                  control={control}
                                  name="service_sociaux"
                                  render = {
                                    ({field:{ onChange,value, name}})=>(
                                      <Select name={name}
                                        placeholder="Services sociaux"
                                        isMulti={true}
                                        className="select"
                                        isClearable={false}
                                        isSearchable={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        isRtl={false}
                                        closeMenuOnSelect={false}
                                        onChange={onChange}
                                        value={value}
                                        defaultValues={value}
                                        options={typeDataEnquete['serviceSociaux'] && typeDataEnquete['serviceSociaux'].map( val=>({value:val.name,label:val.name}))}
                                      />
                                    )
                                  }
                                />
                              </div>
                              <div className="form-group col-md-6 mt-3">
                                <label>Q9. Quelles étaients vos attentes en termes de compensation de vos terres agricoles ?</label>
                                <Controller
                                  control={control}
                                  name="attente_compensation"
                                  render = {
                                    ({field:{ onChange,value, name}})=>(
                                      <Select name={name}
                                        placeholder="Attentes de compensations"
                                        isMulti={true}
                                        className="select"
                                        isClearable={false}
                                        isSearchable={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        isRtl={false}
                                        onChange={onChange}
                                        closeMenuOnSelect={false}
                                        value={value}
                                        defaultValues={value}
                                        options={typeDataEnquete['compensation'] && typeDataEnquete['compensation'].map( val=>({value:val.name,label:val.name}))}
                                      />
                                    )
                                  }
                                />
                               
                              </div>
                              <div className="form-group col-md-6 mt-3">
                                <label>Q10. Avez-vous perdue des terres ?</label>
                                <select className="form-control" {...register('terre_perdu')} onChange={onChangeTerrePerdu}>
                                  {['OUI','NON'].map((opt,index)=><option key={index} value={opt}>{opt}</option>)}
                                </select>
                              </div> 
                              {showTerrePerdu && <div className="form-group col-md-6 mt-3">
                                <label>Si Oui, Lesquelles (ex: terre cultivable, habitation,élévage…)</label>
                                <input className="form-control" {...register('type_terre')}/>
                              </div> }
                              <div className="form-group col-md-6 mt-3">
                                <label>Q11. Que demandez-vous pour être satisfait de votre nouvelle habitation ?</label>
                                <Controller
                                  control={control}
                                  name="type_demande_habitation"
                                  render = {
                                    ({field:{ onChange,value,name}})=>(
                                      <Select name={name}
                                        placeholder="Selectionne prioritaire"
                                        isMulti={true}
                                        className="select"
                                        isClearable={false}
                                        isSearchable={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        isRtl={false}
                                        closeMenuOnSelect={false}
                                        onChange={onChange}
                                        value={value}
                                        defaultValues={value}
                                        options={typeDataEnquete['habitation'] && typeDataEnquete['habitation'].map( val=>({value:val.name,label:val.name}))}
                                      />
                                    )
                                  }
                                />
                              </div>
                              <div className="form-group col-md-6 mt-3">
                                <label>Q12. Quels sont les motifs de satisfaction ?</label>
                                <Controller
                                  control={control}
                                  name="motif_satisfaction_demande"
                                  render = {
                                    ({field:{ onChange,name,value}})=>(
                                      <Select name={name}
                                        placeholder="Selectionne activite"
                                        isMulti={true}
                                        className="select"
                                        isClearable={false}
                                        isSearchable={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        isRtl={false}
                                        onChange={onChange}
                                        closeMenuOnSelect={false}
                                        value={value}
                                        defaultValues={value}
                                        options={typeDataEnquete['motif'] && typeDataEnquete['motif'].map( val=>({value:val.name,label:val.name}))}
                                      />
                                    )
                                  }
                                />
                                
                              </div>
                              <div className="form-group col-md-6 mt-3">
                                <label>Q13. Avez-vous reçu de l'aide pour entreprendre vos occupations actuelles ?</label>
                                <select className="form-control" {...register('aide_entreprendre')} onChange={onChangeAideEntreprendre}>
                                  {['OUI','NON'].map((opt,index)=><option key={index} value={opt}>{opt}</option>)}
                                </select>
                              </div>
                              {showAideEntreprendre && <div className="form-group col-md-6 mt-3">
                                <label>Si Oui, de quels types ?</label>
                                <Controller
                                  control={control}
                                  name="type_aide"
                                  render = {
                                    ({field:{ onChange,value,name}})=>(
                                      <Select name={name}
                                        placeholder="Selectionne type d'aide"
                                        isMulti={true}
                                        className="select"
                                        isClearable={false}
                                        isSearchable={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        isRtl={false}
                                        onChange={onChange}
                                        closeMenuOnSelect={false}
                                        value={value}
                                        defaultValues={value}
                                        options={typeDataEnquete['typeAide'] && typeDataEnquete['typeAide'].map( val=>({value:val.name,label:val.name}))}
                                      />
                                    )
                                  }
                                />
                              </div>}
                              <div className="form-group col-md-6 mt-3">
                                <label>Q14. Êtes-vous satisfait de la collaboration entre vous et le reste de la communauté d'accueil ?</label><br />
                                <select className="form-control" {...register('retour_collaboration')} onChange={onChangeRetourCollaboration}>
                                  {['OUI','NON'].map((opt,index)=><option key={index} value={opt}>{opt}</option>)}
                                </select>
                              </div> 
                              {showRetourCollaboration && <div className="form-group col-md-6 mt-3">
                                <label>Si Oui, quelle est votre appréciation ?</label>
                                <select className="form-control" {...register('apreciation_collaration')}>
                                  {['Très satisfait',	'Satisfait Peu satisfait','Pas satisfait'].map((opt,index)=><option key={index} value={opt}>{opt}</option>)}
                                </select>
                              </div> }
                              <div className="form-group col-md-6 mt-3">
                                <label>Q15. Quels types d'aides supplémentaires avez-vous reçu depuis votre réinstallation sur ce site ?</label><br />
                                <Controller
                                  control={control}
                                  name="aide_suppelementaire"
                                  render = {
                                    ({field:{ onChange,value,name}})=>(
                                      <Select name={name}
                                        placeholder="Selectionne activite"
                                        isMulti={true}
                                        className="select"
                                        isClearable={false}
                                        isSearchable={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        isRtl={false}
                                        onChange={onChange}
                                        closeMenuOnSelect={false}
                                        value={value}
                                        defaultValues={value}
                                        options={typeDataEnquete['typeAideSupplementaire'] && typeDataEnquete['typeAideSupplementaire'].map( val=>({value:val.name,label:val.name}))}
                                      />
                                    )
                                  }
                                />
                              </div>
                              <div className="form-group col-md-6 mt-3">
                                <label>Q16. Quelles étaient vos attentes personnelles par rapport au processus de réinstallation ?</label>
                                <Controller
                                  control={control}
                                  name="attente_personnelle"
                                  render = {
                                    ({field:{ onChange,name,value}})=>(
                                      <Select name={name}
                                        placeholder="Selectionne activite"
                                        isMulti={true}
                                        className="select"
                                        isClearable={false}
                                        isSearchable={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        isRtl={false}
                                        onChange={onChange}
                                        closeMenuOnSelect={false}
                                        value={value}
                                        defaultValues={value}
                                        options={typeDataEnquete['processus'] && typeDataEnquete['processus'].map( val=>({value:val.name,label:val.name}))}
                                      />
                                    )
                                  }
                                />
                              </div>
                              <div className="form-group col-md-6 mt-3">
                                <label>Q17. Quels sont les secteurs d'activités dans lesquels vous souhaitez plus voir le gouvernement appuyer les communautés ?</label>
                                <Controller
                                  control={control}
                                  name="type_activite"
                                  render = {
                                    ({field:{ onChange,name, value}})=>(
                                      <Select name={name}
                                        placeholder="Selectionne activite"
                                        isMulti={true}
                                        className="select"
                                        isClearable={false}
                                        isSearchable={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        isRtl={false}
                                        onChange={onChange}
                                        closeMenuOnSelect={false}
                                        value={value}
                                        defaultValues={value}
                                        options={typeDataEnquete['secteurActivite'] && typeDataEnquete['secteurActivite'].map( val=>({value:val.name,label:val.name}))}
                                      />
                                    )
                                  }
                                />
                              
                              </div>
                              <div className="form-group col-md-6 mt-3">
                                <label>Q18. Quels sont les obstacles de l'accès aux soins de santé ?</label>
                                <Controller
                                  control={control}
                                  name="obstacle"
                                  render = {
                                    ({field:{ onChange,value,name}})=>(
                                      <Select name={name}
                                        placeholder="Obstacles"
                                        isMulti={true}
                                        className="select"
                                        isClearable={false}
                                        isSearchable={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        isRtl={false}
                                        closeMenuOnSelect={false}
                                        onChange={onChange}
                                        value={value}
                                        defaultValues={value}
                                        options={typeDataEnquete['obstacle'] && typeDataEnquete['obstacle'].map( val=>({value:val.name,label:val.name}))}
                                      />
                                    )
                                  }
                                />
                               
                              </div>
                            </Row>
                          </TabPane>
                          <TabPane tabId={3}>
                              <Row>
                                <Col lg="12">
                                  <div className="mb-3">
                                    <Label for="basicpill-cardno-input12">
                                      Q19. Quelles sont principales sources de revenu monétaire du ménage dans l'année écoulée ? 
                                    </Label>
                                    <Controller
                                      control={control}
                                      name="source_revenue"
                                      render = {
                                        ({field:{ onChange,name,value}})=>(
                                          <Select name={name}
                                            placeholder="Sources de revenues"
                                            isMulti={true}
                                            className="select"
                                            isClearable={false}
                                            isSearchable={true}
                                            isDisabled={false}
                                            isLoading={false}
                                            isRtl={false}
                                            onChange={onChange}
                                            closeMenuOnSelect={false}
                                            value={value}
                                            defaultValues={value}
                                            options={typeDataEnquete['sourceRevenu'] && typeDataEnquete['sourceRevenu'].map( val=>({value:val.name,label:val.name}))}
                                          />
                                        )
                                      }
                                    />
                                  </div>
                                </Col>

                                <Col lg="12">
                                  <div className="mb-3">
                                    <Label for="basicpill-duree-catastrophe-input">
                                      Combien dépensez-vous les trois  derniers mois pour ?
                                    </Label>
                                    <DepenseTrimestresArray
                                      useFieldArray={useFieldArray} 
                                      register={register} 
                                      control={control}
                                      depense_trimestres={typeDataEnquete ? typeDataEnquete['typeDepense'] : [] }
                                    />
                                  </div>
                                </Col>
                                <Col lg="12">
                                  <div className="mb-3">
                                    <Label for="basicpill-card-verification-input">
                                      Q20. D'où provient principalement l'eau de boisson utilisée par votre ménage ?
                                    </Label>
                                    <Controller
                                      control={control}
                                      name="provenance_eau"
                                      render = {
                                        ({field:{ onChange,name,value}})=>(
                                          <Select name={name}
                                            placeholder="Sources de revenues"
                                            isMulti={false}
                                            className="select"
                                            isClearable={false}
                                            isSearchable={true}
                                            isDisabled={false}
                                            isLoading={false}
                                            isRtl={false}
                                            onChange={onChange}
                                            closeMenuOnSelect={false}
                                            value={value}
                                            defaultValues={value}
                                            options={['Rivières','Puits','Pompe mecanique','SEG'].map(val => ({value:val, label:val}))}
                                          />
                                        )
                                      }
                                    />
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg={6}>
                                  <div className="form-group">
                                    <label>Q21. Distance (aller) jusqu'à cette source d'eau de boisson en mètres/kilomètres</label>
                                    <input className="form-control" {...register('distance_provenance_eau')} placeholder="Distance de provenance de l'eau"/>
                                  </div>
                                </Col>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-cardno-input12">
                                      Q22. Y a-t-il eu une (ou des) naissance(s) dans votre ménage, au cours des 12 derniers mois ?
                                    </Label>
                                    <select className="form-control" {...register('naissance_suvenue')}>
                                      {['OUI','NON'].map((opt,index)=><option  key={index} value={opt}>{opt}</option>)}
                                    </select>
                                  </div>
                                </Col>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-duree-catastrophe-input">
                                      Si oui, où est né l'enfant ?
                                    </Label>
                                    <Controller
                                      control={control}
                                      name="lieu_naissance"
                                      render = {
                                        ({field:{ onChange,value,name}})=>(
                                          <Select name={name}
                                            placeholder="Selectionne activite"
                                            isMulti={false}
                                            className="select"
                                            isClearable={false}
                                            isSearchable={true}
                                            isDisabled={false}
                                            isLoading={false}
                                            isRtl={false}
                                            onChange={onChange}
                                            closeMenuOnSelect={true}
                                            value={value}
                                            defaultValues={value}
                                            options={typeDataEnquete['lieuNaissance'] && typeDataEnquete['lieuNaissance'].map( val=>({value:val.name,label:val.name}))}
                                          />
                                        )
                                      }
                                    />
                                  </div>
                                </Col>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-duree-catastrophe-input">
                                      Q23. Si oui, lieu exact de l'hôpital, maternité ou centre de santé, poste de santé
                                    </Label>
                                    <input className="form-control" {...register('nom_centre')} />
                                  </div>
                                </Col>
                                
                              </Row>
                          </TabPane>
                          <TabPane tabId={4}>
                              <Row>
                                <Col lg="12">
                                  <div className="mb-3">
                                    <Label for="basicpill-duree-catastrophe-input">
                                      Observations de l'enquêteur ?
                                    </Label>
                                    <textarea className="form-control" {...register('observation')}></textarea>
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
                            onClick={() => props.history.push('/souapiti/liste')}
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
                          className={activeTab === 4 ? "next" : "Valider"}
                        >
                          <Button
                            style={{ backgroundColor: '#192957' }}
                            className="btn btn-primary"
                            type="submit"
                          >
                            {activeTab === 4 ? "Valider" : "Suivante"}
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

export default AddUpdatePage