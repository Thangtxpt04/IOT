import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { useState } from "react";
import DataSensor from "../DataSensor/DataSensor";
import ActionHistory from "../ActionHistory/ActionHistory";

const List = ({ name }) => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {/* <Datatable /> */}
        {name == "data-sensor" ? <DataSensor /> : <ActionHistory />}
      </div>
    </div>
  );
};

export default List;
