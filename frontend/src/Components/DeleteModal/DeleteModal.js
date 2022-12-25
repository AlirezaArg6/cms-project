import React from "react";
import "./DeleteModal.css";

export default function DeleteModal({ onSubmit, onCancel, title }) {
  return (
    <div className="modal-parent active">
      <div className="delete-modal">
        <h1>{title}</h1>
        <div className="delete-modal__btns">
          <button
            className="delete-modal__btn delete-modal__accept-btn"
            onClick={onSubmit}
          >
            بله
          </button>
          <button
            className="delete-modal__btn delete-modal__reject-btn"
            onClick={onCancel}
          >
            خیر
          </button>
        </div>
      </div>
    </div>
  );
}
