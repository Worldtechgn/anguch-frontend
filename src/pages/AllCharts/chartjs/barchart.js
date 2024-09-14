import { Bar } from "react-chartjs-2"

const BarChart = props => {
  const incidents = props.data;
  const data = {
    labels: incidents?.map((incident, index) => {
      return incident.city
    }),
    datasets: [
      {
        label: "Analyse Catastrophe",
        backgroundColor: "rgba(52, 195, 143, 0.8)",
        borderColor: "rgba(52, 195, 143, 0.8)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(52, 195, 143, 0.9)",
        hoverBorderColor: "rgba(52, 195, 143, 0.9)",
        data: incidents?.map((incident, index) => {
          return incident.value
        }),
      },
    ],
  }

  const option = {
    plugins: {
      datalabels: {
        display: true,
        align: 'center',
        anchor: 'center'
      }
    },
    scales: {
      xAxes: [
        {
          barPercentage: 0.2
        }],
      yAxes: [{

        id: 'y-axis-label',
        ticks: {
          min: 0,
          stepSize: 20,
        }
      }],
    },
    tooltips: {
      callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.yLabel;
          }
      }
    },
    // plugins: {
    //   datalabels: {
    //     anchor: 'end',
    //     align: 'top',
    //     formatter: Math.round,
    //     font: {
    //       weight: 'bold',
    //       size: 16
    //     }
    //   }
    // }
  }

  return <Bar width={474} height={300} data={data} options={option} />
}

export default BarChart
