import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { Toaster } from "sileo";
import Home from "../pages/Home.jsx";
import ProductsList from "../pages/products/ProductList.jsx";
import ProductsCreate from "../pages/products/ProductCreate.jsx";
import CategoriesCreate from "../pages/categories/CategoryCreate.jsx";
import CategoriesList from "../pages/categories/CategoryList.jsx";
import ProvidersList from "../pages/providers/ProvidersList.jsx";
import ProvidersCreate from "../pages/providers/ProvidersCreate.jsx";
import Inventories from "../pages/inventories/InvetoryList.jsx";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import AdminUsersAll from "../pages/auth/AdminUsersAll.jsx";
import NotFound from "../pages/NotFound.jsx";

function AppRouter() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/products/List" element={<ProductsList />} />
          <Route path="/products/create" element={<ProductsCreate />} />
          <Route path="/categories/List" element={<CategoriesList />} />
          <Route path="/categories/create" element={<CategoriesCreate />} />
          <Route path="/inventories" element={<Inventories />} />
          <Route path="/AdminUsers/AllUsers" element={<AdminUsersAll />} />
          <Route path="/providers/List" element={<ProvidersList />} />
          <Route path="/providers/create" element={<ProvidersCreate />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
