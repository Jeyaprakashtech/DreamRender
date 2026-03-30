import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Purchase from "./pages/Purchase";
import Generator from "./pages/Generator";
import Gallery from "./pages/Gallery";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import ScrollToTop from "./components/ScrollToTop";
import PageLoader from "./components/PageLoader";

const App = () => {
  const { showlogin } = useContext(AppContext);
  return (
    <div className="px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 py-8 bg-[#0A0A0F] min-h-screen">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
        toastStyle={{
          background: "#12101A",
          border: "1px solid #2D1F4A",
          borderRadius: "12px",
          color: "#F1F0FF",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "14px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        }}
      />
      <PageLoader/>
      <Navbar />
      {showlogin && <Login />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/generate" element={<Generator />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
      <Footer />
      <ScrollToTop/>
    </div>
  );
};

export default App;
