import classNames from "classnames/bind";
import { useContext } from "react";

import styles from "./SwitchButton.module.scss";
import { Tooltip } from "antd";

const cx = classNames.bind(styles);

function SwitchButton({ mode, onClick, title }) {
  return (
    <div
      className={cx("wrapper")}
      onClick={() => onClick({ mode: !mode, _save: true, allowNotify: true })}
    >
      <Tooltip title={title} placement="leftTop">
        <div className={cx("switch-btn")}>
          <input type="checkbox" checked={mode} readOnly />
          <div className={cx("knobs")}></div>
          <div className={cx("layer")}></div>
        </div>
      </Tooltip>
    </div>
  );
}

export default SwitchButton;
