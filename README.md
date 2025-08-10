# Amazon Clone (Vanilla JS)

A simple Amazon-like storefront built with HTML, CSS, and modern JavaScript (ES Modules). It features a product grid, cart with localStorage persistence, and a modular checkout flow with delivery options and a dynamic payment summary.

## Features

- Product grid with images, names, ratings, and formatted prices
- Quantity selector and Add to Cart with an "Added" feedback message
- Cart persisted in localStorage (add, remove, change quantity)
- Checkout page split into modular components:
  - Order summary (update, save, delete quantity per item)
  - Delivery options with dynamic delivery date calculation (skips Friday and Saturday)
  - Payment summary (items, shipping, subtotal, tax at 10%, total)
  - Header cart count that updates in real time
- Clean, maintainable ES module structure

## Tech Stack

- HTML5, CSS3
- JavaScript (ES Modules)
- Day.js (via ESM import from unpkg)
- No build step; static site friendly

## Project Structure

```
.
├── amazon.html                # Home page (catalog)
├── checkout.html              # Checkout page
├── orders.html                # Placeholder page
├── tracking.html              # Placeholder page
├── backend/
│   └── products.json          # Product data (mock backend)
├── data/
│   ├── cart.js                # Cart state, storage, and operations
│   ├── products.js            # Product list / loader
│   └── deliveryOptions.js     # Delivery options + delivery date calc
├── images/                    # Assets (logos, icons, product images)
├── scripts/
│   ├── amazon.js              # Catalog page logic
│   ├── checkout/
│   │   ├── checkoutHeader.js  # Header cart count renderer
│   │   ├── orderSummary.js    # Order items + delivery options UI
│   │   └── paymentSummary.js  # Totals and tax calculations
│   └── utils/
│       └── money.js           # Price formatting (formatCurreny)
├── styles/                    # CSS (shared + page styles)
└── tests/                     # Test harness and fixtures
```

## Getting Started

You can run this as a static site. Because ES modules are used, serving over HTTP is recommended.

### VS Code Live Server
- Install the Live Server extension
- Right-click `amazon.html` → "Open with Live Server"

## How It Works

- Data layer (in `data/`):
  - `cart.js`: Handles cart state and persistence in `localStorage`.
    - Public API:
      - `addToCart(productId, quantity = 1)`
      - `removeFromCart(productId)`
      - `calculateCartQuantity()`
      - `getCartItemQuantity(productId)`
      - `changeCartItemQuantity(productId, quantityNumber)`
      - `updateDeliveryOption(productId, deliveryOptionId)`
  - `products.js`: Provides product data to pages.
  - `deliveryOptions.js`: Contains delivery options and `calculateDeliveryDate(optionId)` which skips Fridays and Saturdays when computing dates.
- UI layer (in `scripts/`):
  - `amazon.js`: Renders the catalog grid and handles Add to Cart with quantity selection and an "Added" message.
  - `checkout/orderSummary.js`: Renders cart items, lets you update/save/delete quantities, and pick delivery options.
  - `checkout/paymentSummary.js`: Computes item totals, shipping, tax (10%), and order total.
  - `checkout/checkoutHeader.js`: Renders the dynamic cart count in the checkout header.
- Utilities:
  - `utils/money.js`: `formatCurreny(priceCents)` helper to display prices from integer cents.

## Notes & Conventions

- Prices are stored as integer cents for accuracy and formatted in the UI.
- Cart state is saved in `localStorage` to persist across page reloads.
- Delivery date calculation is business-day aware (skips Friday and Saturday by design in this project).

## Roadmap

- Orders page (`orders.html`):
- Tracking page (`tracking.html`):

