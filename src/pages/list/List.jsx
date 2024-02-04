import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { useState } from "react";

const List = ({ data }) => {
  const [dataTable, setDataTable] = useState(data);
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable dataTable={data} />
      </div>
    </div>
  );
};

export default List;
