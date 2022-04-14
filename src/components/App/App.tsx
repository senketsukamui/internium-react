import React from "react";
import s from "./App.module.scss";
import Home from "pages/Home";
import Auth from "pages/Auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CompanyRegister from "pages/Auth/CompanyAuth/Register";
import CompanyLogin from "pages/Auth/CompanyAuth/Login";
import StudentAuth from "pages/Auth/StudentAuth/Login";

function App() {
  return (
    <div className={s.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="auth" element={<Auth />}>
            <Route path="company">
              <Route path="register" element={<CompanyRegister />} />
              <Route path="login" element={<CompanyLogin />} />
            </Route>
            <Route path="student" element={<StudentAuth />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
