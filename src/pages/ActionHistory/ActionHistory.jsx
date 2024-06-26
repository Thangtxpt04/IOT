import React from "react";
import classNames from "classnames/bind";
import { useState, useEffect, useCallback } from "react";
import { Pagination, Tooltip, message } from "antd";

import type { TableProps } from "antd";
import styles from "./ActionHistory.module.scss";
import { DatePicker, Space, Select, Input, Table, Tag, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import sensorServices from "../../services/sensorServices";
import deviceServices from "../../services/deviceServices";

const cx = classNames.bind(styles);
const { RangePicker } = DatePicker;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
const columns: any[] = [
  {
    key: "id",
    title: "STT",
    dataIndex: "id",
    width: "100px",
  },
  {
    key: "action",
    title: "Action",
    dataIndex: "action",
    render: (_, { action }) => (
      <>{<Tag color={action === "ON" ? "green" : "red"}>{action}</Tag>}</>
    ),
  },
  {
    key: "createdAt",
    title: "Created At",
    dataIndex: "createdAt",
  },
  {
    key: "device",
    title: "Device Name",
    dataIndex: "device",
    render: (_, { device }) => <>{<p>{device.name}</p>}</>,
  },
];

function ActionHistory() {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [deviceList, setDeviceList] = useState([]);
  const [actionData, setActionData] = useState([]);

  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    orderBy: "createdAt",
    sortOrder: "DESC",
    searchOperator: "",
  });
  // Other filter
  const [deleteList, setDeleteList] = useState([]);
  const [search, setSearch] = useState({
    searchField: "",
    searchValue: "",
    searchOperator: "",
  });

  const getDeviceInfo = (deviceId, deviceList) => {
    let infoText = "Unknown";
    deviceList.forEach((deviceItem) => {
      const { id, name, description } = deviceItem;
      if (id === deviceId) {
        infoText = `Name: ${name} | ${description}`;
        return;
      }
    });
    return infoText;
  };

  useEffect(() => {
    const fetchSensorData = async () => {
      let response;
      try {
        setLoading(true);
        response = await deviceServices.getDataAction({
          params: filters,
          allowLog: true,
        });
        const dataAction = response.data.map((dataItem, index) => ({
          ...dataItem,
          key: dataItem.id,
          deviceId: (
            <Tooltip
              title={getDeviceInfo(dataItem.deviceId, deviceList)}
              placement="rightTop"
            >
              <>{dataItem.deviceId}</>
            </Tooltip>
          ),
        }));
        setActionData(dataAction);
        setPagination(response?.meta?.pagination);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSensorData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);

  const onHandleFilterValueRange = (event) => {
    // Kiểm tra xem chuỗi có chứa dấu phẩy không

    let filterValueRange = "";
    const commaIndex = filters.searchValue.indexOf(",");
    // Nếu có dấu phẩy, thì lấy phần trước dấu phẩy và thêm 'ef' vào sau
    if (commaIndex !== -1) {
      filterValueRange =
        filters.searchValue.substring(0, commaIndex) + "," + event.target.value;
    }
    // Nếu không có dấu phẩy, chỉ cần thêm ',ef' vào sau chuỗi
    else filterValueRange = filters.searchValue + "," + event.target.value;
    setFilters((prev) => ({
      ...prev,
      searchValue: filterValueRange,
    }));
  };

  const onHandleChangePagination = (event) => {
    setFilters((prev) => ({
      ...prev,
      pageNumber: event,
    }));
    console.log(event);
  };

  const onShowSizeChange = (current, pageSize) => {
    setFilters((prev) => ({
      ...prev,
      pageNumber: current,
      pageSize: pageSize,
    }));
  };
  return (
    <div className={cx("container")}>
      <div
        style={{ display: "flex", justifyContent: "space-between", flex: 1 }}
      >
        <h1 style={{ width: 400 }}>Action history</h1>
        <div
          style={{
            display: "flex",
            // justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Filter Date Ranger */}
          <div style={{ marginRight: 12 }}>
            <span style={{ marginRight: "6px" }}>Lọc ngày:</span>
            <Space direction="vertical" size={12}>
              <RangePicker
                placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                onChange={(_, info) =>
                  setFilters((prev) => ({
                    ...prev,
                    startDate: info[0],
                    endDate: info[1],
                  }))
                }
              />
            </Space>
          </div>

          {/* Lọc theo trạng thái */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <span
              style={{
                marginRight: "4px",
              }}
            >
              Lọc theo trạng thái:
            </span>
            <Select
              showSearch
              allowClear
              style={{
                width: 200,
              }}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, action: value }))
              }
              placeholder="Chọn"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[
                {
                  value: "ON",
                  label: "ON",
                },
                {
                  value: "OFF",
                  label: "OFF",
                },
              ]}
            />
          </div>
          <br></br>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <span
              style={{
                marginLeft: "4px",
              }}
            >
              Sắp xếp:
            </span>
            <Select
              showSearch
              allowClear
              style={{
                width: 200,
                marginLeft: 4,
              }}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, orderBy: value }))
              }
              placeholder="Chọn"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[
                {
                  value: "createdAt",
                  label: "Ngày tạo",
                },
              ]}
            />
            <Select
              showSearch
              allowClear
              style={{
                width: 120,
                marginRight: 4,
              }}
              placeholder="Thứ tự"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[
                {
                  value: "DESC",
                  label: "Giảm dần",
                },
                {
                  value: "ASC",
                  label: "Tăng dần",
                },
              ]}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, sortOrder: value }))
              }
            />
          </div>
        </div>
        <div style={{ justifySelf: "center", alignContent: "center" }}>
          <Button type="primary" size={"middle"}>
            Tìm kiếm
            <SearchOutlined />
          </Button>
        </div>
      </div>
      <div>
        <Table pagination={false} columns={columns} dataSource={actionData} />
        <Pagination
          showQuickJumper
          defaultCurrent={pagination.currentPage}
          total={pagination.total}
          onChange={onHandleChangePagination}
          onShowSizeChange={onShowSizeChange}
        />
      </div>
    </div>
  );
}

export default ActionHistory;
