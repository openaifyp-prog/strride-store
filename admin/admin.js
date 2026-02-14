// Basic Admin Logic

// Auth Check (Simple mock)
const isLoginPage = document.querySelector('.admin-login-body');
const isLoggedIn = localStorage.getItem('strride_admin_auth') === 'true';

if (!isLoginPage && !isLoggedIn) {
  window.location.href = 'index.html';
} else if (isLoginPage && isLoggedIn) {
  window.location.href = 'dashboard.html';
}

// Login
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user === 'admin' && pass === 'admin123') {
      localStorage.setItem('strride_admin_auth', 'true');
      window.location.href = 'dashboard.html';
    } else {
      document.getElementById('error-msg').textContent = 'Invalid credentials (try admin/admin123)';
    }
  });
}

// Logout
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('strride_admin_auth');
    window.location.href = 'index.html';
  });
}

// Product Management (Dashboard)
const productsTableBody = document.getElementById('products-table-body');
const addProductBtn = document.getElementById('add-product-btn');
const productModal = document.getElementById('product-modal');
const closeModalBtn = document.querySelector('.close-modal');
const addProductForm = document.getElementById('add-product-form');

if (productsTableBody) {
  renderProductsTable();

  // Add Product Logic
  addProductBtn.addEventListener('click', () => productModal.classList.add('active'));
  closeModalBtn.addEventListener('click', () => productModal.classList.remove('active'));

  addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('p-name').value;
    const price = document.getElementById('p-price').value;
    const category = document.getElementById('p-category').value;
    const image = document.getElementById('p-image').value;

    const products = getProducts();
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

    const newProduct = {
      id: newId,
      name,
      price,
      category,
      image
    };

    products.push(newProduct);
    saveProducts(products);
    renderProductsTable();
    
    addProductForm.reset();
    productModal.classList.remove('active');
  });
}

function getProducts() {
  const stored = localStorage.getItem('strride_products');
  return stored ? JSON.parse(stored) : [];
}

function saveProducts(products) {
  localStorage.setItem('strride_products', JSON.stringify(products));
}

function renderProductsTable() {
  const products = getProducts();
  productsTableBody.innerHTML = '';

  products.forEach(product => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><img src="${product.image}" alt="${product.name}" class="product-thumb"></td>
      <td>${product.name}</td>
      <td>${product.category || '-'}</td>
      <td>${product.price}</td>
      <td>
        <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
      </td>
    `;
    productsTableBody.appendChild(tr);
  });
}

// Expose delete function to window
window.deleteProduct = (id) => {
  if (confirm('Are you sure you want to delete this product?')) {
    let products = getProducts();
    products = products.filter(p => p.id !== id);
    saveProducts(products);
    renderProductsTable();
  }
};
