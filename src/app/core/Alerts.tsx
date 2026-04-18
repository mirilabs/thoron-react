import { Alert } from "@mui/material";
import React, { useEffect } from "react";

interface Alert {
  message: string;
  type: "success" | "error" | "warning" | "info";
}

let addAlert: (alert: Alert) => void;

function Alerts() {
  const [alerts, setAlerts] = React.useState<Alert[]>([]);

  useEffect(() => {
    addAlert = (alert: Alert) => {
      setAlerts(prevAlerts => [...prevAlerts, alert]);
    };
    return () => {
      addAlert = () => { };
    }
  }, []);

  const alertElems = alerts.map((alert, i) => (
    <Alert key={i} severity={alert.type} onClose={() => {
      setAlerts(prevAlerts => prevAlerts.filter((_, j) => j !== i));
    }}>
      {alert.message}
    </Alert>
  ));

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {alertElems}
    </div>
  );
}

export default Alerts;
export { addAlert };