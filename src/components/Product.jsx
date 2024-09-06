import { useState, useEffect } from "react";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:5000/api/products", {
          headers: { Authorization: token },
        });
        setProducts(data);
      } catch (error) {
        alert("Error fetching products");
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const newProduct = { name, price, description };
      const { data } = await axios.post(
        "http://localhost:5000/api/products",
        newProduct,
        {
          headers: { Authorization: token },
        }
      );
      setProducts([...products, data]);
      setName("");
      setPrice("");
      setDescription("");
      closeAddModal();
    } catch (error) {
      alert("Error adding product");
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const updatedProduct = { name, price, description };
      await axios.put(
        `http://localhost:5000/api/products/${currentProductId}`,
        updatedProduct,
        {
          headers: { Authorization: token },
        }
      );
      setProducts(
        products.map((product) =>
          product._id === currentProductId
            ? { ...product, ...updatedProduct }
            : product
        )
      );
      setName("");
      setPrice("");
      setDescription("");
      closeUpdateModal();
    } catch (error) {
      alert("Error updating product");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: token },
      });
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      alert("Error deleting product");
    }
  };

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openUpdateModal = (product) => {
    setCurrentProductId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => setIsUpdateModalOpen(false);

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 p-8">
      <button
        onClick={openAddModal}
        className="mb-6 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Add Product
      </button>

      <div className="w-full max-w-4xl bg-white p-8 border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Product List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-300 rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-700 mb-2">Rp. {product.price}</p>
                <p className="text-gray-600 text-sm">{product.description}</p>
              </div>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => openUpdateModal(product)}
                  className="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-300"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    {/* Modal Add */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 border border-gray-300 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Add Product</h2>
            <form onSubmit={handleAddProduct}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add Product
              </button>
              <button
                type="button"
                onClick={closeAddModal}
                className="w-full mt-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Update */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 border border-gray-300 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Update Product</h2>
            <form onSubmit={handleUpdateProduct}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Update Product
              </button>
              <button
                type="button"
                onClick={closeUpdateModal}
                className="w-full mt-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
