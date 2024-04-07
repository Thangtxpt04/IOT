import { useContext } from "react";
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

function Chart() {
  const labels = ["10:00:01", "10:00:02", "10:00:03", "10:00:04", "10:00:05"];
  const data = {
    labels,
    datasets: [
      {
        label: "Nhiệt độ",
        data: labels.map(() => Math.ceil(Math.random() * 101)),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 134, 0.5)",
      },
      {
        label: "Độ ẩm",
        data: labels.map(() => Math.ceil(Math.random() * 101)),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(57, 162, 235, 0.5)",
      },
      {
        label: "Ánh sáng",
        data: labels.map(() => Math.ceil(Math.random() * 101)),
        borderColor: "rgb(242, 166, 84)",
        backgroundColor: "rgba(242, 166, 82, 0.5)",
      },
    ],
  };
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

  return (
    <div className={"wrapper"}>
      <Line className={"chart"} data={data} />
    </div>
  );
}

export default Chart;
