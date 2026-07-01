import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import AddProductModal from "./AddProductModal";
import { Home, CircleUser, PackagePlus } from "lucide-react";

function SideNav({ isSidebarOpen, products, setProducts }) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [activePage, setActivePage] = useState("");

  useEffect(() => {
    const currentPath = window.location.pathname;
    console.log("Current Path: ", currentPath);
    setActivePage(currentPath);
  }, []);

  const handleProductUpdated = async (updatedProduct) => {
    setProducts((prevProducts) => {
      const productExists = prevProducts.some(
        (prod) => prod._id === updatedProduct._id,
      );
      if (productExists) {
        // Update existing product
        return prevProducts.map((prod) =>
          prod._id === updatedProduct._id ? updatedProduct : prod,
        );
      } else {
        // Add new product
        return [...prevProducts, updatedProduct];
      }
    });
  };
  return (
    <div
      className={`${isSidebarOpen ? "block" : "hidden"} w-[280px] min-h-screen p-8 bg-[#ffffff] shadow-2xs inset-shadow-2xs border-r-2 border-gray-200`}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        {/* LOGO */}
        <div className="logo-wrapper h-24 w-24 rounded-full overflow-hidden">
          <img src={Logo} alt="logo" className="h-full w-full object-cover" />
        </div>
        {/* Logo Text */}
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold">Products</h1>
          <p className="text-sm">API integration</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-4 mt-8">
        <Link to="/">
          <button
            className={`${activePage === "/" ? "bg-[#f4f4f4]" : ""} cursor-pointer font-medium w-full py-2 rounded-2xl flex pl-3 hover:bg-[#e6e6e6] transition`}
            onClick={() => setActivePage("/")}
          >
            <div className="flex items-center justify-center mr-5">
              <Home size={20} />
            </div>
            Home
          </button>
        </Link>
        <Link to="/profile">
          <button
            className={`${activePage === "/profile" ? "bg-[#f4f4f4]" : ""} cursor-pointer font-medium w-full py-2 rounded-2xl flex pl-3 hover:bg-[#e6e6e6] transition`}
            onClick={() => setActivePage("/profile")}
          >
            <div className="flex items-center justify-center mr-5">
              <CircleUser size={20} />
            </div>
            Profile
          </button>
        </Link>
        <div className="hover:bg-[#e6e6e6] py-2 rounded-2xl flex pl-3 cursor-pointer">
          <button
            type="button"
            onClick={() => setIsAddOpen(true)}
            className="flex items-center cursor-pointer font-medium"
          >
            <div className="flex items-center justify-center mr-5">
              <PackagePlus />
            </div>
            Add a Product
          </button>
        </div>
      </nav>

      {/* Add Product Modal */}
      {isAddOpen && (
        <AddProductModal
          onClose={() => setIsAddOpen(false)}
          onProductUpdated={handleProductUpdated}
        />
      )}
    </div>
  );
}

export default SideNav;
