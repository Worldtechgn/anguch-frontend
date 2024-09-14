import { useEffect, useState } from "react"
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { connect } from 'react-redux';
import PropTypes from "prop-types"
import { withRouter } from 'react-router-dom';
import { getCatastrophesDownloadBackend, getProfileAlimentaireBackend } from "../../helpers/backend_ profile_alimentaire";
import { saveAs } from 'file-saver';
import { getCatastrophes, getUtilisateurs} from "../../store/actions";
import { RenderProfileAlimentaire } from "./component/renderProfileAlimentaire";

const ListReferencePam = (props) => {
	const [search, setSearch] = useState("");
	const { history,onGetCatastrophes,onGetUtilisateurs} = props;

	const [profile_alimentaires,setProfile_alimentaires] = useState([])
  const [loading, setLoading] = useState(true);

	function initProfileAlimentaire() {
		getProfileAlimentaireBackend(1,200).then(
			response => {
				setProfile_alimentaires(response)
				setLoading(false)
		})
	}
	useEffect(() => {
		initProfileAlimentaire()
		onGetCatastrophes();
		onGetUtilisateurs()
	}, [onGetCatastrophes, onGetUtilisateurs])

	const handlerSearch = (e) => setSearch(e.target.value)

	const[download, setDownload] = useState(false)
	const handleDownload = () => {
		setDownload(true)
		getCatastrophesDownloadBackend(search).then( async (response) => {
			const filename = "question_reference.xlsx"
			saveAs(new Blob([response]), filename);
			setDownload(false)
		}).catch(err => console.log(err))
	}
	const onRefreshData = () => {
		initProfileAlimentaire()
	}

	const format_date = (date_str) => {
    const month = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
    const dateArr = new Date(date_str)
    return `${month[dateArr.getUTCMonth()]} ${dateArr.getFullYear()}`;
  }

	return (
		<>
			<div className="page-content">
				<div className="container-fluid">
					<Row>
						<Col className="col-12">
							<Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
								<CardBody>
									<Row>
										<Col className="col-6">
											<Button style={{ backgroundColor: '#192957' }} onClick={() => {
												history.push('/formulaire/pam')
											}} className="waves-effect waves-light btn">
												<i className="uil uil-plus me-2"></i> Ajouter un profile alimentaire
											</Button>{" "}
											<Button onClick = {handleDownload} className="waves-effect waves-light">
												<i className="fa fa-download"></i> {download ? "Télécharger..." : "Exporter"}
											</Button>{" "}
										</Col>
										<Col className="col-6">
											<div className="form-group">
												<input type="text" className="form-control" name="q" onChange={handlerSearch} placeholder="Rechercher..." />
											</div>
										</Col>
									</Row>
								</CardBody>
							</Card>
						</Col>
						{!loading ?
							<RenderProfileAlimentaire
								profile_alimentaires={profile_alimentaires.filter(
									p => {
										return format_date(p.created_at).toLowerCase().includes(search.toLowerCase())
										|| p.catastrophe.join(', ').toLowerCase().includes(search.toLowerCase())
									}
								)}
								onRefreshData={onRefreshData}
							/>
						: 
						<div>
							{"Chargement..."}
						</div>
					}

					</Row>
				</div>
			</div>
		</>
	)
}
ListReferencePam.propTypes = {
  typeDataMateriels:PropTypes.object,
  onGetCatastrophes: PropTypes.func,
	utilisateurs: PropTypes.array,
	onGetUtilisateurs: PropTypes.func
}

const mapStateToProps = ({
   typeDataMateriels, utilisateurs
  }) => ({ 
    typeDataMateriels: typeDataMateriels,
		utilisateurs: utilisateurs.utilisateurs,
  })

const mapDispatchToProps = dispatch => ({
  onGetCatastrophes: () => dispatch(getCatastrophes()),
	onGetUtilisateurs:() => dispatch(getUtilisateurs())
})


export default  connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(ListReferencePam))