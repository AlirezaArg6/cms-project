import React, { useState, useEffect } from "react";
import "./Products.css";
import AddNewProduct from "../AddNewProduct/AddNewProduct";
import ProductsTable from "../ProductsTable/ProductsTable";

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    fetch("http://localhost:8000/api/products")
      .then((res) => res.json())
      .then((datas) => {
        setAllProducts(datas);
      });
  };
  return (
    <>
      <AddNewProduct getAllProducts={getAllProducts} />
      <ProductsTable
        allProducts={allProducts.reverse()}
        getAllProducts={getAllProducts}
      />
    </>
  );
}
