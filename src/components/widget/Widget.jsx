import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import LightModeIcon from "@mui/icons-material/LightMode";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect } from "react";
import { useState } from "react";

const getColorGradient = (parameter, color1, color2) => {
  // Chuyển đổi giá trị parameter thành phần trăm để tính toán màu
  const percent = (parameter - 1) / 99; // Giả sử parameter nằm trong khoảng từ 1 đến 100
  const r = Math.floor(color1[0] + percent * (color2[0] - color1[0]));
  const g = Math.floor(color1[1] + percent * (color2[1] - color1[1]));
  const b = Math.floor(color1[2] + percent * (color2[2] - color1[2]));
  return `rgb(${r},${g},${b})`;
};
const Widget = ({ type, socketClient }) => {
  let data;
  const [temperature, setTemperature] = useState(99);
  const [humidity, setMoisture] = useState(99);
  const [brightness, setBrightness] = useState(999);
  //temporary
  const amount = 37;
  const [randomNumber, setRandomNumber] = useState(getRandomNumber);

  function getRandomNumber() {
    // Sinh số nguyên ngẫu nhiên từ 1 đến 100
    return Math.floor(Math.random() * 50) + 1;
  }

  useEffect(() => {
    // Cập nhật số ngẫu nhiên sau mỗi 3 giây
    const intervalId = setInterval(() => {
      setRandomNumber(getRandomNumber());
    }, 3000);

    // Xóa interval khi component bị unmount
    return () => clearInterval(intervalId);
  }, []); // [] đ

  useEffect(() => {
    // const socket = socketIOClient(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });
    socketClient?.on("sensorData", (data) => {
      // console.log('Widget', data);
      const sensorData = JSON.parse(data);
      console.log(sensorData);
      setTemperature(+sensorData?.temperature);
      setMoisture(+sensorData?.humidity);
      setBrightness(+sensorData?.brightness);
    });
    return () => {
      socketClient?.disconnect();
    };
  }, [socketClient]);
  switch (type) {
    case "temperature":
      data = {
        parameter: temperature,
        title: "Nhiệt độ",
        keyName: "temperature",
        link: "See all users",
        background: `#FFE53B linear-gradient(147deg, #FFE53B ${
          50 - temperature
        }%, #FF2525 74%)`,

        icon: (
          <AcUnitIcon
            className="icon"
            style={{
              color: "crimson",
              background: `#FFE53B linear-gradient(147deg, #FFE53B 0%, #FF2525 74%)`,
            }}
          />
        ),
      };
      break;
    case "humidity":
      data = {
        parameter: humidity,
        title: "Độ ẩm",
        keyName: "humidity",

        background: `#0093E9 linear-gradient(160deg, #0093E9 ${randomNumber}%, #80D0C7 80%)`,

        backgroundColor: getColorGradient(humidity, [0, 128, 0], [0, 255, 0]),
        icon: (
          <WaterDropIcon
            className="icon"
            style={{
              background:
                "#0093E9 linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",

              color: "#0093E9",
            }}
          />
        ),
      };
      break;
    case "lux":
      data = {
        parameter: brightness,
        title: "Ánh sáng",
        keyName: "lux",
        link: "View net earnings",

        background: ` linear-gradient( 135deg, #FDEB71 ${brightness}%, #F8D800 100%)`,

        icon: (
          <LightModeIcon
            className="icon"
            style={{
              background: `linear-gradient( 135deg, #FDEB71 10%, #F8D800 100%)`,
              color: "#FDEB71",
            }}
          />
        ),
      };
      break;
    default:
      // Handle default case
      break;
  }

  return (
    <div className={`widget`} style={{ background: `${data.background}` }}>
      <div className="left">
        <span className="title">{data?.title}</span>
        <span className="counter">
          {data.parameter}
          {data?.keyName == "temperature" && "°C"}
          {data?.keyName == "humidity" && "%"}
          {data?.keyName == "lux" && " lux"}
        </span>
      </div>
      <div className="right">{data?.icon}</div>
    </div>
  );
};

export default Widget;
