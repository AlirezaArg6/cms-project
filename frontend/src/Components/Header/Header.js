import React from "react";
import { AiOutlineBell } from "react-icons/ai";
import { BsBrightnessHigh } from "react-icons/bs";
import "./Header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="admin-profile">
        <img src="img/alireza.jpg" alt="" />
        <div>
          <h1>علیرضا غفاری</h1>
          <h3>برنامه نویس فرانت اند</h3>
        </div>
      </div>
      <div className="header__left-section">
        <div className="search-box">
          <input type="text" placeholder="جست و جو کنید ..." />
          <button>جست و جو</button>
        </div>
        <div className="header__left-icon">
          <AiOutlineBell />
        </div>
        <div className="header__left-icon">
          <BsBrightnessHigh />
        </div>
      </div>
    </div>
  );
}
