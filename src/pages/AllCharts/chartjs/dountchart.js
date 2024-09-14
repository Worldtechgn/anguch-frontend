import React from "react"
import { Doughnut } from "react-chartjs-2"

const DountChart = props => {
  const refugies = props.data;
  const data = {
    labels: refugies?.map((refugie, index) => {
      return refugie.city
    }),
    datasets: [
      {
        data: refugies?.map((refugie, index) => {
          return refugie.value
        }),
        backgroundColor: ["#556ee6", "#ebeff2"],
        hoverBackgroundColor: ["#556ee6", "#ebeff2"],
        hoverBorderColor: "#fff",
      },
    ],
  }

  return <Doughnut width={474} height={260} data={data} />
}

export default DountChart
