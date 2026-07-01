import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/AuthContext.jsx";
import { getProducts } from "../services/productService";
import TopTitleBar from "../components/TopTitleBar.jsx";

function ProductsPage() {
  const { user, logout } = useAuth();
  const { products, setProducts } = useOutletContext();

  console.log("User: ", user);
  const imageUrl = `http://localhost:5000/uploads/${user.profileImage}`;

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
    }
    loadProducts();
  }, []);

  return (
    <div className="w-full flex flex-col pl-8">
      {/* Top Title Bar */}
      <TopTitleBar title="Products" />
      {/* <div className="h-[80px] w-full flex justify-between items-center px-8 bg-amber-200">
          <div className="">
            <div className="logo-wrapper h-16 w-16 rounded-full overflow-hidden">
              <img
                src={imageUrl}
                alt="profile"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="title text-2xl font-semibold">Products</div>
          {user && (
            <div className="flex items-center">
              <button
                className="px-3 py-1 bg-red-600 text-sm text-white rounded-lg cursor-pointer"
                onClick={() => logout()}
              >
                Logout
              </button>
            </div>
          )}
          {!user && (
            <div className="flex items-center gap-3 pr-8">
              <Link
                to="/login"
                className="px-3 py-1 bg-sky-600 text-sm text-white rounded-lg cursor-pointer"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 bg-sky-600 text-sm text-white rounded-lg cursor-pointer"
              >
                Register
              </Link>
            </div>
          )}
        </div> */}

      {/* Product List */}
      <div className="flex flex-wrap gap-10">
        {products.map((product) => (
          <div key={product._id} className="flex justify-center items-center">
            <ProductCard
              data={product}
              products={products}
              setProducts={setProducts}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
