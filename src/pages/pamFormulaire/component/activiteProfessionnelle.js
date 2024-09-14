import { useEffect, useState } from 'react';
import Select from 'react-select';
import { getActiviteProfessionnelles } from '../../../helpers/backend_type_data_catastrophe';


const ActiviteProfessionnelle = (props) => {


  const [activite_professionnelles,setActivite_professionnelle] = useState([])

  const initProfessionnelles = () => {
    getActiviteProfessionnelles().then(activites => setActivite_professionnelle(
      activites.map(act => ({label: act.name, value: act.name }))
    ));
  }

  const { idReferenceMemo, activiteProfessionnelles, onHandleActiviteProfessionnelle } = props

  const [activiteProfessionnelleOptions, setActiviteProfessionnelleOption] = useState([])

  useEffect(() => {
    let _activites = activiteProfessionnelles.map(e=>{return {label:e, value:e}})    
    setActiviteProfessionnelleOption(_activites)
    initProfessionnelles();
  }, [activiteProfessionnelles])

  const handleChangeActiviteProfessionnelle = (event) => {
    setActiviteProfessionnelleOption(event)
    onHandleActiviteProfessionnelle(event.map(e=>e.value))
  }

  return (
    <>
      <div className={"form-group"} style={{ marginBottom: '10px' }}>
        <label>Sélectionner</label>
        {idReferenceMemo ?
          <Select name="activite_professionnel"
            placeholder="Selectionne activite"
            isMulti={true}
            className="select"
            isClearable={false}
            isSearchable={true}
            isDisabled={false}
            isLoading={false}
            isRtl={false}
            closeMenuOnSelect={false}
            onChange={handleChangeActiviteProfessionnelle}
            value={activiteProfessionnelleOptions}
            selected={activiteProfessionnelleOptions}
            options={activite_professionnelles}
          >
          </Select> :
          <Select name="activite_professionnel"
            placeholder="Selectionne activite"
            isMulti={true}
            className="select"
            isClearable={true}
            isSearchable={true}
            isDisabled={false}
            isLoading={false}
            isRtl={false}
            closeMenuOnSelect={false}
            selected={activiteProfessionnelleOptions}
            onChange={handleChangeActiviteProfessionnelle}
            options={activite_professionnelles}
          >
          </Select>
        }
      </div>
    </>
  )

}

export default ActiviteProfessionnelle