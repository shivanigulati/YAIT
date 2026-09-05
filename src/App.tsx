import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ServeWithUs from "./pages/ServeWithUs";
import Volunteer from "./pages/Volunteer";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/serve-with-us" element={<ServeWithUs />} />
          <Route path="/volunteer" element={<Volunteer />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
