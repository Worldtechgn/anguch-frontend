import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core"
import { Controller } from "react-hook-form"

const RadioButtonComponent = ({control}) => {

  return (
    <>
      <Controller
        render={({ field }) => (
          <RadioGroup aria-label="naissance_suvenue" {...field}>
            <FormControlLabel
              value="OUI"
              control={<Radio />}
              label="OUI"
            />
            <FormControlLabel value="NON" control={<Radio />} label="NON" />
          </RadioGroup>
        )}
        name="naissance_suvenue"
        control={control}
      />
    </>
  )
}

export default RadioButtonComponent