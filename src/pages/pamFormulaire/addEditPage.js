import { Card, Container, Row, CardBody, Col, Button, CardHeader, CardTitle } from "reactstrap"
import { useEffect, useState, useMemo } from "react";
import axiosApi from "../../helpers/api_helper";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { HabitudeAlimentaireComponent } from "./component/habitudeAlimentaire";
import { DisponibiliteComponent } from "./component/disponibiliteComponent";
import CatastropheComponent from "./component/catastropheComponent";
import { AccessibiliteSaison } from "./component/accessibiliteSaison";
import { OngComponent } from "./component/OngComponent";
import CouvertureReseau from "./component/couvertureReseau";
import AccessibiliteZone from "./component/accessibiliteZone";
import Swal from "sweetalert2";
import { ModalHabitudeAlimentaire } from "./component/modalHabitudeAlimentaire";
import { ModalOng } from "./component/modalOng";
import { ModalDisponibilite } from "./component/modalDisponibilite";
import { getCatastrophes,getMateriels,getDenres} from "../../store/actions";
import { connect } from 'react-redux';
import PropTypes from "prop-types"
import { withRouter} from 'react-router-dom';
import ActiviteProfessionnelle from "./component/activiteProfessionnelle";

export const AddEditPage = (props) => {

  //Faire la mise
  const { match: { params }, history,onGetCatastrophes,onGetMateriels, onGetDenres, typeDataMateriels} = props
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (params.edit === 'edit' && params.id) {
      editReferencePam(params.id)
    }
    onGetCatastrophes();
    onGetMateriels();
    onGetDenres();
  }, [onGetCatastrophes, onGetMateriels,onGetDenres])

  function idReference(id) {
    return id
  }
  const idReferenceMemo = useMemo(() => idReference(params.id), [params.id])

  const [reference, setReference] = useState({})
  const [habitude_alimentaires, setHabitudes_alimentaires] = useState([])
  const [ongs, setOngs] = useState([])
  const [accessibilite_saison, setAccessibilite_saison] = useState({})
  const [catastrophe, setCatastrophe] = useState([])
  const [couvertureReseau, setCouvertureReseau] = useState([])
  const [disponible, setDisponible] = useState([])
  const [dominant, setDominant] = useState()
  const [disponibilites, setDisponibilites] = useState([])
  const [accissibiliteZone, setAccissibiliteZone] = useState({})
  const [activiteProfessionnelles, setActiviteProfessionnelles] = useState([])

  const editReferencePam = (id) => {
    axiosApi.get(`/reference/${id}`).then(res => {
      setReference(res.data)
      setHabitudes_alimentaires(res.data.habitude_alimentaire);
      setOngs(res.data.ong);
      setCatastrophe(res.data.catastrophe);
      setCouvertureReseau(
        res.data.couverture_reseau
      );
      setDisponible(res.data.couverture_reseau.disponible)
      setDisponibilites(res.data.disponibilite_produit)
      setAccissibiliteZone(res.data.accessibilite_moyen)
      setCatastrophe(res.data.catastrophe)
      setActiviteProfessionnelles(
        res.data.activite_professionnelle ? res.data.activite_professionnelle : []
      )
    })
  }

  const handleOnSubmit = (e) => {
    let elMoto = document.getElementsByName('moto');
    let elAuto = document.getElementsByName('auto');
    let elAvion = document.getElementsByName('avion');
    let _valM = ""
    let _valA = ""
    let _valAv = ""
    for (var elM of elMoto){
      if (elM.checked) {    
        _valM = elM.value
      }
    } 
    
    for (var elA of elAuto){
      if (elA.checked) {    
        _valA = elA.value
      }
    }
    
    for (var elAv of elAvion){
      if (elAv.checked) {    
        _valAv = elAv.value
      }
    }

    let _dataAccess = {
      Moto: _valM,
      Auto: _valA,
      Avion: _valAv
    }

    // accessibilite saison
    let elSeche = document.getElementsByName('seche')
    let elPluie = document.getElementsByName('pluie')
    let elPeriode = document.getElementById('periode')
    let _valSeche = ""; 
    for (const elS of elSeche) {
      if(elS.checked){
        _valSeche = elS.value
      }
    }
    
    let _valPluie = ""; 
    for (const elP of elPluie) {
      if(elP.checked){
        _valPluie = elP.value
      }
    }

    let eldominant = document.getElementById('id_dominant');

    setIsSubmitting(true)
    let data = {
      periode: elPeriode.value,
      catastrophe: catastrophe,
      habitude_alimentaire: habitude_alimentaires,
      accessibilite_saison: {
        seche: _valSeche,
        pluie: _valPluie
      },
      ong: ongs,
      couverture_reseau: {
        disponible: disponible.map(c => c.value),
        dominant: eldominant.value
      },
      accessibilite_moyen: _dataAccess,
      disponibilite_produit: disponibilites,
      activite_professionnelle: activiteProfessionnelles
    }
    // console.log(data);
    // return;
    if (!idReferenceMemo) {
      axiosApi.post('reference', data).then((res) => {
        history.push(`/formulaire/references`)
        setIsSubmitting(false)
        Swal.fire({
          toast: true,
          position: 'top-end',
          text: 'Enregistrement effectué avec success.',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        })
      })
    } else {
      axiosApi.patch(`reference/${params.id}`, data).then((res) => {
        history.push(`/formulaire/references`)
        setIsSubmitting(false)
        Swal.fire({
          toast: true,
          position: 'top-end',
          text: 'Enregistrement effectué avec success.',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        })
      })
    }
  }

  const onHandleCatastrophe = (catastrophe) => {
    setCatastrophe(catastrophe)
  }

  const onHandleChangeHabitudeAlimentaire = (event) => {
    habitude_alimentaires.push(event)
    setHabitudes_alimentaires(habitude_alimentaires)
  }

  const onHandleAccessibiliteSaison = (accessibilite_saison) => {
    setAccessibilite_saison(accessibilite_saison);
  }

  const onHandleCouvertureReseau = (couverture_reseau) => {
    setCouvertureReseau(couverture_reseau)
    setDisponible(couverture_reseau.disponible)
  }

  const onHandleCouvertureReseauDominant = (dominant) => {
    setDominant(dominant)
  }

  const onHandleDisponibilite = (disponibilite) => {
    disponibilites.push(disponibilite);
    setDisponibilites(disponibilites)
  }

  const onHandleAccessibiliteZone = (accessibilite) => {
    setAccissibiliteZone(accessibilite)
  }

  const onHandleActiviteProfessionnelle = (activites) => {
    setActiviteProfessionnelles(activites)
  }
  //memo
  const onHandleOng = (ong) => {
    ongs.push(ong)
    setOngs(ongs)
  }

  //
  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Formulaire" breadcrumbItem="Les questions de références" />
          <Row>
            <Col className="col-12">
              
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardHeader><CardTitle>1- Quels sont les catastrophes fréquentes dans la préfecture *</CardTitle></CardHeader>
                <CardBody>
                  <Row>
                    <div className="form-group col-md-3 mb-2">
                      <label htmlFor="periode">Période</label>
                      <input className="form-control" type="date" name="periode" defaultValue={reference.periode}  id="periode" placeholder="Période"/>
                    </div>
                    <CatastropheComponent idReferenceMemo={idReferenceMemo} catastrophes={catastrophe} typeCatastrophes={typeDataMateriels.catastrophes} onHandleCatastrophe={onHandleCatastrophe} />
                  </Row>
                </CardBody>
              </Card>

              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardHeader><CardTitle>2- Quels sont les activites sociaux professionnelles *</CardTitle></CardHeader>
                <CardBody>
                  <Row>
                    <ActiviteProfessionnelle idReferenceMemo={idReferenceMemo} activiteProfessionnelles={activiteProfessionnelles} onHandleActiviteProfessionnelle={onHandleActiviteProfessionnelle} />
                  </Row>
                </CardBody>
              </Card>

              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardHeader>
                  <CardTitle>
                    3- Quels sont les habitudes alimentaires de la population ? (Aliments locaux):
                    <ModalHabitudeAlimentaire onHandleChangeHabitudeAlimentaire={onHandleChangeHabitudeAlimentaire} />
                  </CardTitle>
                </CardHeader>
                <CardBody className="table-responsive">
                  <HabitudeAlimentaireComponent habitude_alimentaires={habitude_alimentaires} />
                </CardBody>
              </Card>

              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardHeader><CardTitle>f. Votre marché est-il accessible à tout moment (Saison sèche, période hivernale) ?</CardTitle></CardHeader>
                <CardBody>
                  <AccessibiliteSaison accessibilite_saison={reference.accessibilite_saison} onHandleAccessibiliteSaison={onHandleAccessibiliteSaison} />
                </CardBody>
              </Card>

              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardHeader>
                  <CardTitle>
                    Partenaires financiers ou ONG
                    <div>
                      <ModalOng onHandleOng={onHandleOng} />
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <OngComponent ongs={ongs} />
                </CardBody>
              </Card>

              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardHeader><CardTitle>- La zone est-elle couverte par les réseaux téléphoniques ?</CardTitle></CardHeader>
                <CardBody>
                  <CouvertureReseau idReferenceMemo={idReferenceMemo} operateures={couvertureReseau} onHandleDominant={onHandleCouvertureReseauDominant} onHandleCouvertureReseau={onHandleCouvertureReseau} />
                </CardBody>
              </Card>

              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardHeader><CardTitle>4 - La zone est-elle accessible par avion, auto, moto/vélo ?</CardTitle></CardHeader>
                <CardBody>
                  <AccessibiliteZone onHandleAccessibiliteZone={onHandleAccessibiliteZone} accessibilite_moyen={accissibiliteZone} />
                </CardBody>
              </Card>

              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardHeader>
                  <CardTitle>Disponibilité des produits alimentaires
                    <ModalDisponibilite onHandleDisponibilite={onHandleDisponibilite} />
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <DisponibiliteComponent disponibilites={disponibilites} />
                </CardBody>
              </Card>
              <div className="form-group mt-2">
                <Button type="button" style={{ backgroundColor: '#192957' }} disabled={isSubmitting} onClick={handleOnSubmit} className="btn m-1 float-end">
                  {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                  <i className='fa fa-save'></i> {idReferenceMemo ? 'Modifier' : 'Enregistrer'}
                </Button>

                <Button color="danger" onClick={() => {
                  history.push('/formulaire/references')
                }} className="waves-effect waves-light">
                  Fermer
                </Button>{" "}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

AddEditPage.propTypes = {
  typeDataMateriels:PropTypes.object,
  onGetDenres: PropTypes.func,
  onGetMateriels: PropTypes.func,
  onGetCatastrophes: PropTypes.func,
}

const mapStateToProps = ({
   typeDataMateriels,
  }) => ({ 
    typeDataMateriels: typeDataMateriels,
  })

const mapDispatchToProps = dispatch => ({
  onGetCatastrophes: () => dispatch(getCatastrophes()),
  onGetMateriels: () => dispatch(getMateriels()),
  onGetDenres: () => dispatch(getDenres())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(AddEditPage))