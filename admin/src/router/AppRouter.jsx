import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { Toaster } from "sileo";
import Home from "../pages/Home.jsx";
import ProductsList from "../pages/products/ProductList.jsx";
import ProductsCreate from "../pages/products/ProductCreate.jsx";
import CategoriesCreate from "../pages/categories/CategoryCreate.jsx";
import CategoryListPage from "../pages/categories/CategoryListPage.jsx";
import ProvidersList from "../pages/providers/ProvidersList.jsx";
import ProvidersCreate from "../pages/providers/ProvidersCreate.jsx";
import InventoriesAddMovement from "../pages/inventories/InventoriesAddMovement.jsx";
import InventoriesListMovements from "../pages/inventories/InventoriesListMovements.jsx";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import EditProduct from "../pages/products/EditProduct.jsx";
import ProtectedRoute from "../router/ProtectedRoute.jsx";
import AdminUsersAll from "../pages/auth/AdminUsersAll.jsx";
import NotFound from "../pages/NotFound.jsx";
import OrdersList from "../pages/orders/OrdersList.jsx";
import OrdersCompleted from "../pages/orders/OrdersCompleted.jsx";
import OrdersCancelled from "../pages/orders/OrdersCancelled.jsx";

function AppRouter() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/products/List" element={<ProductsList />} />
            <Route path="/products/create" element={<ProductsCreate />} />
            <Route path="/products/edit/:id" element={<EditProduct />} />
            <Route path="/categories/List" element={<CategoryListPage />} />
            <Route path="/categories/create" element={<CategoriesCreate />} />
            <Route path="/orders/List" element={<OrdersList />} />
            <Route path="/orders/Completed" element={<OrdersCompleted />} />
            <Route path="/orders/Cancelled" element={<OrdersCancelled />} />
            <Route
              path="/inventories/add/movement"
              element={<InventoriesAddMovement />}
            />
            <Route
              path="/inventories/List/movements"
              element={<InventoriesListMovements />}
            />
            <Route path="/providers/List" element={<ProvidersList />} />
            <Route path="/providers/create" element={<ProvidersCreate />} />
            <Route path="/AdminUsers/AllUsers" element={<AdminUsersAll />} />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
