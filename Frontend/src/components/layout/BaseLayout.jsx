import { Outlet } from "react-router-dom";
import { Footer, Sidebar } from "../index.js";

const BaseLayout = () => {
  return (
    <main className="page-wrapper">
      {/* left of page */}
      <Sidebar />
      {/* right side/content of the page */}
      <div className="content-wrapper">
        <Outlet />
       
        <Footer />
      </div>
    </main>
  );
};

export default BaseLayout;
