import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, CardBody, Button, CardHeader, Table } from "reactstrap"

//Import Breadcrumb
import { withRouter } from 'react-router-dom';
import { getShowEnqueteDeplaceInternes } from '../../helpers/backend_enquete_type_data';
import dayjs from "dayjs";
import permissionHelper from '../../common/permission_helper';

const ViewEnqueteDeplaceInterne = props => {

	const { match: { params }, history} = props;

	useEffect(() => {
    enqueteDeplaceInterneShow()
	}, []);

  
  const [enqueteDeplaceInterne, setEnqueteDeplaceInterne] = useState([])
  const enqueteDeplaceInterneShow = () => {
    getShowEnqueteDeplaceInternes(params.id).then(response => {
      setEnqueteDeplaceInterne(response)
    }).catch(err =>{
      console.log(err);
    })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col className="col-12">
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardBody>
                  <Row>
                    <Col className="col-12">
                      <Button color='danger' onClick={() => {
                        history.push('/souapiti/liste')
                      }} className="waves-effect waves-light">
                        <i className="far fa-arrow-alt-circle-left"></i> Retour
                      </Button> {" "}
                      {permissionHelper('enqueteDeplaceInterne','update_enqueteDeplaceInterne') && <Button color='primary' onClick={() => {
                        history.push(`/souapiti/edit/${enqueteDeplaceInterne.id}`)
                      }} className="waves-effect waves-light">
                        <i className="fa fa-edit"></i> Editer
                      </Button>} {" "}
                     <hr />
                    </Col>
                    <div className="row">
                      <div className="col-md-12">
                        <h3 className="font-size-20">Point focal : { enqueteDeplaceInterne?.user?.first_name } { enqueteDeplaceInterne?.user?.last_name } </h3><hr />
                        <ul className="list-unstyled product-desc-list text-muted"><li>
                          <i className="mdi mdi-circle-medium me-1 align-middle"></i><b>Prenom : </b>{enqueteDeplaceInterne?.user?.first_name} </li>
                          <li><i className="mdi mdi-circle-medium me-1 align-middle"></i><b>Nom : </b>{enqueteDeplaceInterne?.user?.last_name}</li>
                          <li><i className="mdi mdi-circle-medium me-1 align-middle"></i><b>Email : </b>{enqueteDeplaceInterne?.user?.email}</li>
                          <li><i className="mdi mdi-circle-medium me-1 align-middle"></i><b>Telephone : </b>{enqueteDeplaceInterne?.user?.phone}</li>
                        </ul>
                      </div>
                    </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg={12}>
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardHeader className='bg-primary text-white'>
                  <h1 className='card-title' style={{ color: '#fff'}}>{'Informations sur le ménage'}</h1>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md={12}>
                      <Table className="table-hover">
                        <tbody>
                          <tr>
                            <td><strong>Date enquête </strong></td>
                            <td>{ dayjs(enqueteDeplaceInterne.date_enquete).format("DD-MM-YYYY") } </td>
                          </tr>
                          <tr>
                            <td><strong>Commune</strong>  </td>
                            <td>{enqueteDeplaceInterne?.commune?.nom}</td>
                          </tr> 
                          <tr>
                            <td><strong>Localité/District/Village</strong>  </td>
                            <td>{enqueteDeplaceInterne.localite_menage}</td>
                          </tr> 
                          <tr>
                            <td><strong>Code ménage/Numéro d'identification</strong></td>
                            <td>{enqueteDeplaceInterne.code_menage} </td>
                          </tr>
                          <tr>
                            <td><strong>Nom et prénom chef(fe) de ménage</strong></td>
                            <td>{enqueteDeplaceInterne.chef_menage} </td>
                          </tr>
                          <tr>
                            <td><strong>Age</strong></td>
                            <td>{enqueteDeplaceInterne.age} </td>
                          </tr> 
                          <tr>
                            <td><strong>Sexe</strong></td>
                            <td>{enqueteDeplaceInterne.sexe} </td>
                          </tr>
                          <tr>
                            <td><strong>Profession</strong></td>
                            <td>{enqueteDeplaceInterne.profession} </td>
                          </tr>
                          <tr>
                            <td><strong>Activité actuelle</strong></td>
                            <td>{enqueteDeplaceInterne.active_actuelle} </td>
                          </tr>
                          <tr>
                            <td><strong>Téléphone</strong></td>
                            <td>{enqueteDeplaceInterne.telephone} </td>
                          </tr>
                          <tr>
                            <td><strong>Taille totale du ménage</strong></td>
                            <td>{enqueteDeplaceInterne.taille_menage} </td>
                          </tr>
                          <tr>
                            <td><strong>Nombre de femme du ménage</strong></td>
                            <td>{enqueteDeplaceInterne.nombre_femme} </td>
                          </tr>
                          <tr>
                            <td><strong>Nombre de pesonne handicapée (PH) dans le ménage</strong></td>
                            <td>{enqueteDeplaceInterne.nombre_handicap} </td>
                          </tr>
                          <tr>
                            <td><strong>Nombre d'Enfant -10 ans</strong></td>
                            <td>{enqueteDeplaceInterne.nombre_enfant} </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardHeader className='bg-primary text-white'>
                  <h1 className='card-title' style={{ color: '#fff'}}>{'Informations sur la réinstallation'}</h1>
                </CardHeader>
                <CardBody>
                  <Table className="table-hover">
                    <tbody>
                      <tr>
                        <td><strong>Q1. Quel type de réinstallation avez-vous subit ? </strong></td>
                        <td>{enqueteDeplaceInterne?.type_reinstallation?.join(', ') }  </td>
                      </tr>
                      <tr>
                        <td><strong>Q2. Comment avez-vous vécu le processus de votre réinstallation </strong></td>
                        <td>{enqueteDeplaceInterne.retour_processus_reinstallation} </td>
                      </tr> 
                      <tr>
                        <td> <strong>Q3. Maisons touchées (Nombre détruite - Type, Nombre réconstruite - Type - Par qui ?) </strong> </td>
                        <td>
                         { enqueteDeplaceInterne?.maison_touche?.map((mt,index)=><div key={index}><span>Type : {mt?.type}; <br/> Nombre: {mt?.nombre}</span><br/></div> )}
                        </td>
                      </tr>
                      <tr>
                        <td><strong>Q4. Avez-vous été dédommagé autrement ? </strong> </td>
                        <td>{enqueteDeplaceInterne.dedommagement}</td>
                      </tr>
                      <tr>
                        <td><strong>Q5. Avez-vous été régulièrement impliqués pour toutes les prises de décisions vous concernant pendant ce processus de réinstallation ? </strong></td>
                        <td>{enqueteDeplaceInterne?.impliquer_pour_decision} </td>
                      </tr> 
                      <tr>
                        <td><strong>Si Non, pourquoi ? </strong> </td>
                        <td>{enqueteDeplaceInterne?.cause_implication} </td>
                      </tr>
                      <tr>
                        <td><strong>Q6. Quels types d'accompagnement ont été mis en place pendant le processus de votre réinstallation ? </strong></td>
                        <td>{enqueteDeplaceInterne?.type_accompagnement?.join(', ')} </td>
                      </tr>
                      <tr>
                        <td><strong>Q7. Quels sont vos principaux besoins prioritaires ? </strong></td>
                        <td>{enqueteDeplaceInterne?.besoin_prioritaire?.join(', ')} </td>
                      </tr>
                      <tr>
                        <td><strong>Q8. Avez-vous accès aux services sociaux de base ? </strong> </td>
                        <td>  {enqueteDeplaceInterne?.service_sociaux?.join(', ')} </td>
                      </tr>
                      <tr>
                        <td><strong>Q9. Quelles étaients vos attentes en termes de compensation de vos terres agricoles ?</strong></td>
                        <td>{enqueteDeplaceInterne?.attente_compensation?.join(', ')}  </td>
                      </tr>
                      <tr>
                        <td><strong>Q10. Avez-vous perdue des terres ? </strong></td>
                        <td> {enqueteDeplaceInterne.terre_perdu}  </td>
                      </tr>
                      <tr>
                        <td><strong> Oui, Lesquelles (ex: terre cultivable, habitation,élévage…)</strong></td>
                        <td>{enqueteDeplaceInterne.type_terre} </td>
                      </tr>
                      <tr>
                        <td><strong>Q12. Quels sont les motifs de satisfaction ? </strong></td>
                        <td>{enqueteDeplaceInterne?.motif_satisfaction_demande?.join(', ')}  </td>
                      </tr>
                      <tr>
                        <td><strong>Q13. Avez-vous reçu de l'aide pour entreprendre vos occupations actuelles ? </strong> </td>
                        <td>  {enqueteDeplaceInterne.aide_entreprendre} </td>
                      </tr>
                      <tr>
                        <td><strong>Si Oui, de quels types ? </strong></td>
                        <td>{enqueteDeplaceInterne?.type_aide?.join(', ')}  </td>
                      </tr>
                      <tr>
                        <td><strong>Q14. Êtes-vous satisfait de la collaboration entre vous et le reste de la communauté d'accueil ? </strong> </td>
                        <td>  {enqueteDeplaceInterne.retour_collaboration}  </td>
                      </tr>
                      <tr>
                        <td><strong>Si Oui, quelle est votre appréciation ? </strong> </td>
                        <td>  {enqueteDeplaceInterne.apreciation_collaration}</td>
                      </tr>
                      <tr>
                        <td><strong>Q15. Quels types d'aides supplémentaires avez-vous reçu depuis votre réinstallation sur ce site ? </strong> </td>
                        <td>{enqueteDeplaceInterne?.aide_suppelementaire?.join(', ')}</td>
                      </tr>
                      <tr>
                        <td><strong>Q16. Quelles étaient vos attentes personnelles par rapport au processus de réinstallation ?</strong></td>
                        <td>{enqueteDeplaceInterne?.attente_personnelle?.join(', ')} </td>
                      </tr>
                      <tr>
                        <td><strong>Q17. Quels sont les secteurs d'activités dans lesquels vous souhaitez plus voir le gouvernement appuyer les communautés ? </strong></td>
                        <td>{enqueteDeplaceInterne?.type_activite?.join(', ')} </td>
                      </tr>
                      <tr>
                        <td><strong>Q18. Quels sont les obstacles de l'accès aux soins de santé ? </strong></td>
                        <td> {enqueteDeplaceInterne?.obstacle?.join(', ')}  </td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardHeader className='bg-primary text-white'>
                  <h1 className='card-title' style={{ color: '#fff'}}>{'Revenus et depenses'}</h1>
                </CardHeader>
                <CardBody>
                 <Table>
                  <tbody>
                    <tr>
                      <td><strong>Q19. Principales sources de revenu monétaire du ménage dans l'année écoulée</strong> </td>
                      <td>  {enqueteDeplaceInterne?.source_revenue?.join(', ')}  </td>
                    </tr>
                    <tr>
                      <td><strong> Combien dépensez-vous les trois  derniers mois pour ? </strong> </td>
                      <td> {enqueteDeplaceInterne?.depense_trimestre?.map((d,index)=><div key={index}>Type: { d.type }; Montant: {d.montant}</div>)} </td>
                    </tr> 
                    <tr>
                      <td><strong>Q20. D'où provient principalement l'eau de boisson utilisée par votre ménage ? </strong></td>
                      <td>  {enqueteDeplaceInterne.provenance_eau}  </td>
                    </tr>
                    <tr>
                      <td><strong>Q21. Distance (aller) jusqu'à cette source d'eau de boisson en mètres/kilomètres </strong></td>
                      <td>  {enqueteDeplaceInterne.distance_provenance_eau}  </td>
                    </tr> 
                    <tr>
                      <td><strong> Q22. Y a-t-il eu une (ou des) naissance(s) dans votre ménage, au cours des 12 derniers mois ? </strong></td>
                      <td>  {enqueteDeplaceInterne.naissance_suvenue}  </td>
                    </tr>
                    <tr>
                      <td><strong>Si oui, où est né l'enfant ? </strong></td>
                      <td>  {enqueteDeplaceInterne.lieu_naissance}  </td>
                    </tr>
                    <tr>
                      <td><strong>Q23. Si oui, lieu exact de l'hôpital, maternité ou centre de santé, poste de santé </strong></td>
                      <td>{enqueteDeplaceInterne.naissance_suvenue} </td>
                    </tr>
                  </tbody>
                 </Table>
                </CardBody>
              </Card>
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardHeader className='bg-primary text-white'>
                  <h1 className='card-title' style={{ color: '#fff'}}>{'Conclusion et observations'}</h1>
                </CardHeader>
                <CardBody>
                  <Table>
                    <tbody>
                      <tr>
                        <td> <strong>Q24. Observations de l'enquêteur ? </strong></td>
                        <td>{enqueteDeplaceInterne.observation} </td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
              
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default withRouter(ViewEnqueteDeplaceInterne)

const styleTraitement = {
  height:'150px',
  minHeight:'150px',
  overflowY: 'scroll',
}