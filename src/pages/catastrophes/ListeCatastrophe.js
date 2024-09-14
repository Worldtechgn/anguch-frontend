import './style/style.scss';
import { withRouter } from 'react-router-dom';
import { getCatastrophesDownloadBackend, getCatastrophesWithPaginateBackend } from '../../helpers/backend_catastrophe';
import { useEffect, useState } from 'react';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import { MDBIcon } from 'mdbreact';
import { saveAs } from 'file-saver';
import permissionHelper from '../../common/permission_helper';
import { RenderDataCatastrophe } from './components/renderDataCatastrophe';
import dayjs from "dayjs";

const ListeCatastrophe = props => {
	const { history } = props;
	
	const [catastrophes,setCatastrophes] = useState([]);
	const [meta, setMeta] = useState({})

	const pageNumberLimit = 10;
  const [loading, setLoading] = useState(true);

	function initCatastrophe() {
		getCatastrophesWithPaginateBackend(1, pageNumberLimit).then(response =>{
			setCatastrophes(response)
			setLoading(false)
		})
	}
	useEffect(() => {
		initCatastrophe()
	}, [])

	const[search,setSearch] = useState("")
	const handleSearch = (event) => {
		setSearch(event.target.value)
	}

	const[download, setDownload] = useState(false)
	const handleDownload = () => {
		setDownload(true)
		getCatastrophesDownloadBackend(search).then( async (response) => {
			const filename = "catastrophes.xlsx"
			saveAs(new Blob([response]), filename);
			setDownload(false)
		}).catch(err=> console.log(err))
	}

	const onRefreshData = () => {
		initCatastrophe()
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
									<Col className="col-5">
										{permissionHelper('catastrophe','add_catastrophe') && <Button style={{ backgroundColor: '#192957' }} onClick={() => {
											history.push('/add-catastrophe')
										}} className="waves-effect waves-light">
											<i className="uil uil-plus me-2"></i> Ajouter un catastrophe
										</Button>}{" "}
										<Button color="secondary" onClick={handleDownload} className="waves-effect waves-light">
											<i className="fa fa-download me-2"></i> {download ? 'Téléchargement...':'Exporter'}
										</Button>{" "}
									</Col>
									<div className="card-tools d-flex align-items-center col-lg-7">
										<div className="input-group input-group-sm">
											<input className="form-control my-0 py-1 float-end" type="text" 
												onKeyDown={handleSearch}
												placeholder="Recherche"
												aria-label="Recherche" />
											<div className="input-group-prepend">
												<span className="input-group-text purple lighten-2" id="basic-text1">
													<MDBIcon className="text-write" icon="search" />
												</span>
											</div>
										</div>
									</div>
								</Row>
							</CardBody>
						</Card>
					</Col>
					{!loading ?
							<RenderDataCatastrophe 
								catastrophes = {catastrophes.filter(cat => {
									return dayjs(cat.date).format("MMM-YYYY").toLowerCase().includes(search.toLowerCase())
									|| cat?.region_nom.toLowerCase().includes(search.toLowerCase())
									|| cat?.prefecture_nom.toLowerCase().includes(search.toLowerCase())
								})}
								onRefreshData = {onRefreshData}
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
	);
};
export default withRouter(ListeCatastrophe)