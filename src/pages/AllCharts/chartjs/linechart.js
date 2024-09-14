import React from "react"
import { Line } from "react-chartjs-2"

const LineChart = props => {
  const types = props.data;
  const data = {
    labels: types?.map((type, index) => {
      return type.city
    }),
    datasets: [
      {
        label: "Analyse catastrophe par type",
        fill: true,
        lineTension: 0.5,
        backgroundColor: "rgba(91, 140, 232, 0.2)",
        borderColor: "#5b73e8",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "#5b73e8",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#5b73e8",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: types?.map((type, index) => {
          return type.value
        }),
      }
    ]
  }
  var lineOpts = {
    plugins: {
      datalabels: {
        display: true,
        align: 'center',
        anchor: 'center'
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          // max: 100,
          min: 0,
          stepSize: 10
        }
      }]
    },
    legend: {display: true}
  };

  return <Line width={474} height={300} data={data} options={lineOpts} />
}

export default LineChart
