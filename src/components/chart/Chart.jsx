import { useContext, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import * as timeHelper from "../../utils/time";
import "./chart.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Chart({ socketClient }) {
  const [chartLabel, setChartLabel] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [chartData, setChartData] = useState({
    labels: chartLabel,
    datasets: [
      {
        fill: true,
        label: "Temperature",
        data:
          currentData.length > 0
            ? currentData?.map((dataItem) => dataItem.temperature)
            : [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        fill: true,
        label: "humidity",
        data:
          currentData.length > 0
            ? currentData?.map((dataItem) => dataItem.humidity)
            : [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        fill: false,
        label: "Brightness",
        data:
          currentData.length > 0
            ? currentData?.map((dataItem) => dataItem.brightness)
            : [],
        borderColor: "rgb(242, 166, 84)",
        backgroundColor: "rgba(242, 166, 84, 0.5)",
      },
    ],
  });

  useEffect(() => {
    const dataset = {
      labels: chartLabel,
      datasets: [
        {
          fill: true,
          label: "Temperature",
          data:
            currentData.length > 0
              ? currentData?.map((dataItem) => +dataItem.temperature)
              : [],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          fill: true,
          label: "Moisture",
          data:
            currentData.length > 0
              ? currentData?.map((dataItem) => +dataItem.humidity)
              : [],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
        {
          fill: false,
          label: "Brightness",
          data:
            currentData.length > 0
              ? currentData?.map((dataItem) => +dataItem.brightness)
              : [],
          borderColor: "rgb(242, 166, 84)",
          backgroundColor: "rgba(242, 166, 84, 0.5)",
        },
      ],
    };
    setChartData(dataset);
  }, [chartLabel, currentData]);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "MCU ESP8266",
      },
    },
  };

  useEffect(() => {
    socketClient?.on("sensorData", (data) => {
      const sensorData = JSON.parse(data);

      setChartLabel((prev) => [
        ...prev,
        timeHelper.formatToCustomFormat(sensorData.createdAt, "hh:mm:ss"),
      ]);
      setCurrentData((prev) => {
        const { createdAt, ...otherData } = sensorData;
        return [...prev, otherData];
      });
    });
  }, [socketClient]);

  return (
    <div className={"wrapper"}>
      <Line className={"chart"} data={chartData} />
    </div>
  );
}

export default Chart;
