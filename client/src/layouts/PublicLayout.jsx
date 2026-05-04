// layouts/PublicLayout.js
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import App from "../App";
import Footer from "../components/Footer";


const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      
      <Navbar/>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer/>
    </div>
  )
};

export default PublicLayout;