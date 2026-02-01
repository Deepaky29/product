import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/Api";

function ProductHome() {
  useEffect(() => {
  window.history.pushState(null, "", window.location.href);
  const handlePopState = () => {
    window.history.pushState(null, "", window.location.href);
  };
  window.addEventListener("popstate", handlePopState);
  return () => {
    window.removeEventListener("popstate", handlePopState);
  };
}, []);
  const navigate = useNavigate();
  const [publishedProducts, setPublishedProducts] = useState([]);

  const fetchPublishedProducts = async () => {
    try {
      const res = await API.get("/product/published");
      setPublishedProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const unpublishProduct = async (id) => {
    try {
      await API.patch(`/product/toggle/${id}`);
      fetchPublishedProducts();
    } catch (err) {
      console.error(err);
    }
  };
  const deleteProduct = async (id) => {
    try {
      await API.delete(`/product/delete/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPublishedProducts();
  }, []);

  return (
    <div className="flex h-screen bg-[#F7F8FA]">
      <aside className="w-64 bg-[#0F172A] text-white flex flex-col p-4">
        <h1 className="text-xl font-semibold mb-6 flex items-center gap-2">
          Productr
          <span className="text-orange-500">®</span>
        </h1>

        <input
          type="text"
          placeholder="Search"
          className="mb-6 px-3 py-2 rounded bg-slate-800 text-sm outline-none"
        />

        <nav className="flex flex-col gap-3 text-sm">
          <span
            className="opacity-80 cursor-pointer"
            onClick={() => navigate("/producthome")}
          >
            Home
          </span>
          <span
            className="font-medium cursor-pointer"
            onClick={() => navigate("/products")}
          >
            Products
          </span>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-14 bg-white flex items-center justify-end px-6 shadow-sm">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </header>

        <div className="px-10 pt-6">
          <div className="flex gap-6 border-b text-sm">
            <button className="pb-2 border-b-2 border-indigo-600 font-medium">
              Published
            </button>
            <button
              className="pb-2 text-gray-500"
              onClick={() => navigate("/unpublished")}
            >
              Unpublished
            </button>
          </div>
        </div>

        <div className="flex-1 p-10">
          {publishedProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-lg font-semibold text-gray-800">
                No Published Products
              </h2>
              <p className="text-sm text-gray-500 mt-1 text-center">
                Your Published Products will appear here <br />
                Create your first product to publish
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {publishedProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg border p-4 flex flex-col"
                >
                  <img
                    src={product.image?.[0] || "https://via.placeholder.com/150"}
                    alt={product.productname}
                    className="w-full h-40 object-cover rounded mb-4"
                  />

                  <h3 className="font-semibold mb-2">
                    {product.productname}
                  </h3>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Product type - {product.producttype}</p>
                    <p>Quantity Stock - {product.quantity}</p>
                    <p>MRP - ₹{product.mrp}</p>
                    <p>Selling Price - ₹{product.sellingprice}</p>
                    <p>Brand Name - {product.brandname}</p>
                    <p>Total Number of images - {product.image.length}</p>
                    <p>
                      Exchange Eligibility -{" "}
                      {product.exchangeEligible ? "YES" : "NO"}
                    </p>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => unpublishProduct(product._id)}
                      className="flex-1 bg-green-600 text-white text-sm py-1.5 rounded"
                    >
                      Unpublish
                    </button>
                    <button className="flex-1 border text-sm py-1.5 rounded">
                      Edit
                    </button>
                    <button
    onClick={() => deleteProduct(product._id)}
    className="p-2 rounded border text-lg"
  >
    🗑
  </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default ProductHome;
