import { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import Swal from "sweetalert2";

export const DisponibiliteComponent = (props) => {
    const {disponibilites} = props;

    const [arr_disponibilite, setArr_disponibilite] = useState([])

    useEffect(()=>{
      setArr_disponibilite(disponibilites)
    },[disponibilites])

    const handleRemove = (index) =>{
      Swal.fire({
        title: 'Suppression',
        text: 'Etes-vous sûre de supprimer ce produit',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OUI'
      }).then((result)=>{
        if(result.isConfirmed){
          arr_disponibilite.splice(index, 1);
          setArr_disponibilite(arr_disponibilite)
        }
      })
     
    }
    return (
        <Table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Produit</th>
            <th>Disponibilité</th>
            <th>Raison</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {arr_disponibilite.map((disp,index) => <tr key={index}>
              <td>{index + 1}</td>
              <td>{disp.aliment}</td>
              <td>{disp.disponibilite}</td>
              <td>{disp.raison}</td>
              <td>
                <Button type="button" className={'btn btn-sm btn-danger'} onClick={()=>handleRemove(index)}>Supp</Button>
              </td>
            </tr>)}
          
        </tbody>
      </Table>
    );
  };
  