import { useState, useRef } from "react";
import { AlertMessage, MessageBox } from "./styles/components";

export const useAlert = (maxMessages, displayTime) => {
  const [alerts, setAlerts] = useState([]);
  const timeoutIDs = useRef([]);

  const addAlert = ({ type, message }) => {
    setAlerts((oldAlerts) => {
      if (oldAlerts.length >= maxMessages - 1) {
        return [...oldAlerts.slice(1), { type, message }];
      }
      return [...oldAlerts, { type, message }];
    });
    // clear oldest alert after displaytime
    timeoutIDs.current.push(setTimeout(clearOldestAlert, displayTime));
  };
  const clearOldestAlert = () => {
    setAlerts((oldAlerts) => {
      timeoutIDs.current.shift();
      return oldAlerts.slice(1);
    });
  };
  const layoutAlert = (alert, index) => {
    return (
      <AlertMessage type={alert.type} key={"alert_" + index}>
        {alert.message}
        <span
          onClick={() => {
            clearSpecificAlert(index);
          }}>
          close
        </span>
      </AlertMessage>
    );
  };
  const clearSpecificAlert = (index) => {
    setAlerts((oldAlerts) => {
      return oldAlerts.slice(0, index).concat(oldAlerts.slice(index + 1));
    });
  };
  const fillMessageBox = () => {
    return <MessageBox>{alerts.map(layoutAlert)}</MessageBox>;
  };

  return [fillMessageBox(), addAlert];
};
