import React, { useEffect } from "react";
import "./DetailsModal.css";

export default function DetailsModal({ onHide, product, children }) {
  useEffect(() => {
    const checkKey = (e) => {
      if (e.keyCode === 27) {
        onHide();
      }
    };
    window.addEventListener("keydown", checkKey);
    return () => {
      window.removeEventListener("keydown", checkKey);
    };
  });

  return (
    <div className="modal-parent active">
      <div className="details-modal">
        {children}
        <button className="details-modal__btn" onClick={onHide}>
          بستن
        </button>
      </div>
    </div>
  );
}
