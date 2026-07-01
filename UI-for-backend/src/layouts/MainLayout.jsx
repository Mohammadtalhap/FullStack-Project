import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav";
import TopBar from "../components/TopBar";

function MainLayout() {
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="">
      <TopBar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex">
        {/* Sidebar */}
        <SideNav
          isSidebarOpen={isSidebarOpen}
          products={products}
          setProducts={setProducts}
        />

        {/* Page Content */}
        <Outlet context={{ products, setProducts }} />
      </div>
    </div>
  );
}

export default MainLayout;
