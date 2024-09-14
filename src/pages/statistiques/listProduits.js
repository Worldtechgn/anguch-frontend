import { useFormik } from "formik";
import { MDBIcon } from "mdbreact"
import { useEffect, useState } from "react";
import { 
  Button, 
  Card,
  CardBody, 
  Col,
  Container, 
  Row, 
  Table, 
  Modal, 
  ModalHeader, 
  ModalBody,
  ModalFooter, 
  CardTitle,
} from "reactstrap"

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types"
import { getProduits } from "../../store/produit/action";
import { DownloadExcel } from "react-excel-export";
import { getStatsProduits } from "../../helpers/backend_prix_produit";

const ListProduits = (props) => {

  const {
    onGetProduit, 
  } = props


  const newDate = new Date()
  const [dateAjout, setDateAjout] = useState(`${newDate.getFullYear()}-${(newDate.getMonth() + 1).toString().padStart(2, '0')}`)
  const [search, setSearch] = useState("")
  const [produits, setProduits] = useState([])
  const [region, setRegion] = useState([])
  const [regId, setRegId] = useState(0)
  const [prdId, setPrdId] = useState(0)
  const [produitsForTable, setProduitsForTable] = useState([])
  const [prix_produits, setPrix_produits] = useState([])

  useEffect(() => {
    initPrixProduit()
    onGetProduit()
  }, [onGetProduit])

  const initPrixProduit = async () => {
    getStatsProduits(dateAjout).then(resp =>{
      setPrix_produits(resp.datas)
      setProduits(resp.produits)
      setRegion(resp.regions)
      setProduitsForTable(resp.produitsForTable)
    })
  }

  const handleChangeRegion = (e) => {
    console.log(e.target.value);
    setRegId(e.target.value)
    getStatsProduits(dateAjout, prdId, e.target.value).then(resp =>{
      setPrix_produits(resp.datas)
      setProduitsForTable(resp.produitsForTable)
    })
  }

  const handleChangeProduit = (e) => {
    setPrdId(e.target.value)
    getStatsProduits(dateAjout, e.target.value, regId).then(resp =>{
      setPrix_produits(resp.datas)
      setProduitsForTable(resp.produitsForTable)
    })
  }

  const handleChangeProduitAnnee = (e) => {
    let dateStr = e.target.value === '' ?
      `${newDate.getFullYear()}-${(newDate.getMonth() + 1).toString().padStart(2, '0')}` :
      e.target.value
    
    setDateAjout(dateStr)
    getStatsProduits(dateStr, prdId, regId).then(resp =>{
      setPrix_produits(resp.datas)
      setProduitsForTable(resp.produitsForTable)
    })
  }

  const handleChangeOrder = (e) => {
    const asc = e.target.value === 'asc'
    getStatsProduits(dateAjout, prdId, regId, asc).then(resp =>{
      setPrix_produits(resp.datas)
      setProduitsForTable(resp.produitsForTable)
    })
  }

  const handSearch = (e) => setSearch(e.target.value)

  const month = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

  
  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col className="col-md-3">
            <DownloadExcel
              data={prix_produits.filter(prix_produit => {
                return prix_produit?.region.toLowerCase().includes(search.toLowerCase()) 
                || prix_produit?.prefecture.toLowerCase().includes(search.toLowerCase()) 
              }).map(el=>{

                const expData = {
                  Periode: el?.periode,
                  Region: el?.region,
                  Prefecture: el?.prefecture,
                }
                
                produitsForTable.map((p, i) => (  
                  expData[p.name] = el[`${i}`].prix
                ))
                return expData
              })}
              element={<button>Je suis le button</button>}
              buttonLabel="Exporter"
              style={{ bgColor: "#3085d6" }}
              fileName="liste-des-prix-produits"
              className="button_export btn btn-primary"
            > </DownloadExcel>
            </Col>
            <Col className="col-md-2">
              <select className="form-control input-sm" onChange={handleChangeRegion}>
                <option value="0">--Toutes les regions--</option>
                {region.map(reg => <option key={reg.id} value={reg.id}> {reg.nom}</option>)}
              </select>
            </Col>
            <Col className="col-md-2">
              <select className="form-control input-sm" onChange={handleChangeProduit}>
                <option value="0">--Tout les produits--</option>
                {produits.map(prd => <option key={prd.id} value={prd.id}> {prd.name}</option>)}
              </select>
            </Col>
            <Col className="col-md-2">
              <input type="month" onChange={handleChangeProduitAnnee} value={dateAjout} className="form-control" />
            </Col>
            <Col className="col-md-3">
              <div className="card-tools d-flex align-items-center col-md-12">
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
              </div>
            </Col>
            <hr />
          </Row>

          <Row>
            <Col className="col-md-12">
              <div className="table-responsive overflow-x-auto">
                <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                  <CardBody>
                    <CardTitle className="mt-2 mb-4">
                      Liste des prix de produits
                      {
                        prdId !== '0' && prdId !== 0 &&
                        <div className="float-end">
                          <select className="form-control input-sm d-inline" onChange={handleChangeOrder}>
                            <option value="desc">Ordre descendant</option>
                            <option value="asc">Ordre ascendant</option>
                          </select>
                        </div>
                      }
                    </CardTitle>
                    <Table striped responsive hover className="mb-1" id="table-to-xls">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Région</th>
                          <th>Préfecture</th>
                          {
                            produitsForTable.map(p => (
                                <th key={`name_${p.id}`}>{p.name}</th>
                            ))
                          }
                        </tr>
                      </thead>
                      <tbody>
                        {prix_produits.filter(prix_produit => {
                          return prix_produit?.region.toLowerCase().includes(search.toLowerCase()) 
                          || prix_produit?.prefecture.toLowerCase().includes(search.toLowerCase())
                        }).map((pdt, index) => <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{pdt?.region}</td>
                          <td>{pdt?.prefecture}</td>
                          {
                            produitsForTable.map((p, i) => (
                                <td key={`prix_${p.id}`}>{pdt[`${i}`].prixFormated}</td>
                            ))
                          }                          
                        </tr>)}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}


ListProduits.propTypes = {
  onGetProduit: PropTypes.func,
}

const mapDispatchToProps = dispatch => ({
  onGetProduit: () => dispatch(getProduits())
})

export default connect(null,
  mapDispatchToProps
)(withRouter(ListProduits))