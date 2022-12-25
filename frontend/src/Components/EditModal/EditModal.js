import React, { useEffect } from "react";
import "./EditModal.css";

export default function EditModal({ onHide, onSubmit, children }) {
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
      <div className="edit-modal">
        <h1 className="edit-modal__title">ویرایش اطلاعات</h1>
        <form action="" className="edit-modal__form">
          {children}
          <button className="eidt-modal__btn" onClick={onSubmit}>
            تایید ویرایش
          </button>
        </form>
      </div>
    </div>
  );
}
