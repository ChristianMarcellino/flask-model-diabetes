import { Outlet } from "react-router"
import Navbar from "../components/ui/Navbar"
import Footer from "../components/ui/Footer"

export default function Layout() {
  return (
    <div className="bg-base-100 flex flex-col">
      <Navbar />

      <main className="flex-1 flex justify-center items-center">
        <Outlet />
      </main> 

      <Footer />
    </div>
  );
}

