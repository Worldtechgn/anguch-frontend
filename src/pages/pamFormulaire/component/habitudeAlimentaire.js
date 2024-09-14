import { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import Swal from "sweetalert2";

export const HabitudeAlimentaireComponent = (props) => {
    const { habitude_alimentaires} = props;


    const [arr_habitudes, setArr_habitudes] = useState([])

    useEffect(()=>{
      setArr_habitudes(habitude_alimentaires)
    },[habitude_alimentaires])

    const handleRemove = (index) =>{
      Swal.fire({
        title: 'Suppression du produit',
        text: 'Etes-vous sûre de supprimer ce produit',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'NON',
        confirmButtonText: 'OUI'
      }).then((result)=>{
        if(result.isConfirmed){
          arr_habitudes.splice(index, 1);
          setArr_habitudes(arr_habitudes)
        }
      })
     
    }
    return (
        <Table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Nom aliment</th>
            <th>Grossiste</th>
            <th>Capacite</th>
            <th>Magasin</th>
            <th>Flotte</th>
            <th>Raison</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {arr_habitudes.map((ha,index) => <tr key={index}>
              <td>{index+1}</td>
              <td>{ha.aliment}</td>
              <td>{ha.grossiste}</td>
              <td>{ha.capacite}</td>
              <td>{ha.magasin}</td>
              <td>{ha.flotte}</td>
              <td>{ha.raison}</td>
              <td>
                <Button type="button" className={'btn btn-sm btn-danger'} onClick={() =>handleRemove(index)}>Supp</Button>
              </td>
            </tr>)}
          
        </tbody>
      </Table>
    );
  };
  