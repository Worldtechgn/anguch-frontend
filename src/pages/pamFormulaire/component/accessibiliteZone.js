import { useEffect, useState } from "react"
import { Row } from "reactstrap"
import { useForm } from "react-hook-form";

const AccessibiliteZone = (props) => {

  const { accessibilite_moyen } = props
  // let data = {
  //   auto: accessibilite_moyen?.moto === 'Oui' ? 'Oui' : 'Non',
  //   auto: accessibilite_moyen?.auto === 'Oui' ? 'Oui' : 'Non',
  //   avion: accessibilite_moyen?.avion === 'Oui' ? 'Oui' : 'Non'
  // }

  const [motoOui,setMotoOui] = useState(false)
  const [motoNon,setMotoNon] = useState(false)
  
  const [autoOui,setAutoOui] = useState(false)
  const [autoNon,setAutoNon] = useState(false)
  
  const [avionOui,setAvionOui] = useState(false)
  const [avionNon,setAvionNon] = useState(false)

  const { register,setValue, formState: { errors } } = useForm({
    defaultValues:{
      moto: accessibilite_moyen.Moto,
      auto: accessibilite_moyen.Auto,
      avion: accessibilite_moyen.Avion
    },
    mode: "onChange"
  });

  useEffect(() => {
    setValue('moto',accessibilite_moyen.Moto)
    setValue('auto',accessibilite_moyen.Auto)
    setValue('avion',accessibilite_moyen.Avion)

    let $motoOui = document.getElementById('inlineRadioMotoOui')
    let $motoNon = document.getElementById('inlineRadioMotoNon')
    accessibilite_moyen?.Moto === "OUI" ? $motoOui.checked = true : $motoOui.checked = false
    accessibilite_moyen?.Moto === "NON" ? $motoNon.checked = true : $motoNon.checked = false
   
    setMotoOui(accessibilite_moyen?.Moto === "OUI" ? true : false)
    setMotoNon(accessibilite_moyen?.Moto === "NON" ? true : false)

    setAutoOui(accessibilite_moyen?.Auto === "OUI" ? true : false)
    setAutoNon(accessibilite_moyen?.Auto === "NON" ? true : false)

    setAvionOui(accessibilite_moyen?.Avion === "OUI" ? true : false)
    setAvionNon(accessibilite_moyen?.Avion === "NON" ? true : false)

  }, [setValue,accessibilite_moyen])
 
  return (
    <>
      <Row>
        <div className={"form-group col-md-12"}>
          <label>Sélectionner</label>
          <div className="form-check">
            <p className="form-check-label" htmlFor="motoCheckout"><strong>Moto:</strong></p>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="moto" id="inlineRadioMotoOui" value="OUI" defaultChecked={motoOui} {...register('moto')} />
              <label className="form-check-label" htmlFor="inlineRadioMotoOui">OUI</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="moto" id="inlineRadioMotoNon" value="NON" defaultChecked={motoNon} {...register('moto')} />
              <label className="form-check-label" htmlFor="inlineRadioMotoNon">NON</label>
            </div>
          </div>
          <hr/>
          <div className="form-check">
            <p className="form-check-label" htmlFor="motoCheckout"><strong>Auto:</strong></p>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="auto" id="inlineRadioAutoOui" value="OUI" defaultChecked={autoOui} {...register('auto')} />
              <label className="form-check-label" htmlFor="inlineRadioAutoOui">OUI</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="auto" id="inlineRadioAutoNon" value="NON" defaultChecked={autoNon} {...register('auto')} />
              <label className="form-check-label" htmlFor="inlineRadioAutoNon">NON</label>
            </div>
          </div>
          <hr/>
          <div className="form-check">
            <p className="form-check-label" htmlFor="motoCheckout"><strong>Avion:</strong></p>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="auto" id="inlineRadioAvidnOui" value="OUI" defaultChecked={avionOui} {...register('avion')} />
              <label className="form-check-label" htmlFor="inlineRadioAvidnOui">OUI</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="auto" id="inlineRadioAvionNon" value="NON" defaultChecked={avionNon} {...register('avion')}/>
              <label className="form-check-label" htmlFor="inlineRadioAvionNon">NON</label>
            </div>
          </div>
        </div>
      </Row>
    </>
  )

}

export default AccessibiliteZone