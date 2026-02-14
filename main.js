// Main entry point
import './style.css'

// Check to ensure app is running
console.log('Strride E-Commerce Loaded');

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.menu-overlay');
const navItems = document.querySelectorAll('.nav-links a');

function toggleMenu() {
  const isActive = navLinks.classList.contains('active');
  const action = isActive ? 'remove' : 'add';
  
  menuToggle.classList[action]('active');
  navLinks.classList[action]('active');
  overlay.classList[action]('active');
  
  // Prevent body scroll when menu is open
  document.body.style.overflow = isActive ? '' : 'hidden';
}

if (menuToggle && navLinks) {
  // Toggle on button click
  menuToggle.addEventListener('click', toggleMenu);

  // Close on overlay click
  if (overlay) {
    overlay.addEventListener('click', toggleMenu);
  }

  // Close when clicking a link
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      // Only close if currently open
      if (navLinks.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
}

// Product Data
// Product Data
let allProducts = [];
const storedProducts = localStorage.getItem('strride_products');

if (storedProducts) {
  try {
    allProducts = JSON.parse(storedProducts);
    
    // Data Migration: Ensure categories exist for old data
    let hasChanges = false;
    allProducts = allProducts.map(p => {
      if (!p.category) {
        hasChanges = true;
        // Map based on known IDs or default
        if (p.id === 1) return { ...p, category: 'Men' };
        if (p.id === 2) return { ...p, category: 'Accessories' };
        if (p.id === 3) return { ...p, category: 'Accessories' };
        if (p.id === 4) return { ...p, category: 'Women' };
        return { ...p, category: 'Uncategorized' };
      }
      return p;
    });

    if (hasChanges) {
      localStorage.setItem('strride_products', JSON.stringify(allProducts));
    }

  } catch (e) {
    console.error('Error parsing stored products', e);
    // Fallback if parse fails
    allProducts = []; 
  }
}

// Default Data (Seed if empty or invalid)
function seedData() {
  // Curated list of 15 products with matching images
  allProducts = [
    // Men (5 Items)
    {
      id: 1,
      name: "Essential White Tee",
      price: "$25",
      category: "Men",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      name: "Classic Denim Jacket",
      price: "$85",
      category: "Men",
      image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      name: "Urban Hoodie",
      price: "$55",
      category: "Men",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 4,
      name: "Oxford Button-Down",
      price: "$45",
      category: "Men",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 5,
      name: "Slim Fit Chinos",
      price: "$60",
      category: "Men",
      image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800"
    },

    // Women (5 Items)
    {
      id: 6,
      name: "Summer Floral Dress",
      price: "$75",
      category: "Women",
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 7,
      name: "Elegant Blouse",
      price: "$50",
      category: "Women",
      image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 8,
      name: "High-Waist Jeans",
      price: "$65",
      category: "Women",
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 9,
      name: "Cozy Knit Sweater",
      price: "$70",
      category: "Women",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 10,
      name: "Pleated Midi Skirt",
      price: "$55",
      category: "Women",
      image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=800"
    },

    // Accessories (5 Items)
    {
      id: 11,
      name: "Minimalist Leather Watch",
      price: "$120",
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 12,
      name: "Canvas Backpack",
      price: "$65",
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 13,
      name: "Classic Sunglasses",
      price: "$40",
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 14,
      name: "Checkered Midi Skirt",
      price: "$45",
      category: "Women",
      image: "https://images.unsplash.com/photo-1552874869-5c3980695940?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 15,
      name: "Wool Beanie",
      price: "$25",
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=800"
    }
  ];

  localStorage.setItem('strride_products', JSON.stringify(allProducts));
  console.log('Data seeded/reset with 15 CURATED products (Version 4).');
}

if (allProducts.length === 0) {
  seedData();
} else {
  // Check if we need to upgrade to the curated dataset (V4)
  if (!localStorage.getItem('strride_seeded_curated_v4')) {
    console.log('Upgrading to Curated V4 dataset...');
    seedData();
    localStorage.setItem('strride_seeded_curated_v4', 'true');
  } else {
    // Check if any product is missing a category (legacy check)
    const invalidData = allProducts.some(p => !p.category);
    if (invalidData) {
      console.log('Found stale data (missing categories). Resetting...');
      seedData();
      localStorage.setItem('strride_seeded_curated_v4', 'true');
    }
  }
}

// Search & Filter Logic
const searchBtn = document.querySelector('.search-btn');
const searchOverlay = document.getElementById('search-overlay');
const closeSearchBtn = document.querySelector('.close-search-btn');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const filterPills = document.querySelectorAll('.filter-pill');
const productGrid = document.getElementById('product-grid');

// Toggle Search Overlay
if (searchBtn && searchOverlay) {
  searchBtn.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    setTimeout(() => searchInput.focus(), 100);
  });
}

if (closeSearchBtn) {
  closeSearchBtn.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
    searchInput.value = '';
    searchResults.innerHTML = '';
  });
}

