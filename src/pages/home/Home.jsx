import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import io from "socket.io-client";

import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useEffect, useState } from "react";

const Home = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketClient = io("http://localhost:4000", {
      transports: ["websocket", "polling", "flashsocket"],
    });
    console.log(socketClient);
    setSocket(socketClient);
    return () => {
      socketClient.disconnect();
    };
  }, []);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="temperature" socketClient={socket} />
          <Widget type="humidity" socketClient={socket} />
          <Widget type="lux" socketClient={socket} />
        </div>
        <div className="charts">
          <div className="chart">
            <Chart socketClient={socket} />
          </div>
          <div className="devide">
            <Featured />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
