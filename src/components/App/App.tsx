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
          <Route path="auth" element={<Auth />} />
          // TODO: Refactor this
          <Route path="auth/company/register" element={<CompanyRegister />} />
          <Route path="auth/company/login" element={<CompanyLogin />} />
          <Route path="auth/student" element={<StudentAuth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