// Search Functionality
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    searchResults.innerHTML = '';
    
    if (query.length < 2) return;

    const filtered = allProducts.filter(p => 
      p.name.toLowerCase().includes(query) || 
      (p.category && p.category.toLowerCase().includes(query))
    );

    filtered.forEach(p => {
      const div = document.createElement('div');
      div.className = 'search-result-item';
      div.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <div>
          <h4>${p.name}</h4>
          <p>${p.price}</p>
        </div>
      `;
      div.onclick = () => {
        window.location.href = `shop.html?highlight=${p.id}`; // Simple redirection
      };
      searchResults.appendChild(div);
    });

    if (filtered.length === 0) {
      searchResults.innerHTML = '<p style="margin-top: 1rem; color: #666;">No products found.</p>';
    }
  });
}

// Category Filtering (Shop Page)
if (filterPills.length > 0) {
  console.log('Filter pills found:', filterPills.length);
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      console.log('Filter pill clicked:', pill.dataset.category);
      // UI Update
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const category = pill.dataset.category;
      
      // Filter Data
      const filteredProducts = category === 'all' 
        ? allProducts 
        : allProducts.filter(p => p.category === category);
      
      console.log('Filtered Results:', filteredProducts.length);
      renderGrid(filteredProducts);
    });
  });
} else {
  console.log('No filter pills found on this page.');
}

// Re-usable Grid Renderer
function renderGrid(productsToRender) {
  if (!productGrid) return;
  productGrid.innerHTML = '';
  const fragment = document.createDocumentFragment();

  productsToRender.forEach(product => {
    const article = document.createElement('article');
    article.className = 'product-card';
    article.innerHTML = `
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
        <button class="add-to-cart-btn" data-id="${product.id}" aria-label="Add to Cart">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 5V19"></path>
            <path d="M5 12H19"></path>
          </svg>
        </button>
      </div>
      <div class="product-info">
        <div style="display: flex; justify-content: space-between; align-items: start;">
          <h3 class="product-name">${product.name}</h3>
          <span class="product-price">${product.price}</span>
        </div>
        <span style="font-size: 0.8rem; color: #888;">${product.category || 'Essential'}</span>
      </div>
    `;
    fragment.appendChild(article);
  });

  productGrid.appendChild(fragment);
}

// Initial Render (Replace existing logic with this)
if (productGrid) {
  const limit = parseInt(productGrid.dataset.limit);
  const productsToRender = limit ? allProducts.slice(0, limit) : allProducts;
  renderGrid(productsToRender);
}

// Cart Logic
let cart = [];
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.querySelector('.close-cart-btn');
const cartItemsContainer = document.getElementById('cart-items');
const cartSubtotalEl = document.getElementById('cart-subtotal');
const cartIcons = document.querySelectorAll('.cart-icon, .cart-btn'); // Select all cart triggers

// Open/Close Cart
function toggleCart(show) {
  const action = show ? 'add' : 'remove';
  cartDrawer.classList[action]('active');
  cartOverlay.classList[action]('active');
  document.body.style.overflow = show ? 'hidden' : '';
}

// Update Cart UI
function updateCartUI() {
  cartItemsContainer.innerHTML = '';
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
    cartSubtotalEl.textContent = '$0.00';
    return;
  }

  let subtotal = 0;

  cart.forEach(item => {
    const priceValue = parseFloat(item.price.replace('$', ''));
    subtotal += priceValue * item.qty;

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <div>
          <h4 class="cart-item-name">${item.name}</h4>
          <div class="cart-item-price">${item.price}</div>
        </div>
        <div class="cart-item-controls">
          <div class="qty-controls">
            <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          </div>
          <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  
  // Update Navbar Cart Count
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartBadge = document.querySelector('.cart-count');
  
  if (cartBadge) {
    cartBadge.textContent = totalItems;
    if (totalItems > 0) {
      cartBadge.classList.add('active');
      // Pop animation
      cartBadge.style.transform = 'scale(1.2)';
      setTimeout(() => cartBadge.style.transform = 'scale(1)', 200);
    } else {
      cartBadge.classList.remove('active');
    }
  }
}

// Add to Cart
function addToCart(productId) {
  const product = allProducts.find(p => p.id === parseInt(productId));
  const existingItem = cart.find(item => item.id === parseInt(productId));

  if (existingItem) {
    existingItem.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  toggleCart(true); // Open cart
}

// Change Quantity
window.changeQty = (id, delta) => {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
    updateCartUI();
  }
};

// Remove Item
window.removeFromCart = (id) => {
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
};

// Event Listeners
if (closeCartBtn) closeCartBtn.addEventListener('click', () => toggleCart(false));
if (cartOverlay) cartOverlay.addEventListener('click', () => toggleCart(false));

// Bind Cart Icons
document.querySelectorAll('.cart-icon').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleCart(true);
  });
});

// Event Delegation for "Add to Cart" (Updated)
if (productGrid) {
  productGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart-btn');
    if (btn) {
      e.stopPropagation();
      addToCart(btn.dataset.id);
      
      // Animation Feedback
      btn.style.transform = 'scale(0.9)';
      setTimeout(() => btn.style.transform = '', 150);
    }
  });
}

// Newsletter Handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    const email = input.value;
    
    if (email) {
      // Simulate API call
      const btn = newsletterForm.querySelector('button');
      const originalContent = btn.innerHTML;
      
      btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 6L9 17l-5-5"/></svg>`;
      input.value = 'Thanks for subscribing!';
      input.disabled = true;
      
      setTimeout(() => {
        input.value = '';
        input.disabled = false;
        btn.innerHTML = originalContent;
      }, 3000);
    }
  });
}

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    
    btn.textContent = 'Message Sent!';
    btn.style.backgroundColor = '#4CAF50';
    btn.disabled = true;
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.backgroundColor = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}
