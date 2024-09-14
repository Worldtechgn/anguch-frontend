import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const DepenseTrimestresArray = (props) => {

  const {register, useFieldArray, control, depense_trimestres} = props;

  const handleAppend = (value) => {
    append(value);
  };

  const handleRemove = (index) => {
    Swal.fire({
      title: 'Vous êtes sur le point de supprimer ? ',
      text: 'Êtes-vous sûr de continuer ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OUI'
    }).then((result) =>{
      if (result.isConfirmed){
        remove(index);
      }
    })
  };
 
  const { fields, append, remove } = useFieldArray({
    control,
    name: "depense_trimestre",
  });

  return(
    <>
      {fields.map((item,index) => (
        <div className="row mb-3" key={index}>
          <div className={'col-md-5'}>
            <div className="form-group">
              <label>Type de depense</label> 
              <select className="form-control" placeholder="Type de maison"
                {...register(`depense_trimestre[${index}].type`)}
              >
                {depense_trimestres?.map((d,index) =><option key={index} value={d.name}>{d.name}</option>)}
              </select>
            </div>
          </div>
          <div className={'col-md-5'}>
            <div className="form-group">
              <label>Montant</label> 
              <input className="form-control" 
              type={'number'} 
              {...register(`depense_trimestre[${index}].montant`)} 
              placeholder={`Montant`}/>
            </div>
          </div> 
          {fields.length > 1 && <div className={'col-md-2'}>
            <button type="button" className="btn btn-danger mt-4" onClick={() => handleRemove(index)}>
              Supprimer
            </button>
          </div>}
        </div>
      ))}
      <div className="row mt-3">
        <div className="col-md-12">
          <button type="button" className="btn btn-primary btn-sm" style={{ backgroundColor: '#192957' }}
            onClick={() => handleAppend({ type: "", montant: 0})}
          >
            Ajouter
          </button>
        </div>
      </div>
    </>
  );
}

export default DepenseTrimestresArray;