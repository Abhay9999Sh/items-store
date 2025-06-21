import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllItems } from "../api/ItemsApi";
import "../../public/ViewItems.css";

const IMG_BASE = import.meta.env.VITE_IMG_BASE || "https://item-store-backend.onrender.com/";

const ViewItems = ({ items, setItems }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  console.log(items);

  const getItemsData = async () => {
    setLoading(true);
    try {
      const res = await getAllItems();
      setItems(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItemsData();
  }, []);

  if (loading) {
    return (
      <div className="view-items-loading-bg">
        <div className="view-items-loading-card">
          <span className="loader"></span>
          <h2>Loading....</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="view-items-bg">
      <ul className="view-items-list">
        {items.map((item) => (
          <li
            key={item._id}
            className="item-card"
            onClick={() => navigate(`/item/${item._id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="item-img-wrapper">
              <img
                src={
                  item.coverImage.startsWith("http")
                    ? item.coverImage
                    : IMG_BASE + item.coverImage
                }
                alt={item.name}
                className="item-cover"
              />
            </div>
            <div className="item-title">{item.name}</div>
            <div className="item-type">{item.type}</div>
          </li>
        ))}
      </ul>
      <div style={{ textAlign: "center", marginTop: 32 }}>
        <button className="enquire-btn add-btn" onClick={() => navigate("/addItems")}>
          + Add New Item
        </button>
      </div>
    </div>
  );
};

export default ViewItems;
