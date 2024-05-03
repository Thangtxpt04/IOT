import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import {
  dataHistoryColumns,
  dataHistoryRows,
  dataSensorColumns,
  dataSensorRows,
} from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "antd";

const Datatable = ({ dataTable }) => {
  const [data, setData] = useState(dataHistoryRows);

  const [columns, setColumns] = useState(dataHistoryColumns);

  useEffect(() => {
    if (dataTable === "isDataSensor") {
      setData(dataSensorRows);
      setColumns(dataSensorColumns);
    } else {
    }
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      {dataTable == "isDataSensor" ? (
        <DataGrid
          className="datagrid"
          rows={dataSensorRows}
          columns={dataSensorColumns}
          pageSize={9}
          rowsPerPageOptions={[9]}
        />
      ) : (
        <DataGrid
          className="datagrid"
          rows={dataHistoryRows}
          columns={dataHistoryColumns}
          pageSize={9}
          rowsPerPageOptions={[9]}
        />
      )}
    </div>
  );
};

export default Datatable;
