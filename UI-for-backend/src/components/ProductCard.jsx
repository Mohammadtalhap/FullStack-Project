import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { deleteProduct } from "../services/productService";
import EditProductModal from "./EditProductModal";

function ProductCard({ data, products, setProducts }) {
  const { name, price, image, category } = data;
  const imageUrl = `http://localhost:5000/uploads/${image}`;
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async (id) => {
    try {
      const response = await deleteProduct(id);
      setProducts(products.filter((product) => product._id !== id));
      console.log("Response: ", response);
      toast.success(response.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleProductUpdated = (updatedProduct) => {
    // Update the product in the products list
    setProducts(
      products.map((prod) =>
        prod._id === updatedProduct._id ? updatedProduct : prod,
      ),
    );
  };

  return (
    <>
      <div className="group h-[380px] w-[220px] flex flex-col justify-between gap-2 p-4 bg-white border border-slate-200 shadow-[0_4px_32px_0_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden">
        <div className="img-wrapper h-50 w-full rounded-md overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-semibold text-slate-900">{name}</h2>
        <p className="text-xs size-fit px-2 py-1 rounded-full text-slate-700 font-semibold capitalize bg-slate-100">
          {category}
        </p>
        <p className="text-lg font-semibold mt-2 text-slate-900">${price}</p>
        {/* Edit and Delete Buttons */}
        <div className="btn-box w-full flex justify-between p-2 border-t border-slate-200">
          <button
            onClick={() => setIsEditOpen(true)}
            className="px-3 py-1 bg-[#ec941a]/80  rounded-full border border-slate-200 cursor-pointer hover:bg-[#ec941a] transition"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(data._id)}
            className="px-3 py-1 bg-rose-600 text-white rounded-full cursor-pointer hover:bg-rose-700 transition"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <EditProductModal
          product={data}
          onClose={() => setIsEditOpen(false)}
          onProductUpdated={handleProductUpdated}
        />
      )}
    </>
  );
}

export default ProductCard;
