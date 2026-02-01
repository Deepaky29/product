import { useEffect, useState } from "react";
import API from "../api/Api";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    productname: "",
    producttype: "",
    quantity: "",
    mrp: "",
    sellingprice: "",
    brandname: "",
    exchangeEligible: "no",
    image: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await API.get("/product/get");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const openCreateModal = () => {
    setEditing(null);
    setForm({
      productname: "",
      producttype: "",
      quantity: "",
      mrp: "",
      sellingprice: "",
      brandname: "",
      exchangeEligible: "no",
      image: "",
    });
    setOpen(true);
  };

  const createOrUpdateProduct = async () => {
    try {
      const imageArray = form.image ? [form.image] : [];
      if (editing) {
        await API.put(`/product/update/${editing._id}`, {
          ...form,
          image: imageArray,
          exchangeEligible: form.exchangeEligible === "yes",
        });
      } else {
        await API.post("/product/create", {
          ...form,
          image: imageArray,
          exchangeEligible: form.exchangeEligible === "yes",
        });
      }
      setOpen(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const togglePublish = async (id) => {
    try {
      await API.patch(`/product/toggle/${id}`);
      fetchProducts();
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

  const openEditModal = (product) => {
    setEditing(product);
    setForm({
      productname: product.productname,
      producttype: product.producttype,
      quantity: product.quantity,
      mrp: product.mrp,
      sellingprice: product.sellingprice,
      brandname: product.brandname,
      exchangeEligible: product.exchangeEligible ? "yes" : "no",
      image: product.image[0] || "",
    });
    setOpen(true);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex h-screen bg-slate-700">
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
          <span className="opacity-80 cursor-pointer" onClick={() => navigate("/producthome")}>
            Home
          </span>
          <span className="font-medium cursor-pointer" onClick={() => navigate("/products")}>
            Products
          </span>
        </nav>
      </aside>

      <main className="flex-1 bg-slate-100 relative">
        <div className="flex justify-between items-center px-6 py-4 bg-white border-b">
          <h2 className="font-semibold">Products</h2>
          <button
            onClick={openCreateModal}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        </div>

        {products.length === 0 && (
          
          <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] text-center">
            <h3 className="font-semibold mb-2">
              Feels a little empty over here...
            </h3>
            <button
              onClick={openCreateModal}
              className="bg-indigo-600 text-white px-6 py-2 rounded"
            >
              Add your Products
            </button>
          </div>
        )}

        <div className="p-6 grid grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow p-4 flex flex-col"
            >
              <img
                src={product.image[0] || "https://via.placeholder.com/150"}
                alt={product.productname}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="font-semibold">{product.productname}</h3>
              <p>Product type - {product.producttype}</p>
              <p>Quantity Stock - {product.quantity}</p>
              <p>MRP - ₹{product.mrp}</p>
              <p>Selling Price - ₹{product.sellingprice}</p>
              <p>Brand Name - {product.brandname}</p>
              <p>Total Number of images - {product.image.length}</p>
              <p>Exchange Eligibility - {product.exchangeEligible ? "YES" : "NO"}</p>
              <div className="flex justify-between mt-3">
                <button
                  onClick={() => togglePublish(product._id)}
                  className={`px-3 py-1 rounded text-white ${
                    product.isPublished ? "bg-green-600" : "bg-blue-600"
                  }`}
                >
                  {product.isPublished ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={() => openEditModal(product)}
                  className="px-3 py-1 rounded border"
                >
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

        {open && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[420px] rounded-lg shadow-lg">
              <div className="flex justify-between items-center px-5 py-4 border-b">
                <h3 className="font-semibold">
                  {editing ? "Edit Product" : "Add Product"}
                </h3>
                <button onClick={() => setOpen(false)}>✕</button>
              </div>

              <div className="p-5 space-y-3 text-sm">
                <div>
                  <label>Product Name</label>
                  <input
                    className="w-full border rounded px-3 py-2 mt-1"
                    value={form.productname}
                    onChange={(e) =>
                      setForm({ ...form, productname: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label>Product Type</label>
                  <select
                    className="w-full border rounded px-3 py-2 mt-1"
                    value={form.producttype}
                    onChange={(e) =>
                      setForm({ ...form, producttype: e.target.value })
                    }
                  >
                    <option>Foods</option>
                    <option>Clothing</option>
                    <option>Electronics</option>
                  </select>
                </div>

                <div>
                  <label>Quantity Stock</label>
                  <input
                    className="w-full border rounded px-3 py-2 mt-1"
                    type="number"
                    value={form.quantity}
                    onChange={(e) =>
                      setForm({ ...form, quantity: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label>MRP</label>
                  <input
                    className="w-full border rounded px-3 py-2 mt-1"
                    type="number"
                    value={form.mrp}
                    onChange={(e) =>
                      setForm({ ...form, mrp: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label>Selling Price</label>
                  <input
                    className="w-full border rounded px-3 py-2 mt-1"
                    type="number"
                    value={form.sellingprice}
                    onChange={(e) =>
                      setForm({ ...form, sellingprice: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label>Brand Name</label>
                  <input
                    className="w-full border rounded px-3 py-2 mt-1"
                    value={form.brandname}
                    onChange={(e) =>
                      setForm({ ...form, brandname: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label>Image URL</label>
                  <input
                    className="w-full border rounded px-3 py-2 mt-1"
                    value={form.image}
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label>Exchange or return eligibility</label>
                  <select
                    className="w-full border rounded px-3 py-2 mt-1"
                    value={form.exchangeEligible}
                    onChange={(e) =>
                      setForm({ ...form, exchangeEligible: e.target.value })
                    }
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>

              <div className="px-5 py-4 border-t flex justify-end">
                <button
                  onClick={createOrUpdateProduct}
                  className="bg-indigo-600 text-white px-6 py-2 rounded"
                >
                  {editing ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ProductList;
