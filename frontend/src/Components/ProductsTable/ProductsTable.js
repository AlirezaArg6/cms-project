import React, { useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";
import DetailsModal from "../DetailsModal/DetailsModal";
import EditModal from "../EditModal/EditModal";
import "./ProductsTable.css";
import ErrorBox from "../ErrorBox/ErrorBox";

export default function ProductsTable({ allProducts, getAllProducts }) {
  const [isDeleteModalShowing, setIsDeleteModalShowing] = useState(false);
  const [isDetailsModalShowing, setIsDetailsModalShowing] = useState(false);
  const [isEditModalShowing, setIsEditModalShowing] = useState(false);

  const [mainproductID, setMainProductID] = useState(null);
  const [mainProductInfos, setMainProductInfos] = useState({});

  const [productNewTitle, setProductNewTitle] = useState("");
  const [productNewPrice, setProductNewPrice] = useState("");
  const [productNewCount, setProductNewCount] = useState("");
  const [productNewImg, setProductNewImg] = useState("");
  const [productNewPopularity, setProductNewPopularity] = useState("");
  const [productNewSale, setProductNewSale] = useState("");
  const [productNewColors, setProductNewColors] = useState("");

  const deleteCancelAction = () => {
    setIsDeleteModalShowing(false);
  };

  const deleteSubmitAction = () => {
    // console.log(productID);
    fetch(`http://localhost:8000/api/products/${mainproductID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        setIsDeleteModalShowing(false);
        getAllProducts();
      });
  };

  const hideDetailsModal = () => {
    setIsDetailsModalShowing(false);
  };

  const hideEditModal = () => {
    setIsEditModalShowing(false);
  };

  const editSubmitAction = (e) => {
    e.preventDefault();

    const productsNewInfos = {
      title: productNewTitle,
      price: productNewPrice,
      count: productNewCount,
      img: productNewImg,
      popularity: productNewPopularity,
      sale: productNewSale,
      colors: productNewColors,
    };

    fetch(`http://localhost:8000/api/products/${mainproductID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productsNewInfos),
    })
      .then((res) => res.json())
      .then((result) => {
        setIsEditModalShowing(false);
        getAllProducts();
      });
  };

  return (
    <>
      {allProducts.length ? (
        <>
          <h1 className="cms-title">??????????????</h1>
          <table className="cms-table">
            <thead>
              <tr>
                <th>??????</th>
                <th>??????</th>
                <th>????????</th>
                <th>????????????</th>
              </tr>
            </thead>
            <tbody>
              {[...allProducts].reverse().map((product) => (
                <tr key={product.id} className="products-table__tr">
                  <td>
                    <img
                      src={product.img}
                      alt={product.title}
                      className="cms-table__img"
                    />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.price.toLocaleString()} ??????????</td>
                  <td>{product.count}</td>
                  <td>
                    <button
                      className="cms-table__btn"
                      onClick={() => {
                        setIsDetailsModalShowing(true);
                        setMainProductInfos(product);
                      }}
                    >
                      ????????????
                    </button>
                    <button
                      className="cms-table__btn"
                      onClick={() => {
                        // setMainProductInfos(product);
                        setMainProductID(product.id);
                        setIsDeleteModalShowing(true);
                      }}
                    >
                      ??????
                    </button>
                    <button
                      className="cms-table__btn"
                      onClick={() => {
                        setIsEditModalShowing(true);
                        setMainProductID(product.id);
                        setProductNewTitle(product.title);
                        setProductNewPrice(product.price);
                        setProductNewCount(product.count);
                        setProductNewImg(product.img);
                        setProductNewPopularity(product.popularity);
                        setProductNewSale(product.sale);
                        setProductNewColors(product.colors);
                      }}
                    >
                      ????????????
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <ErrorBox msg={"?????? ???????????? ???????? ??????"} />
      )}

      {isDetailsModalShowing && (
        <DetailsModal onHide={hideDetailsModal}>
          <table className="cms-table">
            <thead>
              <tr>
                <th>??????????????</th>
                <th>????????</th>
                <th>??????????????</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{mainProductInfos.popularity}</td>
                <td>{mainProductInfos.price.toLocaleString()} ??????????</td>
                <td>{mainProductInfos.colors}</td>
              </tr>
            </tbody>
          </table>
        </DetailsModal>
      )}
      {isDeleteModalShowing && (
        <DeleteModal
          onSubmit={deleteSubmitAction}
          onCancel={deleteCancelAction}
        >
          <h1>?????? ???? ?????? ?????? ?????????? ?????????????? ????????????</h1>
        </DeleteModal>
      )}
      {isEditModalShowing && (
        <EditModal onHide={hideEditModal} onSubmit={editSubmitAction}>
          <input
            type="text"
            className="edit-modal__input"
            placeholder="?????? ???????? ???? ???????? ????????..."
            value={productNewTitle}
            onChange={(e) => setProductNewTitle(e.target.value)}
          />
          <input
            type="text"
            className="edit-modal__input"
            placeholder="???????? ???????? ???? ???????? ????????..."
            value={productNewPrice}
            onChange={(e) => setProductNewPrice(e.target.value)}
          />
          <input
            type="text"
            className="edit-modal__input"
            placeholder="???????????? ???????? ???? ???????? ????????..."
            value={productNewCount}
            onChange={(e) => setProductNewCount(e.target.value)}
          />
          <input
            type="text"
            className="edit-modal__input"
            placeholder="???????? ???????? ???????? ???? ???????? ????????..."
            value={productNewImg}
            onChange={(e) => setProductNewImg(e.target.value)}
          />{" "}
          <input
            type="text"
            className="edit-modal__input"
            placeholder="?????????? ?????????????? ???????? ???? ???????? ????????..."
            value={productNewPopularity}
            onChange={(e) => setProductNewPopularity(e.target.value)}
          />{" "}
          <input
            type="text"
            className="edit-modal__input"
            placeholder="?????????? ???????? ???????? ???? ???????? ????????..."
            value={productNewSale}
            onChange={(e) => setProductNewSale(e.target.value)}
          />{" "}
          <input
            type="text"
            className="edit-modal__input"
            placeholder="?????????? ?????????????? ???????? ???? ???????? ????????..."
            value={productNewColors}
            onChange={(e) => setProductNewColors(e.target.value)}
          />
        </EditModal>
      )}
    </>
  );
}
