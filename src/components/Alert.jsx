
import React from "react";

export default function Alert({ alert }) {
  if (!alert) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "70px",       
        left: "50%",
        transform: "translateX(-10%)",
        width: "90%",
        maxWidth: "600px",
        zIndex: 1050,
      }}
    >
      <div className={`alert alert-${alert.type} shadow`} role="alert">
        {alert.msg}
      </div>
    </div>
  );
}
