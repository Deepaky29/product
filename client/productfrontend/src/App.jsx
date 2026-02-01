import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import Otp from './pages/Otp'
import './App.css'
import ProductHome from "./pages/ProductHome";
import ProductList from "./pages/ProductList";
import ProductHome1 from "./pages/ProductHome1";

function App() {
  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/producthome" element={<ProductHome/>}/>
        <Route path="/unpublished" element={<ProductHome1/>}/>
        <Route path="/products" element={<ProductList/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
