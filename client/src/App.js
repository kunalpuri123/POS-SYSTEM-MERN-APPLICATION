import React from 'react';
import { Layout } from "antd";
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import Homepage from './pages/Homepage';
import ItemPage from './pages/ItemPage';
import CartPage from './pages/CartPage';
import Register from './pages/Register';
import Login from './pages/Login';
import BillsPage from './pages/BillsPage';
import CustomerPage from './pages/CustomerPage';




function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Homepage/></ProtectedRoute>} />
        <Route path="/bills" element={<ProtectedRoute><BillsPage/></ProtectedRoute>} />
        <Route path="/customers" element={<ProtectedRoute><CustomerPage/></ProtectedRoute>} />
        <Route path="/items" element={<ProtectedRoute><ItemPage/></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><CartPage/></ProtectedRoute>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  </>
    
  );
}

export default App;

export function ProtectedRoute({children}){
  if(localStorage.getItem('auth')){
  return children;
}else{
  return <Navigate to ="/login" />;
}
}