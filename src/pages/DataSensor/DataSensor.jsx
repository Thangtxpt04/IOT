import React from "react";
import classNames from "classnames/bind";
import { useState, useEffect, useCallback } from "react";
import { Pagination, message } from "antd";

import type { TableProps } from "antd";
import styles from "./DataSensor.module.scss";
import { DatePicker, Space, Select, Input, Table, Tag, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import sensorServices from "../../services/sensorServices";

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
  },
  {
    key: "temperature",

    title: "Nhiệt độ (°C)",
    dataIndex: "temperature",
  },
  {
    key: "humidity",

    title: "Độ ẩm (%)",
    dataIndex: "humidity",
  },
  {
    key: "brightness",
    title: "Ánh sáng (Lux)",
    dataIndex: "brightness",
  },
  {
    key: "createdAt",

    title: "Ngày tạo",
    dataIndex: "createdAt",
  },
];

function DataSensor() {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [sensorData, setSensorData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    orderBy: "createdAt",
    direction: "DESC",
    searchOperator: "",
  });
  // Other filter
  const [deleteList, setDeleteList] = useState([]);
  const [search, setSearch] = useState({
    searchField: "",
    searchValue: "",
    searchOperator: "",
  });

  useEffect(() => {
    const fetchSensorData = async () => {
      console.log(filters);
      let response;
      try {
        setLoading(true);
        response = await sensorServices.getSensorData({
          params: filters,
          allowLog: true,
        });
        const dataSensor = response.data.map((dataItem, index) => ({
          ...dataItem,
          key: index,
        }));
        console.log(dataSensor);
        setSensorData(dataSensor);
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
  };
  return (
    <div className={cx("container")}>
      <div
        style={{ display: "flex", justifyContent: "space-between", flex: 1 }}
      >
        <h1 style={{ width: 400 }}>Sensor history</h1>
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
              Sắp xếp:
            </span>
            <Select
              showSearch
              allowClear
              style={{
                width: 200,
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
                  value: "temperature",
                  label: "Nhiệt độ",
                },
                {
                  value: "humidity",
                  label: "Độ ẩm",
                },
                {
                  value: "brightness",
                  label: "Ánh sáng",
                },
                {
                  value: "4",
                  label: "Ngày tạo",
                },
              ]}
            />
            <Select
              showSearch
              allowClear
              style={{
                width: 120,
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

          {/* Search with value */}
          <div style={{ display: "flex", flexDirection: "row", margin: 12 }}>
            <span style={{ margin: 8 }}>Tìm kiếm với giá trị:</span>
            <Space
              direction="vertical"
              size={12}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Select
                showSearch
                allowClear
                style={{
                  width: 200,
                }}
                placeholder="Chọn thuộc tính"
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
                    value: "temperature",
                    label: "Nhiệt độ",
                  },
                  {
                    value: "humidity",
                    label: "Độ ẩm",
                  },
                  {
                    value: "brightness",
                    label: "Ánh sáng",
                  },
                  {
                    value: "4",
                    label: "Ngày tạo",
                  },
                  {
                    label: "Tất cả",
                    value: "all",
                  },
                ]}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, searchField: value }))
                }
              />
              <Select
                showSearch
                allowClear
                style={{
                  width: 150,
                }}
                placeholder="Chọn điều kiện với giá trị"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, searchOperator: value }))
                }
                options={[
                  {
                    value: "greater",
                    label: "Lớn hơn",
                  },
                  {
                    value: "less",
                    label: "Nhỏ hơn",
                  },
                  {
                    value: "equal",
                    label: "Bằng",
                  },
                  {
                    value: "valueRange",
                    label: "Trong khoảng",
                  },
                ]}
              />
              <Space.Compact>
                <Input
                  style={{ width: "100px" }}
                  onChange={(value) =>
                    setFilters((prev) => ({
                      ...prev,
                      searchValue: value.target.value,
                    }))
                  }
                  placeholder="Nhập giá trị"
                />
                {filters.searchOperator == "valueRange" && (
                  <Input
                    style={{ width: "100px" }}
                    placeholder="Nhập giá trị"
                    onChange={(event) => onHandleFilterValueRange(event)}
                  />
                )}
              </Space.Compact>
            </Space>
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
        <Table pagination={false} columns={columns} dataSource={sensorData} />
        <Pagination
          showQuickJumper
          defaultCurrent={pagination.currentPage}
          total={pagination.total}
          onChange={onHandleChangePagination}
        />
      </div>
    </div>
  );
}

export default DataSensor;
