import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faDatabase } from "@fortawesome/free-solid-svg-icons";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>

          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>

          <div className="item">
            <DashboardIcon
              className="icon"
              style={{ color: "#7451f8", marginRight: "4px" }}
            />

            <Link to="/" style={{ textDecoration: "none" }} s>
              <span>Dashboard</span>
            </Link>
          </div>

          <div className="item">
            <Link to="/data-sensor" style={{ textDecoration: "none" }}>
              <FontAwesomeIcon
                icon={faDatabase}
                style={{ color: "#7451f8", marginRight: "4px" }}
              />

              <span>Data sensor</span>
            </Link>
          </div>

          <div className="item">
            <Link to="/action-history" style={{ textDecoration: "none" }}>
              <FontAwesomeIcon
                icon={faChartSimple}
                style={{ color: "#7451f8", marginRight: "4px" }}
              />
              <span>Action history</span>
            </Link>
          </div>

          <div className="item">
            <AccountCircleOutlinedIcon
              className="icon"
              style={{ color: "#7451f8", marginRight: "4px" }}
            />
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
