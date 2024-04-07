export const dataSensorColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "temp",
    headerName: "Temporary",
    width: 230,
  },
  {
    field: "humidity",
    headerName: "Humidity",
    width: 230,
  },

  {
    field: "light",
    headerName: "Light",
    width: 100,
  },
  {
    field: "time",
    headerName: "Time",
    width: 160,
    renderCell: (params) => {
      const inputString = params.row.time;
      const inputDate = new Date(inputString);

      // Lấy các thành phần của thời gian
      const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
      const day = String(inputDate.getDate()).padStart(2, "0");
      const year = inputDate.getFullYear();
      const hours = String(inputDate.getHours()).padStart(2, "0");
      const minutes = String(inputDate.getMinutes()).padStart(2, "0");

      // Tạo chuỗi theo định dạng MM/dd/yyyy hh:mm a
      const formattedDate = `${month}/${day}/${year} ${hours}:${minutes} ${
        inputDate.getHours() < 12 ? "AM" : "PM"
      }`;

      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {formattedDate}
        </div>
      );
    },
  },
];

//temporary data
export const dataSensorRows = [
  {
    id: 1,
    temp: 20,
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    humidity: 35,
    email: "1snow@gmail.com",
    age: 35,
    light: 15,
    time: "2024-01-21T05:27:47Z",
  },
  {
    id: 2,
    temp: 30,
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "2snow@gmail.com",
    humidity: 40,
    age: 42,
    light: 15,
    time: "2024-01-21T05:27:47Z",
  },
  {
    id: 3,
    temp: 40,
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "3snow@gmail.com",
    humidity: 45,
    age: 45,
    light: 15,
    time: "2024-01-21T05:27:47Z",
  },
  {
    id: 4,
    temp: 50,
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    humidity: 50,
    age: 16,
    light: 15,
    time: "2024-01-21T05:27:47Z",
  },
  {
    id: 5,
    temp: 50,
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    humidity: 50,
    age: 16,
    light: 15,
    time: "2024-01-21T05:27:47Z",
  },
  {
    id: 6,
    temp: 50,
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    humidity: 50,
    age: 16,
    light: 15,
    time: "2024-01-21T05:27:47Z",
  },
  {
    id: 7,
    temp: 50,
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    humidity: 50,
    age: 16,
    light: 15,
    time: "2024-01-21T05:27:47Z",
  },
  {
    id: 8,
    temp: 50,
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    humidity: 50,
    age: 16,
    light: 15,
    time: "2024-01-21T05:27:47Z",
  },
  {
    id: 9,
    temp: 50,
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    humidity: 50,
    age: 16,
    light: 15,
    time: "2024-01-21T05:27:47Z",
  },
  {
    id: 10,
    temp: 50,
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    humidity: 50,
    age: 16,
    light: 15,
    time: "2024-01-21T05:27:47Z",
  },
  {
    id: 11,
    temp: 50,
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    humidity: 50,
    age: 16,
    light: 15,
    time: "2024-01-21T05:27:47Z",
  },
  // {
  //   id: 5,
  //   username: "Targaryen",
  //   img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //   email: "5snow@gmail.com",
  //   status: "passive",
  //   age: 22,
  // },
  // {
  //   id: 6,
  //   username: "Melisandre",
  //   img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //   email: "6snow@gmail.com",
  //   status: "active",
  //   age: 15,
  // },
  // {
  //   id: 7,
  //   username: "Clifford",
  //   img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //   email: "7snow@gmail.com",
  //   status: "passive",
  //   age: 44,
  // },
  // {
  //   id: 8,
  //   username: "Frances",
  //   img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //   email: "8snow@gmail.com",
  //   status: "active",
  //   age: 36,
  // },
  // {
  //   id: 9,
  //   username: "Roxie",
  //   img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //   email: "snow@gmail.com",
  //   status: "pending",
  //   age: 65,
  // },
  // {
  //   id: 10,
  //   username: "Roxie",
  //   img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //   email: "snow@gmail.com",
  //   status: "active",
  //   age: 65,
  // },
];

export const dataHistoryColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "diviceId",
    headerName: "Id Divice ",
    width: 230,
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 100,
  },
  {
    field: "time",
    headerName: "Thời gian",
    width: 160,
    renderCell: (params) => {
      const inputString = params.row.time;
      const inputDate = new Date(inputString);

      // Lấy các thành phần của thời gian
      const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
      const day = String(inputDate.getDate()).padStart(2, "0");
      const year = inputDate.getFullYear();
      const hours = String(inputDate.getHours()).padStart(2, "0");
      const minutes = String(inputDate.getMinutes()).padStart(2, "0");

      // Tạo chuỗi theo định dạng MM/dd/yyyy hh:mm a
      const formattedDate = `${month}/${day}/${year} ${hours}:${minutes} ${
        inputDate.getHours() < 12 ? "AM" : "PM"
      }`;

      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {formattedDate}
        </div>
      );
    },
  },
];

//temporary data
export const dataHistoryRows = [
  {
    id: 1,
    diviceId: "FAN01",
    status: 0,
    time: "2024-01-21T05:27:47Z",
  },
  {
    id: 2,
    diviceId: "FAN02",
    status: 1,
    time: "2024-01-21T05:27:47Z",
  },
  {
    id: 3,
    diviceId: "QUAT01",
    status: 1,
    time: "2024-01-21T05:27:47Z",
  },
  {
    id: 4,
    diviceId: "QUAT02",
    status: 0,
    time: "2024-01-21T05:27:47Z",
  },
];
