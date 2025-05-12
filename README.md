# EDC atbp. - E-commerce Website (Frontend)

A fully functional frontend for an e-commerce website focused on EDC pocket knives, built with React (Vite) and Tailwind CSS.

## Features

- **Minimalist & Clean UI/UX**: Modern, uncluttered design with a neutral color scheme and accent colors for CTAs.
- **Mobile-first responsive design**.
- **Key Pages**:
  - Homepage
  - Product Listing Page
  - Product Details Page
  - Shopping Cart
  - Checkout (sample flow)
  - Admin Dashboard
- **User Roles**:
  - **Buyers**: Browse products, add/remove items from cart, sample checkout process.
  - **Admin**: Add/edit/remove products, update stock quantities, view basic order summaries (mock data).
- **Functional Components**:
  - Navbar with logo, categories dropdown, search bar, user icon, and cart icon.
  - Product cards with image placeholder, price, and "Add to Cart" button.
  - Cart modal/sidebar that persists across pages.
- **Mock Data Handling**: Uses React context for product listings, cart items, and "logged in" state (hardcoded admin/buyer toggle).

## Tech Stack

- **React.js** with Vite for fast development.
- **Tailwind CSS** for utility-first styling.
- **React Router** for navigation.
- **Fake API calls** using setTimeout or mock JSON files.

## Getting Started

1. **Clone the repository**:
   ```sh
   git clone <repository-url>
   cd edc-atbp
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Run the development server**:
   ```sh
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`.

## Toggle Between Admin/Buyer Views

- Use the button in the Navbar or Admin page to switch between admin and buyer views.
- The role is managed by the `AuthContext` and is hardcoded for demonstration purposes.

## Project Structure

```
edc-atbp/
├── public/
├── src/
│   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── CartSidebar.jsx
│   │   │   ├── AdminProductForm.jsx
│   │   │   └── ...
│   │   ├── context/
│   │   │   ├── ProductContext.jsx
│   │   │   ├── CartContext.jsx
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── ...
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
```

## License

This project is licensed under the MIT License. 