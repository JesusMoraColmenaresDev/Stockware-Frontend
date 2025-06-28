import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePageView from "../views/HomePageView";
import CreateProductsView from "../views/CreateProductsView";

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePageView/>}></Route>
                <Route path="/product/create" element={<CreateProductsView/>}></Route>
            </Routes>
        </Router>
    )
}