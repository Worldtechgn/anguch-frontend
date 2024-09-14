import './style/style.scss';
import { withRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import { MDBIcon } from 'mdbreact';
import { saveAs } from 'file-saver';
import { getEnqueteDeplaceInternes, getEnqueteDeplaceInternesDownload } from '../../helpers/backend_enquete_type_data';
import PaginationBackend from './components/paginationBackend';
import { DateRangePicker } from 'rsuite';
import permissionHelper from '../../common/permission_helper';

const ListeEnqueteDeplaceInterne = props => {
	const { history } = props;
	
	const [enqueteDeplaceInternes,setEnqueteDeplaceInterne] = useState([]);
	const [meta, setMeta] = useState({})

	const pageNumberLimit = 10;
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(10);
  const [minPageLimit, setMinPageLimit] = useState(0);

	function initEnqueteDeplaceInterne() {
		getEnqueteDeplaceInternes(currentPage, pageNumberLimit).then(response =>{
			setMeta(response.meta)
			setEnqueteDeplaceInterne(response.items)
			setLoading(false)
		})
	}
	useEffect(() => {
		initEnqueteDeplaceInterne()
	}, [currentPage])

	

	const onPageChange= (pageNumber)=>{
    setCurrentPage(pageNumber);
  }

  const onPrevClick = ()=>{
		if((currentPage - 1) % pageNumberLimit === 0){
			setMaxPageLimit(maxPageLimit - pageNumberLimit);
			setMinPageLimit(minPageLimit - pageNumberLimit);
		}
		setCurrentPage(prev => prev-1);
  }
  
  const onNextClick = ()=>{
		if(currentPage + 1 > maxPageLimit){
				setMaxPageLimit(maxPageLimit + pageNumberLimit);
				setMinPageLimit(minPageLimit + pageNumberLimit);
		}
		setCurrentPage(prev => prev + 1);
  }

  const paginationAttributes = {
    currentPage,
    maxPageLimit,
    minPageLimit,
    enqueteDeplaceInternes: enqueteDeplaceInternes,
		meta: meta
  };

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
  

	const[search,setSearch] = useState("")
	const handleSearch = (event) => {
		if (event.keyCode === 13) {
			setSearch(event.target.value)
			setLoading(true)
			getEnqueteDeplaceInternes(currentPage,pageNumberLimit,event.target.value).then(response =>{
				setMeta(response.meta)
				setEnqueteDeplaceInterne(response.items)
				setLoading(false)
			})
		}
	}

	const onChangeByDate = (event) => {
		
		if(event){
			let firstDate = dateFull(new Date(event[0]));
			let lastDate = dateFull(new Date(event[1]));
			const date_all = `${firstDate};${lastDate}`;
						
			setSearch(date_all)
			setLoading(true)
			getEnqueteDeplaceInternes(currentPage,pageNumberLimit,date_all).then(response =>{
				setMeta(response.meta)
				setEnqueteDeplaceInterne(response.items)
				setLoading(false)
			})
		}
	}

	const[download, setDownload] = useState(false)
	const handleDownload = () => {
		setDownload(true)
		getEnqueteDeplaceInternesDownload(search).then( async (response) => {
			const filename = "enquete_deplace_internes.xlsx"
			saveAs(new Blob([response]), filename);
			setDownload(false)
		}).catch(err=> console.log(err))
	}

	const onRefreshData = () => {
		initEnqueteDeplaceInterne()
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
									<Col className="col-lg-4">
										{permissionHelper('enqueteDeplaceInterne','add_enqueteDeplaceInterne') && <Button style={{ backgroundColor: '#192957' }} onClick={() => {
											history.push('/souapiti/add')
										}} className="waves-effect waves-light">
											<i className="uil uil-plus me-2"></i> Ajouter une enquếte
										</Button>}{" "}
										<Button color="secondary" onClick={handleDownload} className="waves-effect waves-light">
											<i className="fa fa-download me-2"></i> {download ? 'Téléchargement...':'Exporter'}
										</Button>{" "}
									</Col>
									<Col className='col-lg-4'>
										<div className="card-tools d-flex align-items-center col-lg-2">
											<div className="form-group form-group-sm">
												<DateRangePicker onChange={onChangeByDate} />
											</div>
										</div>
									</Col>
									<Col className='col-lg-4'>
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
									</Col>
								</Row>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<Row>
					<Col>
						{!loading ?
							<PaginationBackend {...paginationAttributes}
								enqueteDeplaceInternes={enqueteDeplaceInternes}
								onPrevClick={onPrevClick} 
								onNextClick={onNextClick}
								onPageChange={onPageChange}
								onRefreshData={onRefreshData}
								/> 
							: 
							<div>
								{"Chargement..."}
							</div>
						}
					</Col>
				</Row>
      </div>
    </div>
		</>
	);
};
export default withRouter(ListeEnqueteDeplaceInterne)