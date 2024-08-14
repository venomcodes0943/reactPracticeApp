import React from "react";
import { BrowserRouter } from "react-router-dom";
import routes from "./routes/routes.jsx";
import { useRoutes } from "react-router-dom";

function Approutes() {
  return useRoutes(routes);
}

const App = () => {
  return (
    <BrowserRouter>
      <Approutes />
    </BrowserRouter>
  );
};

export default App;
