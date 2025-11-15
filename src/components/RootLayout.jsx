import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Contact from "./Contact";
import ScrollToAnchor from "../utils/ScrollToAnchor";

const RootLayout = () => {
  return (
    <div className="bg-white dark:bg-black antialiased">
      <ScrollToAnchor />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Contact />
    </div>
  );
};

export default RootLayout;
