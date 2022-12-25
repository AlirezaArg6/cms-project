import Products from "./Components/Products/Products";
import Comments from "./Components/Comments/Comments";
import Users from "./Components/Users/Users";
import Orders from "./Components/Orders/Orders";
import Offs from "./Components/Offs/Offs";

const routes = [
  {
    path: "/",
    element: (
      <div className="home">
        به پروژه ی صفحه ی ادمین من خوش اومدی :) <br />
        از طریق منوی سمت راست میتونی به بخش های مختلف دسترسی داشته باشی.
      </div>
    ),
  },
  { path: "/products", element: <Products /> },
  { path: "/comments", element: <Comments /> },
  { path: "/users", element: <Users /> },
  { path: "/orders", element: <Orders /> },
  { path: "/offs", element: <Offs /> },
];

export default routes;
