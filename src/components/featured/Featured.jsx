import * as React from "react";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import deviceServices from "../../services/deviceServices";
import SwitchButton from "../SwitchButton";

import { message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFan, faLightbulb, faTv } from "@fortawesome/free-solid-svg-icons";
import "./featured.scss";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default function CustomizedSwitches() {
  const [isFanOn, setIsFan] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  let fanRef = React.useRef();

  const [isActiveLight, setIsActiveLight] = React.useState(false);
  const [isActiveTV, setIsActiveTV] = React.useState(false);

  const spinAnimation = React.useRef(null);

  const handleFanClick = React.useCallback(
    ({ mode, _save, allowNotify }) => {
      const data = {
        deviceId: "1",
        action: mode,
        _save,
      };
      messageApi.loading(`Waiting...`, [0.5]);
      deviceServices
        .updateDeviceStatus({ data, allowLog: allowNotify })
        .then((response) => {
          if (allowNotify)
            messageApi.success(
              `Succeed to ${!mode ? "TURN OFF" : "TURN ON"} THE FAN`
            );
          setIsFan(mode);
        })
        .catch((error) => {
          console.log("Error", error.data);
          if (allowNotify)
            messageApi.error(
              `Failed to ${!mode ? "TURN OFF" : "TURN ON"} THE FAN`
            );
          setIsFan(!mode);
        });
    },
    [messageApi]
  );

  const handleLightClick = React.useCallback(
    ({ mode, _save, allowNotify }) => {
      // console.log('Save', _save);
      const data = {
        deviceId: "2",
        action: mode,
        _save,
      };
      deviceServices
        .updateDeviceStatus({ data, allowLog: allowNotify })
        .then((response) => {
          console.log("response", response);
          if (allowNotify)
            messageApi.success(
              `Succeed to ${!mode ? "TURN OFF" : "TURN ON"} THE LIGHT`
            );
          setIsActiveLight(mode);
        })
        .catch((error) => {
          console.log("Error", error.data);
          if (allowNotify)
            messageApi.error(
              `Failed to ${!mode ? "TURN OFF" : "TURN ON"} THE LIGHT`
            );
          setIsActiveLight(!mode);
        });
    },
    [messageApi]
  );
  const handleTVClick = React.useCallback(
    ({ mode, _save, allowNotify }) => {
      // console.log('Save', _save);
      const data = {
        deviceId: "3",
        action: mode,
        _save,
      };
      deviceServices
        .updateDeviceStatus({ data, allowLog: allowNotify })
        .then((response) => {
          console.log("response", response);
          if (allowNotify)
            messageApi.success(
              `Succeed to ${!mode ? "TURN OFF" : "TURN ON"} THE LIGHT`
            );
          setIsActiveTV(mode);
        })
        .catch((error) => {
          console.log("Error", error.data);
          if (allowNotify)
            messageApi.error(
              `Failed to ${!mode ? "TURN OFF" : "TURN ON"} THE LIGHT`
            );
          setIsActiveTV(!mode);
        });
    },
    [messageApi]
  );

  React.useEffect(() => {
    spinAnimation.current = fanRef.current.animate(
      [
        {
          transform: "rotate(360deg)",
        },
      ],
      {
        duration: 1000,
        iterations: Infinity,
      }
    );
  }, []);

  React.useEffect(() => {
    const lightParams = {
      deviceId: "2",
      orderBy: "createdAt",
      sortOrder: "DESC",
      pageNumber: 1,
      pageSize: 1,
    };
    const fanParams = {
      deviceId: "1",
      orderBy: "createdAt",
      sortOrder: "DESC",
      pageNumber: 1,
      pageSize: 1,
    };
    const TVParams = {
      deviceId: "3",
      orderBy: "createdAt",
      sortOrder: "DESC",
      pageNumber: 1,
      pageSize: 1,
    };
    const getLatestFanStatus = deviceServices.getDataAction({
      params: fanParams,
    });
    const getLatestLightStatus = deviceServices.getDataAction({
      params: lightParams,
    });
    const getLatestTVStatus = deviceServices.getDataAction({
      params: TVParams,
    });
    Promise.all([getLatestFanStatus, getLatestLightStatus, getLatestTVStatus])
      .then(([fanResponse, lightResponse, tvResponse]) => {
        // console.log(fanResponse, lightResponse);
        if (fanResponse?.data?.length > 0) {
          handleFanClick({
            mode: fanResponse.data[0].action === "ON" ? true : false,
            _save: false,
          });
        }
        if (lightResponse?.data?.length > 0) {
          handleLightClick({
            mode: lightResponse.data[0].action === "ON" ? true : false,
            _save: false,
          });
        }
        if (tvResponse?.data?.length > 0) {
          handleTVClick({
            mode: tvResponse.data[0].action === "ON" ? true : false,
            _save: false,
          });
        }
      })
      .catch((error) => {
        messageApi.error("Failed to get latest device status!");
        console.log("Error when getting latest device status");
      });
  }, [messageApi, handleFanClick, handleLightClick, handleTVClick]);

  React.useEffect(() => {
    isFanOn ? spinAnimation.current.play() : spinAnimation.current.pause();
  }, [isFanOn]);
  React.useEffect(() => {}, [isActiveLight, isFanOn]);
  return (
    <div className="featured">
      <FormGroup style={{ display: "flex" }}>
        <div>
          <FontAwesomeIcon icon={faFan} className="device" ref={fanRef} />
          <dir style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
            <SwitchButton
              title={"Change the Fan mode"}
              mode={isFanOn}
              onClick={handleFanClick}
            />
          </dir>
        </div>
        <div style={{ marginTop: "24px" }}>
          <FontAwesomeIcon
            icon={faLightbulb}
            className={`device ${isActiveLight ? "active" : ""}`}
          />
          <dir style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
            <SwitchButton
              title={"Change the Light mode"}
              mode={isActiveLight}
              onClick={handleLightClick}
            />
          </dir>
        </div>
        <div style={{ marginTop: "24px" }}>
          <FontAwesomeIcon
            icon={faTv}
            className={`device ${isActiveTV ? "active" : ""}`}
          />
          <dir style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
            <SwitchButton
              title={"Change the TV mode"}
              mode={isActiveTV}
              onClick={handleTVClick}
            />
          </dir>
        </div>
      </FormGroup>
    </div>
  );
}
