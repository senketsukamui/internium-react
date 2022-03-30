import React from "react";
import s from "./App.module.scss";
import Home from "pages/Home";
import Auth from "pages/Auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className={s.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
