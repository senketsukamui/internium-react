import React from "react";
import Header from "components/Header";
import Main from "./Main";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Search from "./Search";
import Profile from "pages/Profile";

const Home = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          padding: "30px 80px",
        }}
      >
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </Box>
    </>
  );
};

export default Home;
