import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import Home from "./views/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Detail from "./views/Detail/Detail";
import Form from "./views/Form/Form";

function App() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/details/:id" element={<Detail />}></Route>
        <Route path="/createRecipe" element={<Form />}></Route>
      </Routes>
    </>
  );
}

export default App;
