import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { getItem, enquiryItem } from "../api/ItemsApi";
import "../../public/ItemDetails.css";

const IMG_BASE = import.meta.env.VITE_IMG_BASE || "https://item-store-backend.onrender.com/";

const ItemDetails = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await getItem(itemId);
        setItem(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setFetching(false);
      }
    };
    fetchItem();
  }, [itemId]);

  if (fetching)
    return (
      <div className="item-details-loading-bg">
        <div className="item-details-loading-card">
          <span className="loader"></span>
          <h2>Loading....</h2>
        </div>
      </div>
    );
  if (!item) return <div className="item-details-loading">Not found</div>;

  const allImages = [item.coverImage, ...(item.additionalImages || [])];
  const showPrev = () =>
    setCarouselIdx((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  const showNext = () =>
    setCarouselIdx((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));

  const handleEnquire = async () => {
    setLoading(true);
    try {
      const res = await enquiryItem(item); // send full item details
      if (res.data && res.data.message) {
        alert(res.data.message);
      } else {
        alert("Enquiry sent successfully.");
      }
    } catch (error) {
      alert("Failed to send enquiry. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="item-details-bg">
      <div className="item-details-card">
        <div className="item-details-carousel">
          <button className="carousel-btn left" onClick={showPrev}>
            &lt;
          </button>
          <img
            src={
              allImages[carouselIdx].startsWith("http")
                ? allImages[carouselIdx]
                : IMG_BASE + allImages[carouselIdx]
            }
            alt={item.name}
            className="item-details-img"
          />
          <button className="carousel-btn right" onClick={showNext}>
            &gt;
          </button>
        </div>
        <div className="item-details-info">
          <h2 className="item-details-title">{item.name}</h2>
          <div className="item-details-type">{item.type}</div>
          <div className="item-details-desc">{item.description}</div>
          <div className="item-details-meta">
            <span>Created: {new Date(item.createdAt).toLocaleString()}</span>
          </div>
          <div className="item-details-actions">
            <button
              className="enquire-btn"
              onClick={handleEnquire}
              disabled={loading}
            >
              {loading ? "Sending..." : "Enquire"}
            </button>
            <NavLink to="/" className="back-btn">
              Back to Home
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
