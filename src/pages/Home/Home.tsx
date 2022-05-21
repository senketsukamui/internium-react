import React from "react";
import Header from "components/Header";
import Main from "./Main";
import { Route, Routes } from "react-router-dom";
import Search from "./Search";
import Vacancy from "pages/Vacancy";
import VacancyEdit from "pages/VacancyEdit";
import StudentProfile from "pages/Profile/StudentProfile";
import CompanyProfile from "pages/Profile/CompanyProfile";
import CompanyUserProfile from "pages/Profile/CompanyUserProfile";
import CompanyProfileEdit from "pages/ProfileEdit/CompanyProfileEdit";
import CompanyUserProfileEdit from "pages/ProfileEdit/CompanyUserProfileEdit";
import InternProfileEdit from "pages/ProfileEdit/InternProfileEdit";
import InternSearch from "./InternSearch";

const Home = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<Search />} />
        <Route path="/interns" element={<InternSearch />} />
        <Route path="/intern/profile/:id" element={<StudentProfile />} />
        <Route
          path="/intern/profile/:id/edit"
          element={<InternProfileEdit />}
        />
        <Route path="/company/profile/:id" element={<CompanyProfile />} />
        <Route
          path="/company/profile/:id/edit"
          element={<CompanyProfileEdit />}
        />
        <Route
          path="/company-user/profile/:id"
          element={<CompanyUserProfile />}
        />
        <Route
          path="/company-user/profile/:id/edit"
          element={<CompanyUserProfileEdit />}
        />
        <Route path="/vacancy/:id" element={<Vacancy />} />
        <Route path="/vacancy/:id/edit" element={<VacancyEdit />} />
      </Routes>
    </>
  );
};

export default Home;
