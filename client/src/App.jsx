import { Routes, Route } from "react-router-dom";
import axios from "axios";
// Components
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./Layout";
// CSS
import './App.css'

axios.defaults.baseURL = "http://localhost:4000";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage/>} />
        {/* Authentication */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

    </Routes>
    
  )
}

export default App
