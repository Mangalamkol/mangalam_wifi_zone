import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ApiTest from "./pages/ApiTest";
import Plans from "./pages/Plans";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api-test" element={<ApiTest />} />
        <Route path="/plans" element={<Plans />} />
      </Routes>
    </BrowserRouter>
  );
}