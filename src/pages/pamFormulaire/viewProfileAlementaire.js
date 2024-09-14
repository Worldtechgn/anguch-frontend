import { Card, Container, Row, CardBody, Col, Button, CardHeader, CardTitle, Table } from "reactstrap"
import { useEffect, useState } from "react";
import axiosApi from "../../helpers/api_helper";

export const ViewProfileAlimentaire = (props) => {

  //Faire la mise
  const { match: { params },history} = props

  useEffect(() => {
    editReferencePam(params.id)
  }, [params])

  const [reference, setReference] = useState({})
  const editReferencePam = async (id) => {
    axiosApi.get(`/reference/${id}`).then(res => {
      setReference(res.data)
    })
  }
  //
  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col className="col-12">
              <div className="form-group mt-2">
                <Button color="danger" onClick={() => {history.push('/formulaire/references')}} className="waves-effect waves-light">
                  Fermer
                </Button> {" "}
                <Button color="primary" style={{ backgroundColor: '#192957' }} onClick={() => {history.push(`/formulaire/references/${reference.id}/edit/`)}} className="waves-effect waves-light">
                  <i className="fa fa-edit"></i> Modifier
                </Button>
              </div>
              
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardHeader><CardTitle>1- Quels sont les catastrophes fréquentes dans la préfecture</CardTitle></CardHeader>
                <CardBody>
                  <Row>
                    <div className="form-group col-md-3 mb-2">
                      <label htmlFor="periode">Période: </label>
                      <strong>{reference && reference?.periode}</strong>
                    </div>
                    <p>
                      <label>Catastrophes: </label> <br/>
                      {reference.catastrophe && reference.catastrophe.map((c,index)=> <span key={index} className={'badge rounded-pill bg-soft-primary font-size-12'} >{c} </span>)}
                    </p>
                  </Row>
                </CardBody>
              </Card> 
              
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardHeader><CardTitle>2- Quels sont les activites sociaux professionnelles</CardTitle></CardHeader>
                <CardBody>
                  <Row>
                    <p>
                      <label>Activites sociaux professionnelles: </label> <br/>
                      {reference.activite_professionnelle && reference.activite_professionnelle ? reference.activite_professionnelle.map((c,index) => <span key={index} className={'badge rounded-pill bg-soft-primary font-size-12'} >{c} </span>) : ''}
                    </p>
                  </Row>
                </CardBody>
              </Card>
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardHeader>
                  <CardTitle>
                    3- Quels sont les habitudes alimentaires de la population ? (Aliments locaux):
                  </CardTitle>
                </CardHeader>
                <CardBody className="table-responsive">
                <Table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nom aliment</th>
                      <th>Grossiste</th>
                      <th>Capacite</th>
                      <th>Magasin</th>
                      <th>Flotte</th>
                      <th>Raison</th>
                    </tr>
                  </thead>
                  <tbody>
                      {reference.habitude_alimentaire && reference.habitude_alimentaire.map((ha,index) => <tr key={index}>
                        <td>{index+1}</td>
                        <td>{ha.aliment}</td>
                        <td>{ha.grossiste}</td>
                        <td>{ha.capacite}</td>
                        <td>{ha.magasin}</td>
                        <td>{ha.flotte}</td>
                        <td>{ha.raison}</td>
                      </tr>)}
                  </tbody>
                </Table>
                </CardBody>
              </Card>

              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardHeader><CardTitle>f. Votre marché est-il accessible à tout moment (Saison sèche, période hivernale) ?</CardTitle></CardHeader>
                <CardBody>
                  <p>Pluie: <strong>{reference.accessibilite_saison && reference.accessibilite_saison?.pluie}</strong></p>
                  <p>Sèche: <strong>{reference.accessibilite_saison && reference.accessibilite_saison?.seche}</strong></p>
                </CardBody>
              </Card>

              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardHeader>
                  <CardTitle>
                    Partenaires financiers ou ONG
                  </CardTitle>
                </CardHeader>
                <CardBody>
                <Table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nom de l'ong</th>
                      <th>Type de l'ong</th>
                      <th>Resident</th>
                      <th>Intervient</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reference.ong && reference.ong.map((ong, index) => <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{ong.nom}</td>
                      <td>{ong.type}</td>
                      <td>{ong.resident}</td>
                      <td>{ong.intervient}</td>
                    </tr>)}
                  </tbody>
                </Table>
                </CardBody>
              </Card>

              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardHeader><CardTitle>- La zone est-elle couverte par les réseaux téléphoniques ?</CardTitle></CardHeader>
                <CardBody>
                  <p>Disponibles: <strong>{reference.couverture_reseau && reference.couverture_reseau?.disponible?.map((d,index)=> <span key={index} className={'badge rounded-pill bg-soft-primary font-size-12'}>{d}</span> )}</strong></p>
                  <p>Dominant: <strong><span className={'badge rounded-pill bg-soft-primary font-size-12'}>{reference.couverture_reseau && reference.couverture_reseau.dominant}</span></strong></p>
                  
                </CardBody>
              </Card>

              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardHeader><CardTitle>5 - La zone est-elle accessible par avion, auto, moto/vélo ?</CardTitle></CardHeader>
                <CardBody>
                  <p>Moto: <strong>{reference.accessibilite_moyen && reference.accessibilite_moyen.Moto}</strong></p>
                  <p>Auto: <strong>{reference.accessibilite_moyen && reference.accessibilite_moyen.Auto}</strong></p>
                  <p>Avion: <strong>{reference.accessibilite_moyen && reference.accessibilite_moyen.Avion}</strong></p>
                </CardBody>
              </Card>

              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardHeader>
                  <CardTitle>Disponibilité des produits alimentaires</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="table table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Produit</th>
                        <th>Disponibilité</th>
                        <th>Raison</th>
                      </tr>
                    </thead>
                    <tbody>
                        {reference.disponibilite_produit && reference.disponibilite_produit.map((disp,index) => <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{disp.aliment}</td>
                          <td>{disp.disponibilite}</td>
                          <td>{disp.raison}</td>
                        </tr>)}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
} 