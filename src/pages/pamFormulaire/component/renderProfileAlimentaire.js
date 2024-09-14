import { Button, Card, CardBody, CardTitle, Col, Table } from "reactstrap"
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import axiosApi from "../../../helpers/api_helper";

export const RenderProfileAlimentaire = ({profile_alimentaires,onRefreshData}) => {

  const format_date = (date_str) => {
    const month = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
    const dateArr = new Date(date_str)
    return `${month[dateArr.getUTCMonth()]} ${dateArr.getFullYear()}`;
  }

    
  return (
    <>
      <Col className="col-12">
        <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
          <CardBody>
            <CardTitle>
              <div className="row">
                <div className="card-tools d-flex align-items-center col-lg-6">
                  <div className="input-group input-group-sm">
                    La liste des profiles alimentaires
                  </div>
                </div>
              </div>
            </CardTitle>
            <div className="table-responsive">
              <Table className="table table-striped mb-0 table-hover" id="table-to-xls">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Point focal</th>
                    <th>Période</th>
                    <th>Catastrophes frequentes</th>
                    <th>Accessibilité session</th>
                    <th>Accessibilité moyen</th>
                    <th className='text-center'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    profile_alimentaires.map((reference, index) => <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{reference.full_name} </td>
                      <td>{ format_date(reference.created_at) } </td>
                      <td> {
                        reference.catastrophe.join(', ')
                      } </td>
                      <td> Sèche: {reference.accessibilite_saison.seche}, Pluie: {reference.accessibilite_saison.pluie}</td>
                      <td>
                        Moto: {reference.accessibilite_moyen.Moto},
                        Avion: {reference.accessibilite_moyen.Avion},
                        Auto: {reference.accessibilite_moyen.Auto}
                      </td>
                      <td>
                        <Link to={`/profile-alimentaires/${reference.id}`} className='btn btn-primary btn-sm'><i className="fa fa-eye"></i></Link>{" "}
                        <Link to={`/formulaire/references/${reference.id}/edit/`} className='btn btn-success btn-sm'><i className="uil uil-edit me-2"></i></Link>
                        <Button onClick={() => {
                          Swal.fire({
                            title: 'Vous êtes sur le point de supprimer ce profile alimentaire',
                            text: 'Êtes-vous sûr de continuer ?',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#d33',
                            cancelButtonColor: '#3085d6',
                            confirmButtonText: 'OUI',
                            cancelButtonText: 'NON'
                          }).then((result) => {
                            if (result.isConfirmed) {
                              axiosApi.delete('reference/' + reference.id).then(res => {
                                Swal.fire({
                                  toast: true,
                                  position: 'top-end',
                                  text: 'Suppression effectué avec success.',
                                  icon: 'success',
                                  showConfirmButton: false,
                                  timer: 2000
                                })
                                onRefreshData()
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
                        }} className='btn btn-danger btn-sm'><i className="fa fa-trash"></i></Button>
                      </td>
                    </tr>)
                  }
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  )
}