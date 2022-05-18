import React, { useMemo, useState } from "react";
import { RegisterTypes } from "./constants";
import { CssBaseline, Paper, Container, Typography } from "@mui/material";
import StudentIcon from "components/Icons/StudentIcon";
import CompanyIcon from "components/Icons/CompanyIcon";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Container>
        <CssBaseline />
        <Typography variant="h3" align="center">
          Кто вы?
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              padding: "0 50px",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/auth/intern");
            }}
          >
            <StudentIcon width={200} height={200} />
            <Typography variant="h5" align="center">
              Студент
            </Typography>
          </div>
          <div
            style={{
              padding: "0 50px",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/auth/company/register");
            }}
          >
            <CompanyIcon width={200} height={200} />{" "}
            <Typography variant="h5" align="center">
              Компания
            </Typography>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default Auth;
