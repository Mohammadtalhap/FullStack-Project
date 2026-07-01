import { useState } from "react";
import { toast } from "react-hot-toast";
import { addProduct } from "../services/productService";

function AddProductModal({ onClose, onProductUpdated }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("image", imageFile);
      console.log("Data: ", data);
      const response = await addProduct(data);
      toast.success("Product added successfully!");
      onProductUpdated(response);
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to add product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="form-box w-96 bg-white rounded-lg p-8 shadow-lg">
        <h1 className="text-2xl font-semibold mb-6">Add a New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
              placeholder="Enter product name"
            />
          </div>

          {/* Price Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="Number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step={10}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
              placeholder="Enter price"
            />
          </div>
          {/* category Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
              placeholder="Enter category"
            />
          </div>
          {/* Image Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-amber-400 transition"
            />
          </div>
          {/* Image Preview */}
          {preview && (
            <div className="img-wrapper flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="h-40 w-40 object-cover rounded"
              />
            </div>
          )}
          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500 transition cursor-pointer disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;
