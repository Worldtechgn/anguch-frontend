import React from "react"
import { Pie } from "react-chartjs-2"

const PieChart = props => {
  const migrants = props.data;
  const data = {
    labels: migrants?.map((migrant, index) => {
      return migrant.city
    }),
    datasets: [
      {
        data: migrants?.map((migrant, index) => {
          return migrant.value
        }),
        backgroundColor: ["#34c38f", "#ebeff2"],
        hoverBackgroundColor: ["#34c38f", "#ebeff2"],
        hoverBorderColor: "#fff",
      },
    ],
  }

  return <Pie width={474} height={260} data={data} />
}

export default PieChart
