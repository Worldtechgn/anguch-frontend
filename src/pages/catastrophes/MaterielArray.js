import Swal from "sweetalert2";

const MaterialArray = (props) => {

  const {register, useFieldArray, control, materiels } = props;

  const handleAppend = (value) => {
    append(value);
  };

  const handleRemove = (index) => {
    Swal.fire({
      title: 'Vous êtes sur le point de supprimer cette denre',
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

  const onChange = (e) => {
    console.log(e.target.value);
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: "material",
  });

  return(
    <>
      {fields.map((option, index) => (
        <div className="row mb-3" key={index}>
          <div className={'col-md-6'}>
            <div className="form-group input-group-sm">
              <span style={{'display':'none'}}>label {option.nom}</span> 
              <select className="form-control" 
                onChange={onChange}
                defaultValue={option.nom}
                {...register(`material[${index}].nom`)}>
                <option>--Sélectionner--</option>
                {materiels.map((d,index) =><option key={index} value={d.name}>{d.name}</option>)}
              </select>
            </div>
          </div>
          <div className={'col-md-5'}>
            <div className="form-group input-group-sm">
              <input
                className="form-control"
                type="number"
                name={`material.${index}.quantite`}
                placeholder="Quantite"
                min={0}
                {...register(`material.${index}.quantite`)}
              />
            </div>
          </div>
          {fields.length > 1 && <div className={'col-md-1'}>
            <button type="button" className="btn btn-danger btn-sm" onClick={() => handleRemove(index)}>
              Supprimer
            </button>
          </div>}
        </div>
      ))}
      <div className="row mt-3">
        <div className="col-md-12">
          <button type="button" className="btn btn-primary btn-sm" style={{ backgroundColor: '#192957' }}
            onClick={() => handleAppend({ nom: "", quantite: ""})}
          >
            Ajouter
          </button>
        </div>
      </div>
    </>
  );
}

export default MaterialArray