import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, Container } from "reactstrap"


//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axiosApi from "../../helpers/api_helper";
import { exportMultipleChartsToPdf, exportMultipleDountChartToPdf, exportMultipleLineChartToPdf, exportMultiplePieChartToPdf } from "./utils";
//Import Components
import MiniWidget from "./mini-widget";
import { DateRangePicker } from 'rsuite';

// import chartJs
import LineChart from "../AllCharts/chartjs/linechart"
import DountChart from "../AllCharts/chartjs/dountchart"
import PieChart from "../AllCharts/chartjs/piechart"
import PolarChart from "../AllCharts/chartjs/polarchart";
import ApaexlineAge from "./linebarchart";
import StateTypeCatastropheRegion from "./StateTypeCatastropheRegion";
import MultipleBarChart from "./MultipleBarChart";


const Dashboard = (props) => {
  const currYear =  new Date().getFullYear()

  const { match: { params } } = props;
  const newDate = new Date()
  const [dateAjout, setDateAjout] = useState(`${newDate.getFullYear()}-${(newDate.getMonth() + 1).toString().padStart(2, '0')}`)
  const [dateRegAjout, setDateRegAjout] = useState(`${newDate.getFullYear()}-${(newDate.getMonth() + 1).toString().padStart(2, '0')}`)
  const [reports, setReports] = useState([])
  const [byIncidents, setByIncidents] = useState([])
  const [suivieProduit, setSuivieProduit] = useState([])
  const [suivieProduitReg, setSuivieProduitReg] = useState([])
  const [suivieProduitAnnee, setSuivieProduitAnnee] = useState([])
  const [byTypes, setByTypes] = useState([])
  const [byEtat, setByEtat] = useState([])
  const [migrants, setMigrants] = useState([])
  const [refugies, setRefugies] = useState([])
  const [deplaces, setDeplaces] = useState([])
  const [catastrophes, setCatastrophes] = useState([])
  const [catastropheManage, setCatastropheManage] = useState([])
  const [regions, setRegions] = useState([])
  const [prefs, setPrefs] = useState([])
  const [produits, setProduits] = useState([])
  const [currProduitPrefId, setCurrProduitPrefId] = useState('com-1')
  const [currProduitMoisId, setCurrProduitMoisId] = useState(1)
  const [currProduitId, setCurrProduitId] = useState(1)
  const [currProduitRegId, setCurrProduitRegId] = useState(1)
  const [currProdYear, setCurrProdYear] = useState(currYear)

  const annees = [currYear, currYear-1, currYear-2, currYear-3, currYear-4]

  const fetchStatistique = () => {
    // axiosApi.get('/dashboard/statistique/age-type-region').then(res => {
    //   setCatastrophes(res.data)
    // })

    axiosApi.get('/dashboard').then(res => {
      setReports(res.data)
    })

    axiosApi.get('/produits').then(res => {
      setProduits(res.data)
    })

    axiosApi.get('/prefecture').then(res => {
      setPrefs(res.data)
    })

    axiosApi.get(`/dashboard/statistique/evolution-produit-annee?produit_id=${currProduitId}&prefecture_id=${currProduitPrefId}&annee=${currProdYear}`).then(res => {
      setSuivieProduitAnnee(res.data)
    })

    axiosApi.get(`/dashboard/statistique/evolution-produit-region?produit_id=${currProduitRegId}&annee=${dateRegAjout}`).then(res => {
      setSuivieProduitReg(res.data)
    })

    axiosApi.get(`/dashboard/statistique/evolution-produit?produit_id=${currProduitMoisId}&annee=${dateAjout}`).then(res => {
      setSuivieProduit(res.data)
    })


    axiosApi.get(`/dashboard/statistique/nombre-homme-femme-enfant-catastrophes`).then(res => {
      setCatastrophes(res.data)
    })
    
    axiosApi.get('/region').then(res => {
      setRegions(res.data)
    })

    // Incident Par region
    axiosApi.get('/dashboard/statistique/region').then(res => {
      setByIncidents(res.data)
    })

    //Incident Par Type
    axiosApi.get(`/dashboard/statistique/type?annee=${currYear}`).then(res => {
      setByTypes(res.data)
    }) 

    //Incident Par Etat
    axiosApi.get(`/dashboard/statistique/etat?annee=${currYear}`).then(res => {
      setByEtat(res.data)
    }) 
    
    //Catastrophes manage par region
    axiosApi.get('/dashboard/statistique/menage-region').then(res => {
      setCatastropheManage(res.data)
    })

    //Refufie/ Migrant/ Deplace
    axiosApi.get('/dashboard/statistique/MigrantDeplaceRefugie').then(res => {
      setMigrants(res.data.migrants)
      setRefugies(res.data.refugies)
      setDeplaces(res.data.deplaces)
    })
  }

  useEffect(() => {
    fetchStatistique()
  }, [])

  const dateFull = (date) =>{
    let _date = new Date(date)
    let _date_full = convert(_date);
    return _date_full
  }

  const convert = (str) => {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  
  const handleChangeDate = (event) => {
    if(event){
      let firstDate = dateFull(new Date(event[0]));
      let lastDate = dateFull(new Date(event[1]));
      axiosApi.get(`/dashboard?date_debut=${firstDate}&date_fin=${lastDate}`).then(res => {
        setReports(res.data)
      })
    }
  }

  const handleChangeProduitRegion = (event) => {
    setCurrProduitRegId(event.target.value)
    setSuivieProduitReg([])
    axiosApi.get(`/dashboard/statistique/evolution-produit-region?produit_id=${event.target.value}&annee=${dateRegAjout}`).then(res => {
      setSuivieProduitReg(res.data)
    })
  }

  const handleChangeProduitRegionMois = (event) => {
    setDateRegAjout(event.target.value)
    setSuivieProduitReg([])
    axiosApi.get(`/dashboard/statistique/evolution-produit-region?produit_id=${currProduitRegId}&annee=${event.target.value}`).then(res => {
      setSuivieProduitReg(res.data)
    })
  }

  const handleChangeProduitMois = (event) => {
    setCurrProduitMoisId(event.target.value)
    setSuivieProduit([])
    axiosApi.get(`/dashboard/statistique/evolution-produit?produit_id=${event.target.value}&annee=${dateAjout}`).then(res => {
      setSuivieProduit(res.data)
    })
  }

  const handleChangeProduitMoisDate = (event) => {
    console.log(event.target.value)
    setDateAjout(event.target.value)
    setSuivieProduit([])
    axiosApi.get(`/dashboard/statistique/evolution-produit?produit_id=${currProduitMoisId}&annee=${event.target.value}`).then(res => {
      setSuivieProduit(res.data)
    })
  }

  const handleChangePrefectureAnnee = (e) => {
    setCurrProduitPrefId(e.target.value)
    setSuivieProduitAnnee([])
    axiosApi.get(`/dashboard/statistique/evolution-produit-annee?produit_id=${currProduitId}&prefecture_id=${e.target.value}&annee=${currProdYear}`).then(res => {
      setSuivieProduitAnnee(res.data)
    })
  }
  const handleChangeProduitAnnee = (e) => {
    setCurrProduitId(e.target.value)
    setSuivieProduitAnnee([])
    axiosApi.get(`/dashboard/statistique/evolution-produit-annee?produit_id=${e.target.value}&prefecture_id=${currProduitPrefId}&annee=${currProdYear}`).then(res => {
      setSuivieProduitAnnee(res.data)
    })
  }
  const handleChangeProduitYear = (e) => {
    setCurrProdYear(e.target.value)
    setSuivieProduitAnnee([])
    axiosApi.get(`/dashboard/statistique/evolution-produit-annee?produit_id=${currProduitId}&prefecture_id=${currProduitPrefId}&annee=${e.target.value}`).then(res => {
      setSuivieProduitAnnee(res.data)
    })
  }

  const handleChangeEtatAnnee = (event) => {
    setByEtat([])
    axiosApi.get(`/dashboard/statistique/etat?annee=${event.target.value}`).then(res => {
      setByEtat(res.data)
    })
  }

  //Catastrophes manage par region
  const handleChangeRegion = (event) => {
    setCatastrophes({datasets: [], regions: []})
    axiosApi.get(`/dashboard/statistique/nombre-homme-femme-enfant-catastrophes?region_id=${event.target.value}`).then(res => {
      setCatastrophes(res.data)
    })
  }

  //Catastrophes par type et année
  const handleChangeType = (event) => {
    setByTypes([])
    axiosApi.get(`/dashboard/statistique/type?annee=${event.target.value}`).then(res => {
      setByTypes(res.data)
    }) 
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="ANGUCH" breadcrumbItem="Tableau de bord" />
          {params?.statistique && 
            <>
              <Row>
                <Col className="col-md-4">
                  <div className="form-group">
                    <DateRangePicker onChange={() => handleChangeDate} />
                  </div>
                </Col>
              </Row>
              <hr/>
            </>
          }
          
          <Row>
            {<MiniWidget reports={reports} />}
          </Row>
          <hr />

          <Row>
            <Col xl={6}>
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardBody>
                  <div className="row">
                    <div className="col-md-8">
                      <h4 className="card-title mb-4">Catastrophe(s) Par region</h4>
                    </div>
                    <div className="col-md-4">
                      <button className="btn btn-sm float-end" onClick={exportMultipleChartsToPdf}>
                        <i className="fa fa-solid fa-file-export fa-1x"></i>
                      </button>
                    </div>
                  </div>
                  <div className="custom-chart">
                    <StateTypeCatastropheRegion catastrophes={byIncidents} />
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={6}>
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardBody>
                  <div className="row">
                    <div className="col-md-8">
                      <h4 className="card-title mb-4">Catastrophe(s) par type</h4>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <select className="form-control input-sm" defaultValue={currYear} onChange={handleChangeType}>
                          <option value="">--Selectioner une année</option>
                          {annees.map(ann => <option key={ann} value={ann}> {ann}</option>)}
                        </select>
                      </div>
                      <button className="btn btn-sm float-end" onClick={exportMultipleLineChartToPdf}>
                        <i className="fa fa-solid fa-file-export fa-1x"></i>
                      </button>
                    </div>
                  </div>
                  <div className="custom-LineChart">
                    <LineChart data={byTypes} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl={6}>
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardBody>
                  <h4 className="card-title mb-4"> Nombre total menage affecté par types et par regions </h4>
                  <StateTypeCatastropheRegion catastrophes={catastropheManage} />
                </CardBody>
              </Card>
            </Col>
            <Col xl={6}>
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardBody>
                  <div className="row">
                    <div className="col-md-8">
                      <h4 className="card-title mb-4">Catastrophe par region et nombre d'enfant, homme et femme</h4>
                    </div>
                    <div className="col-md-4">
                    <div className="form-group">
                      <select className="form-control input-sm" onChange={handleChangeRegion}>
                        <option value="">--Selectioner la region</option>
                        {regions.map((reg, index) => <option key={index} value={reg.id}> {reg.nom}</option>)}
                      </select>
                    </div>
                      <button className="btn btn-sm float-end">
                        <i className="fa fa-solid fa-file-export fa-1x"></i>
                      </button>
                    </div>
                  </div>
                  <div className="custom-PolarChart">
                    <ApaexlineAge catastrophes={catastrophes} />
                  </div>
                </CardBody>
              </Card>
            </Col>
            {/* <Col xl={6}>
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardBody>
                  <h4 className="card-title mb-4">L'indicateur sur état de traitement de la catastrophe </h4>
                  <PieTraitement />
                </CardBody>
              </Card>
            </Col> */}
          </Row>
          <Row>
          <Col xl={6}>
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardBody>
                  <div className="row">
                    <div className="col-md-8">
                      <h4 className="card-title mb-4">Catastrophe(s) par état</h4>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <select className="form-control input-sm" onChange={handleChangeEtatAnnee}>
                          {annees.map(ann => <option key={ann} value={ann}> {ann}</option>)}
                        </select>
                      </div>
                      <button className="btn btn-sm float-end" onClick={exportMultipleChartsToPdf}>
                        <i className="fa fa-solid fa-file-export fa-1x"></i>
                      </button>
                    </div>
                  </div>
                  <div className="custom-chart">
                    <MultipleBarChart donnees={byEtat} chartTitle="Classement des catastrophe par état et par année" />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={6}>
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardBody>
                  <div className="row">
                    <div className="col-md-4">
                      <h4 className="card-title mb-4">Evolution(s) Prix région / Mois</h4>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <select className="form-control input-sm" onChange={handleChangeProduitRegion}>
                          {produits.map(p => <option key={p.id} value={p.id}> {p.name}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <input type="month" onChange={handleChangeProduitRegionMois} value={dateRegAjout} className="form-control" />
                      </div>
                      <button className="btn btn-sm float-end" onClick={exportMultipleChartsToPdf}>
                        <i className="fa fa-solid fa-file-export fa-1x"></i>
                      </button>
                    </div>
                  </div>
                  <div className="custom-chart">
                    <MultipleBarChart donnees={suivieProduitReg} chartTitle="Suivi de l'evolution des prix des produits par région par mois" />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl={12}>
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardBody>
                  <div className="row">
                    <div className="col-md-4">
                      <h4 className="card-title mb-4">Evolution(s) Prix préfecture / Mois</h4>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <select className="form-control input-sm" onChange={handleChangeProduitMois}>
                          {produits.map(p => <option key={p.id} value={p.id}> {p.name}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <input type="month" onChange={handleChangeProduitMoisDate} value={dateAjout} className="form-control" />
                      </div>
                      <button className="btn btn-sm float-end" onClick={exportMultipleChartsToPdf}>
                        <i className="fa fa-solid fa-file-export fa-1x"></i>
                      </button>
                    </div>
                  </div>
                  <div className="custom-chart">
                    <MultipleBarChart donnees={suivieProduit} chartTitle="Suivi de l'evolution des prix des produits par préfecture par mois" />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl={6}>
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardBody>
                  <div className="row">
                    <div className="col-md-12">
                      <h4 className="card-title mb-4">Evolution(s) Prix préfecture / Année</h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <select className="form-control input-sm" value={currProduitPrefId} onChange={handleChangePrefectureAnnee}>
                          {prefs.map(pref => (
                            pref.nom === "Conakry" ?
                            pref.commune.map(com => <option key={`com-${com.id}`} value={`com-${com.id}`}> {com.nom}</option>) :
                            <option key={`pref-${pref.id}`} value={`pref-${pref.id}`}> {pref.nom}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <select className="form-control input-sm" value={currProduitId} onChange={handleChangeProduitAnnee}>
                          {produits.map(p => <option key={p.id} value={p.id}> {p.name}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <select className="form-control input-sm" value={currProdYear} onChange={handleChangeProduitYear}>
                          {annees.map(ann => <option key={ann} value={ann}> {ann}</option>)}
                        </select>
                      </div>
                      <button className="btn btn-sm float-end" onClick={exportMultipleChartsToPdf}>
                        <i className="fa fa-solid fa-file-export fa-1x"></i>
                      </button>
                    </div>
                  </div>
                  <div className="custom-chart">
                    <MultipleBarChart donnees={suivieProduitAnnee} chartTitle="Suivi de l'evolution des prix d'un produits d'une préfecture par année" />
                  </div>
                </CardBody>
              </Card>
            </Col>
            {params?.statistique && 
              <Col xl={6}>
                <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                  <CardBody>
                    <div className="row">
                      <div className="col-md-8">
                        <h4 className="card-title mb-4">Nombre De Migrant(s) Par Region</h4>
                      </div>
                      <div className="col-md-4">
                        <button className="btn btn-sm float-end" onClick={exportMultiplePieChartToPdf}>
                          <i className="fa fa-solid fa-file-export fa-1x"></i>
                        </button>
                      </div>
                    </div>
                    <div className="custom-PieChart">
                      <PieChart data={migrants} />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            }
          </Row>
          {params?.statistique && 
          <Row>
            <Col xl={6}>
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardBody>
                  <div className="row">
                    <div className="col-md-8">
                      <h4 className="card-title mb-4">Nombre De Réfugié(s) Par Region</h4>
                    </div>
                    <div className="col-md-4">
                      <button className="btn btn-sm float-end" onClick={exportMultipleDountChartToPdf}>
                        <i className="fa fa-solid fa-file-export fa-1x"></i>
                      </button>
                    </div>
                  </div>
                  <div className="custom-DountChart">
                    <DountChart data={refugies} />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={6}>
                <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                  <CardBody>
                    <div className="row">
                      <div className="col-md-8">
                        <h4 className="card-title mb-4">Nombre De Deplacé(s) Par Region</h4>
                      </div>
                      <div className="col-md-4">
                        <button className="btn btn-sm float-end" onClick={exportMultipleDountChartToPdf}>
                          <i className="fa fa-solid fa-file-export fa-1x"></i>
                        </button>
                      </div>
                    </div>
                    <div className="custom-PolarChart">
                      <PolarChart data={deplaces} />
                    </div>
                  </CardBody>
                </Card>
              </Col>
          </Row>
          }

        </Container>
      </div>
    </React.Fragment>
  );
};
export default Dashboard;