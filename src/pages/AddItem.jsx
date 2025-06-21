import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { addItem } from "../api/ItemsApi";
import "../../public/AddItem.css";

const AddItem = ({ items = [], setItems }) => {
  const [form, setForm] = useState({
    name: "",
    type: "",
    description: "",
    cover: null,
    images: [null] // Start with one input
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e, idx) => {
    const { name, value, files } = e.target;
    if (name === "cover") {
      setForm({ ...form, cover: files[0] });
    } else if (name === "images") {
      const newImages = [...form.images];
      newImages[idx] = files[0];
      setForm({ ...form, images: newImages });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAddImageInput = () => {
    setForm({ ...form, images: [...form.images, null] });
  };

  const addItemData = async () => {
    setLoading(true);
    try {
      // Prepare FormData for multipart/form-data
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("type", form.type);
      formData.append("description", form.description);
      if (form.cover) formData.append("coverImage", form.cover);
      form.images.forEach((img) => {
        if (img) formData.append("additionalImages", img);
      });
      const res = await addItem(formData);
      if (res.status === 201) {
        setItems && setItems(prev => [...prev, res.data]);
        setForm({ name: "", type: "", description: "", cover: null, images: [null] });
        alert("Item successfully added");
        navigate("/");
      }
    } catch (error) {
      alert("Failed to add item. Check console for details.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addItemData();
  };

  return (
    <div className="add-items-container add-items-modern">
      <h2 className="add-items-title">Add Item</h2>
      {loading ? (
        <div className="add-items-loading"><span className="loader"></span><h2>Loading....</h2></div>
      ) : (
      <form className="add-items-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="add-items-row">
          <label>Item Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="add-items-row">
          <label>Item Type:</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="">Select type</option>
            <option value="Shirt">Shirt</option>
            <option value="Pant">Pant</option>
            <option value="Shoes">Shoes</option>
            <option value="Sports Gear">Sports Gear</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="add-items-row">
          <label>Item Description:</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
            disabled={loading}
          />
        </div>
        <div className="add-items-row">
          <label>Item Cover Image:</label>
          <input
            type="file"
            name="cover"
            accept="image/*"
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="add-items-row">
          <label>Item Additional Images:</label>
          {form.images.map((img, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <input
                type="file"
                name="images"
                accept="image/*"
                onChange={e => handleChange(e, idx)}
                disabled={loading}
              />
              {idx === form.images.length - 1 && (
                <button
                  type="button"
                  onClick={handleAddImageInput}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  aria-label="Add more images"
                  disabled={loading}
                >
                  <FaPlus size={20} color="#007bff" />
                </button>
              )}
            </div>
          ))}
        </div>
        <button type="submit" className="add-btn" disabled={loading}>
          Add Item
        </button>
      </form>
      )}
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <NavLink to="/" className="back-btn">Back to Home</NavLink>
      </div>
    </div>
  );
};

export default AddItem;
