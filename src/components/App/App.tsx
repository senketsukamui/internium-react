import React from "react";
import "antd/dist/antd.css";
import s from "./App.module.scss";
import Home from "pages/Home";

function App() {
  return (
    <div className={s.app}>
      <Home />
    </div>
  );
}

export default App;
