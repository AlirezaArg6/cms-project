import { useRoutes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import routes from "./routes";
import "./App.css";

function App() {
  const router = useRoutes(routes);

  return (
    <>
      <Sidebar />
      <div className="main">
        <Header />

        {router}
      </div>
    </>
  );
}

export default App;
