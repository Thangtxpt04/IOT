import * as React from "react";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFan, faLightbulb } from "@fortawesome/free-solid-svg-icons";
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
  let fanRef = React.useRef();

  const [isActiveLight, setIsActiveLight] = React.useState(false);

  const spinAnimation = React.useRef(null);

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

  const onHandleFan = () => {
    setIsFan(!isFanOn);
  };

  React.useEffect(() => {
    isFanOn ? spinAnimation.current.play() : spinAnimation.current.pause();
  }, [isFanOn]);
  React.useEffect(() => {
    console.log(isFanOn);
    console.log(isActiveLight);
  }, [isActiveLight, isFanOn]);
  return (
    <div className="featured">
      <FormGroup style={{ display: "flex" }}>
        <div>
          <FontAwesomeIcon icon={faFan} className="device" ref={fanRef} />
          <dir>
            <FormControlLabel
              control={<IOSSwitch sx={{ m: 1 }} />}
              label={`${isFanOn ? "ON" : "OFF"}`}
              onClick={onHandleFan}
            />
          </dir>
        </div>
        <div style={{ marginTop: "24px" }}>
          <FontAwesomeIcon
            icon={faLightbulb}
            className={`device ${isActiveLight ? "active" : ""}`}
          />
          <dir>
            <FormControlLabel
              onClick={() => setIsActiveLight(!isActiveLight)}
              control={<IOSSwitch sx={{ m: 1 }} />}
              label={`${isActiveLight ? "ON" : "OFF"}`}
            />
          </dir>
        </div>
      </FormGroup>
    </div>
  );
}
