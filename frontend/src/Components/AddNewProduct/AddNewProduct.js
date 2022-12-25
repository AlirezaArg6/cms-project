import React, { useState } from "react";
import "./AddNewProduct.css";
import { BiDollar } from "react-icons/bi";
import { AiOutlinePicture } from "react-icons/ai";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { BsSuitHeartFill } from "react-icons/bs";
import { TbNumbers } from "react-icons/tb";

export default function AddNewProduct({ getAllProducts }) {
  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductCount, setNewProductCount] = useState("");
  const [newProductImg, setNewProductImg] = useState("");
  const [newProductPopularity, setNewProductPopularity] = useState("");
  const [newProductSale, setNewProductSale] = useState("");
  const [newProductColors, setNewProductColors] = useState("");

  const newProductsInfos = {
    title: newProductTitle,
    price: newProductPrice,
    count: newProductCount,
    img: newProductImg,
    popularity: newProductPopularity,
    sale: newProductSale,
    colors: newProductColors,
  };

  const addNewProductHandler = (event) => {
    event.preventDefault();

    fetch(`http://localhost:8000/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProductsInfos),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        getAllProducts();
        emptyInputs();
      });
  };

  function emptyInputs() {
    setNewProductTitle("");
    setNewProductPrice("");
    setNewProductCount("");
    setNewProductImg("");
    setNewProductPopularity("");
    setNewProductSale("");
    setNewProductColors("");
  }

  return (
    <div className="add-products">
      <h1 className="add-products__title">افزودن محصول جدید</h1>
      <div className="add-products__wrapper">
        <form action="#" className="add-products-form">
          <div className="add-products__form-group">
            <MdOutlineDriveFileRenameOutline className="add-products__icon" />
            <input
              type="text"
              className="add-products-input"
              placeholder="اسم محصول را بنویسید"
              value={newProductTitle}
              onChange={(e) => setNewProductTitle(e.target.value)}
            />
          </div>
          <div className="add-products__form-group">
            <BiDollar className="add-products__icon" />

            <input
              type="text"
              className="add-products-input"
              placeholder="قیمت محصول را بنویسید"
              value={newProductPrice}
              onChange={(e) => setNewProductPrice(e.target.value)}
            />
          </div>
          <div className="add-products__form-group">
            <TbNumbers className="add-products__icon" />
            <input
              type="text"
              className="add-products-input"
              placeholder="موجودی محصول را بنویسید"
              value={newProductCount}
              onChange={(e) => setNewProductCount(e.target.value)}
            />
          </div>
          <div className="add-products__form-group">
            <AiOutlinePicture className="add-products__icon" />
            <input
              type="text"
              className="add-products-input"
              placeholder="آدرس عکس محصول را بنویسید"
              value={newProductImg}
              onChange={(e) => setNewProductImg(e.target.value)}
            />
          </div>
          <div className="add-products__form-group">
            <BsSuitHeartFill className="add-products__icon" />
            <input
              type="text"
              className="add-products-input"
              placeholder="میزان محبوبیت محصول را بنویسید"
              value={newProductPopularity}
              onChange={(e) => setNewProductPopularity(e.target.value)}
            />
          </div>
          <div className="add-products__form-group">
            <TbNumbers className="add-products__icon" />
            <input
              type="text"
              className="add-products-input"
              placeholder="میزان فروش محصول را بنویسید"
              value={newProductSale}
              onChange={(e) => setNewProductSale(e.target.value)}
            />
          </div>
          <div className="add-products__form-group">
            <TbNumbers className="add-products__icon" />
            <input
              type="text"
              className="add-products-input"
              placeholder="تعداد رنگ بندی محصول را بنویسید"
              value={newProductColors}
              onChange={(e) => setNewProductColors(e.target.value)}
            />
          </div>
        </form>
        <button className="add-products__btn" onClick={addNewProductHandler}>
          ثبت محصول
        </button>
      </div>
    </div>
  );
}
