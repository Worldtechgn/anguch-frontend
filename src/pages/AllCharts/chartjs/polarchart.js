import React from "react"
import { Polar } from "react-chartjs-2"

const PolarChart = props => {
  const deplaces = props.data;
  const data = {
    labels: deplaces?.map((deplace, index) => {
      return deplace.city
    }),
    datasets: [
      {
        data: deplaces?.map((deplace, index) => {
          return deplace.value
        }),
        backgroundColor: ["#f46a6a", "#34c38f", "#f1b44c", "#556ee6"],
        label: "Deplacé(s)", // for legend
        hoverBorderColor: "#fff",
      }
    ],
  }

  return <Polar width={474} height={300} data={data} />
}

export default PolarChart
