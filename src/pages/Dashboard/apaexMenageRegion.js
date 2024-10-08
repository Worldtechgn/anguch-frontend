import React from "react";
import ReactApexChart from "react-apexcharts";

const ApaexMenageRegion = () => {
  const series = [
    {
      name: "Net Profit",
      data: [46, 57, 59, 54, 62, 58, 64, 60, 66],
    },
    {
      name: "Revenue",
      data: [74, 83, 102, 97, 86, 106, 93, 114, 94],
    },
    {
      name: "Free Cash Flow",
      data: [37, 42, 38, 26, 47, 50, 54, 55, 43],
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: !1,
      },
    },
    plotOptions: {
      bar: {
        horizontal: !1,
        columnWidth: '45%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: !1
    },
    stroke: {
      show: !0,
      width: 2,
      colors: ['transparent']
    },
    colors: ['#f1b44c', '#5b73e8', '#34c38f'],
    xaxis: {
      categories: [
        'Boke', 'Conakry', 'Kindia', 'Kankan', 'Faranah', 'Labe', 'Mamou', 'NZérékoré'
      ],
    },
    yaxis: {
      title: {
        text: '$ (thousands)'
      }
    },
    grid: {
      borderColor: '#f1f1f1',
    },
    fill: {
      opacity: 1

    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        }
      }
    }
  };

  return (
    <ReactApexChart options={options} series={series} type="bar" height={350} className="apex-charts" />
  );
};

export default ApaexMenageRegion;
