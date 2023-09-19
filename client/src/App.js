import React ,{useMemo}from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme} from "@mui/material/styles";
import {themeSettings  } from "theme";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout  from "scense/laypout";
import Dashboard  from "scense/dashboard";
import Product from "./scense/product";
import Customers from "./scense/customers";
import Transactions from "scense/transactions";
import Geography from "scense/geography";
import Overview from "scense/overview.js";
import Daily from "scense/daily";
import Monthly from "scense/monthly";
import BreakDown from "scense/breakdown";
import Admin from "scense/admin";
import Performance from "scense/performance";


function App() {

  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(()=> createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Navigate to ="/dashboard" replace/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/product" element={<Product/>}/>
        <Route path="/customers" element={<Customers/>}/>
        <Route path="/transactions" element={<Transactions/>}/>
        <Route path="/geography" element={<Geography/>}/>
        <Route path="/overview" element={<Overview/>}/>
        <Route path="/daily" element={<Daily/>}/>
        <Route path="/monthly" element={<Monthly/>}/>
        <Route path="/breakDown" element={<BreakDown/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/performance" element={<Performance/>}/>
      </Route>
    </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
