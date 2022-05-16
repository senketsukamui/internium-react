import React from "react";
import s from "./App.module.scss";
import Home from "pages/Home";
import Auth from "pages/Auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CompanyRegister from "pages/Auth/CompanyAuth/Register";
import CompanyLogin from "pages/Auth/CompanyAuth/Login";
import StudentAuth from "pages/Auth/StudentAuth/Login";
import CompanyUserRegister from "pages/Auth/CompanyUserAuth/Register";
import { SnackbarProvider } from "notistack";
import { useStores } from "hooks/useStores";
import jwtDecode from "jwt-decode";
import { TokenEntities } from "store/auth/types";
import { ThemeProvider } from "@mui/system";
import { theme } from "styles/theme";
import { CssBaseline } from "@mui/material";

interface DecodedJWT {
  id: string;
  entity: TokenEntities;
  iat: string;
}

function App() {
  const { authStore } = useStores();
  React.useEffect(() => {
    if (authStore.accessToken) {
      const decoded = jwtDecode<DecodedJWT>(authStore.accessToken);
      const { entity } = decoded;
      switch (entity) {
        case TokenEntities.OWNER:
        case TokenEntities.COMPANY_USER: {
          authStore.getCurrentCompany();
          break;
        }
        case TokenEntities.INTERN: {
          authStore.getCurrentIntern();
          break;
        }
        default:
      }
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={s.app}>
        <SnackbarProvider maxSnack={4}>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<Home />} />
              <Route path="auth" element={<Auth />} />
              // TODO: Refactor this
              <Route
                path="auth/company/register"
                element={<CompanyRegister />}
              />
              <Route path="auth/company/login" element={<CompanyLogin />} />
              <Route path="auth/intern" element={<StudentAuth />} />
              <Route
                path="auth/company-user"
                element={<CompanyUserRegister />}
              />
            </Routes>
          </BrowserRouter>
        </SnackbarProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
