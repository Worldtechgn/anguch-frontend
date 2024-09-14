import { useFormik } from "formik";
import { MDBIcon } from "mdbreact"
import { useEffect, useState } from "react";
import { 
  Button, 
  Card,
  CardBody,
  Table,
  CardTitle,
  CardFooter,
} from "reactstrap"
import axiosApi from "../../helpers/api_helper";
import Swal from "sweetalert2";

import PropTypes from "prop-types"
import { DownloadExcel } from "react-excel-export";

const DetailsPrixProduit = (props) => {

  const {
    listsPrice,
    initPrixProduit,
    onGetProduit,
    onSetModals,
    onHandleEditProduit,
  } = props

  const [listPrice, setListPrice] = useState([])
  const [supps, setSupps] = useState([])

  useEffect(() => {
    setListPrice(listsPrice)
  }, [listsPrice])  

  const format_date = (date_str) => {
    const month = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
    const dateArr = new Date(date_str)
    return `${month[dateArr.getUTCMonth()]} ${dateArr.getFullYear()}`;
  }

  const handleDeleteProduit = (pdt) => {
    Swal.fire({
      title: 'Suppression du produit',
      text: 'Etes-vous sûre de supprimer ce produit',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OUI'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosApi.delete(`/produit-prefecture/${pdt.id}`).then((res) => {
          initPrixProduit()
          onGetProduit()
          setSupps([])
          setListPrice(listprev => listprev.filter(lp => lp.id !== pdt.id))
        })
      }
    })
  }

  const handleDeleteMultiProduits = (ids) => {
    Swal.fire({
      title: 'Suppression des produits',
      text: 'Etes-vous sûre de supprimer ses produits',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OUI'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosApi.delete(`/produit-prefecture/multi`, {
          params: {ids}
        }).then((res) => {
          initPrixProduit()
          onGetProduit()
          setListPrice(listprev => listprev.filter(lp => !ids.includes(lp.id.toString())))
          setSupps([])
        })
      }
    })
  }

  //    
  const handleSuppChange = e => {
    const { value, checked } = e.target;
    if (checked) {
      setSupps(prev => [...prev, value]);
    } else {
      setSupps(prev => prev.filter(x => x !== value));
    }
  }

  const toggle = () => {
    onSetModals()
    setSupps([])
    setListPrice([])
  }

  return (
    <div className="table-responsive">
      <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
        <CardBody>
          <CardTitle className="mt-2 mb-4">Prefecture: {listPrice[0]?.prefecture?.nom} <br /> Période: {format_date(listPrice[0]?.date)} </CardTitle>
          <Table className="table table-striped mb-0 table-hover" id="table-to-xls">
            <thead>
              <tr>
                <th>#</th>
                <th>Prefecture</th>
                <th>Produit</th>
                <th>prix</th>
                <th>Unité</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listPrice.map((price, index) => <tr key={index}>
                <td>
                  <input key={price.id} id={price.id} className="me-1" type="checkbox" name="supps[]" value={price?.id} onChange={handleSuppChange}/>
                  {index + 1}
                </td>
                <td>{price?.prefecture?.nom}</td>
                <td>{price?.produit?.name}</td>
                <td>{price?.prix}</td>
                <td>{price?.unite}</td>
                <td>
                  <Button className="btn btn-sm btn-danger" onClick={() => { handleDeleteProduit(price) }} ><i className="fa fa-trash"></i> </Button>
                </td>
              </tr>)}
            </tbody>
          </Table>
          <CardFooter className="text-end">
            <div>
              {
                supps.length > 0 && 
                <Button className="btn float-start btn-sm btn-danger" onClick={() => {handleDeleteMultiProduits(supps)}}>supprimer</Button>
              }
            </div>
            <div>
              <DownloadExcel
                data={listPrice.map(el=>{
                  return {
                    Periode: format_date(el.date),
                    Région: el?.prefecture?.region?.nom,
                    Prefecture: el?.prefecture?.nom,
                    Produit: el?.produit?.name,
                    Unité: el?.unite,
                    Prix: el?.prix,
                    PointFocal: `${el?.user?.first_name} - ${el?.user?.last_name}`,
                  }
                })}
                buttonLabel="Exporter"
                style={{ bgColor: "#cfed39" }}
                fileName={`liste-des-produits-${listPrice[0]?.prefecture?.nom}-${listPrice[0]?.date}`}
                className="button_export btn btn-sm btn-success btn-primary"
              > </DownloadExcel>
              <Button className="btn btn-sm ms-2" onClick={() => { onHandleEditProduit() }} style={{ backgroundColor: '#192957' }}>Modifier</Button>
              <Button className="btn btn-sm ms-2" color="danger" onClick={toggle}>
                Fermer
              </Button>
            </div>
          </CardFooter>
        </CardBody>
      </Card>
    </div>
  )
}


DetailsPrixProduit.propTypes = {
  listsPrice: PropTypes.array,
  initPrixProduit: PropTypes.func,
  onGetProduit: PropTypes.func,
  onSetModals: PropTypes.func,
  onHandleEditProduit: PropTypes.func,
}

export default DetailsPrixProduit