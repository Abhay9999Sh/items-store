# Item Store

A modern React + Vite application for managing and viewing items (e.g., clothing, gear, etc.) with image uploads, attractive UI, and live updates. Built with React 19, React Router v7, Axios, and custom backend API.

---

## 🚀 Live Website
[https://items-store-git-main-abhay9999shs-projects.vercel.app/](https://items-store-git-main-abhay9999shs-projects.vercel.app/)

## 🖥️ Backend Repository
[https://github.com/Abhay9999Sh/item-store/](https://github.com/Abhay9999Sh/item-store/)

---

## 📂 Project Structure & Key Paths

- `/src/pages/ViewItems.jsx` — Home page, displays all items in a responsive grid.
- `/src/pages/AddItem.jsx` — Add new item with name, type, description, cover image, and additional images.
- `/src/pages/ItemDetails.jsx` — Detailed view for a single item, with image carousel and enquiry button.
- `/public/ViewItems.css`, `/public/AddItem.css`, `/public/ItemDetails.css` — Modern, attractive styles for each page.
- `/src/api/ItemsApi.jsx` — All API calls (get all items, get item by ID, add item, send enquiry).
- `/src/App.jsx` — Main app, handles routing and shared state for live updates.
- `/src/components/Layout.jsx` — Layout wrapper for shared header/footer (customize as needed).

---

## 🌟 Features
- Add, view, and browse items with cover and additional images
- Responsive, modern UI with loading states and attractive cards
- Image uploads (cover + multiple additional images)
- View item details in a carousel with all images
- Enquire about any item (sends details to backend/email)
- Live updates: new items appear instantly on home page
- Environment-based image base URL (`.env` with `VITE_IMG_BASE`)

---

## 🛣️ Main Routes
- `/` — View all items
- `/addItems` — Add a new item
- `/item/:itemId` — View details for a specific item

---

## ⚙️ Environment Variables
- `.env` file should include:
  ```env
  VITE_IMG_BASE=https://item-store-backend.onrender.com/
  ```
  (or your production image base URL)

---

## 📝 API Endpoints (Backend)
- `GET /api/items` — Get all items
- `GET /api/item/:id` — Get item by ID
- `POST /api/items` — Add new item (multipart/form-data)
- `POST /api/enquire` — Send enquiry for an item

---

## 🛠️ Setup & Run
1. Clone this repo and the backend repo
2. Install dependencies: `npm install`
3. Set up your `.env` file
4. Start the backend server (see backend repo for instructions)
5. Start the frontend: `npm run dev`
6. Visit the site at `http://localhost:5173` (or your Vite port)

---

## 💡 Notes
- All image URLs are built using the `VITE_IMG_BASE` env variable for flexibility.
- The UI is fully responsive and works great on mobile and desktop.
- Backend must support CORS for local development.
- For email/enquiry, backend can use Ethereal for safe testing.

---

## 🙏 Credits
- Built with React, Vite, Axios, and React Router
- UI inspired by modern dashboard and e-commerce designs

---

Feel free to fork, contribute, or open issues!
