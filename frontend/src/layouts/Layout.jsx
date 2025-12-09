import { Outlet } from "react-router"
import Navbar from "../components/ui/Navbar"
import Footer from "../components/ui/Footer"

export default function Layout() {
  return (
    <div className="bg-base-100 flex flex-col">
      <Navbar />

      <main className="flex justify-center items-center mb-4 mx-auto p-4">
        <Outlet />
      </main> 

      <Footer />
    </div>
  );
}

