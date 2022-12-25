import React from "react";
import "./ErrorBox.css";

export default function ErrorBox({ msg }) {
  return (
    <div className="error-msg-box">
      <h1>{msg}</h1>
    </div>
  );
}
