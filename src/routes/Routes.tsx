import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePageView from "../views/HomePageView";

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePageView/>}></Route>
            </Routes>
        </Router>
    )
}