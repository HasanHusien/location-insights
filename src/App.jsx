import { lazy, Suspense } from "react";
import { CitiesProvider } from "./contexts/CitiesContext.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FakeAuthProvider } from "./contexts/FakeAuthContext.jsx";

/* usual import bundles 😶
 import HomePage from "./pages/HomePage.jsx";
 import Product from "./pages/Product.jsx";
 import Pricing from "./pages/Pricing.jsx";
 import PageNotFound from "./pages/PageNotFound.jsx"; 
 import AppLayout from "./pages/AppLayout.jsx";
 import Login from "./pages/Login.jsx";
*/

// lazy import bundles 🥰
const AppLayout = lazy(() => import("./pages/AppLayout.jsx"));
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const Product = lazy(() => import("./pages/Product.jsx"));
const Pricing = lazy(() => import("./pages/Pricing.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const PageNotFound = lazy(() => import("./pages/PageNotFound.jsx"));

import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";

// Route => when i in this path='url' gotta into this component was revirced
// Nasted Route => nasted route handling like {children} props
// Navigate componente its a declaretive
// Navigate => it's make cities components as a default page in app

function App() {
  return (
    <FakeAuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />

              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />

                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </FakeAuthProvider>
  );
}

export default App;
