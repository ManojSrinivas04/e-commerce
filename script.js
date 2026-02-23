// --- 1. OUR MOCK DATABASE ---

// --- 2. OUR CART: Load from Local Storage ---
// This is the core of Phase 3.
// We try to load the cart from local storage.
// 'JSON.parse' turns the string from local storage back into an array.
// '|| []' means "if 'cart' doesn't exist in storage, use an empty array".
let cart = JSON.parse(localStorage.getItem('cart')) || [];


// --- 3. THE "TRIGGER": Wait for the HTML to load ---
document.addEventListener('DOMContentLoaded', () => {
  
  // Update the cart count in the nav as soon as the page loads
  updateCartCount();

  // --- 4. HOME PAGE LOGIC ---
  const productGrid = document.getElementById('product-grid');
  if (productGrid) {
    renderProducts();
    
    // Listen for clicks on the *entire grid*
    productGrid.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to-cart-btn')) {
    const productId = e.target.dataset.id; // <-- FIX (it's a string)
    addToCart(productId);
  }
});
  }
  
  // --- 5. CART PAGE LOGIC ---
  const cartItemsContainer = document.getElementById('cart-items-container');
  if (cartItemsContainer) {
    displayCart();

    // Listen for clicks on the cart items container (for 'remove' buttons)
    cartItemsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-from-cart-btn')) {
        const productId = Number(e.target.dataset.id);
        removeFromCart(productId);
      }
    });
  }
});


// --- 6. RENDER PRODUCTS FUNCTION (from Phase 2) ---
// REPLACE your old renderProducts function with this one:

async function renderProducts() {
  const productGrid = document.getElementById('product-grid');
  productGrid.innerHTML = ''; // Clear it while loading

  try {
    // 1. Make an API call to our backend
    const response = await fetch('http://localhost:3001/api/products');
    
    // 2. Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // 3. Get the JSON data (our products array)
    const products = await response.json();
    
    // 4. Loop and render (this part is the same as before)
    products.forEach(product => {
      const productCard = `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p class="price">$${product.price.toFixed(2)}</p>
          <button class="add-to-cart-btn" data-id="${product._id}">Add to Cart</button>
        </div>
      `;
      productGrid.innerHTML += productCard;
    });

  } catch (error) {
    // If the fetch fails, show an error message
    console.error('Could not fetch products:', error);
    productGrid.innerHTML = '<p>Error loading products. Please try again later.</p>';
  }
}

// --- 7. CORE CART FUNCTIONS (NEW) ---

/**
 * Adds a product to the cart array, or increments its quantity.
 */
// REPLACE your old addToCart function with this one:

async function addToCart(productId) {
  // 1. Check if the item is already in the cart
  let existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    // 2. If it is, just increase the quantity
    existingItem.quantity++;
  } else {
    // 3. If it's not, we must fetch the product details from the backend
    try {
      // This is a NEW API endpoint we are about to create!
      const response = await fetch(`http://localhost:3001/api/products/${productId}`);
      
      if (!response.ok) {
        throw new Error('Product not found');
      }
      
      const productToAdd = await response.json();
      
      // 4. Add it to the cart with a new 'quantity' property
      cart.push({ ...productToAdd, quantity: 1 });

    } catch (error) {
      console.error('Could not fetch product details:', error);
      alert('Error adding item. Please try again.');
      return; // Stop the function if it failed
    }
  }
  
  // 5. Save the updated cart to local storage (this part is the same)
  saveCart();
  
  // 6. Update the visual cart counter in the nav
  updateCartCount();
  
  // 7. Give user feedback
  alert('Item added to cart!');
}

/**
 * Saves the current cart array to local storage.
 * 'JSON.stringify' converts our array into a string, which is how
 * local storage must store data.
 */
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Updates the number in the navigation bar.
 */
function updateCartCount() {
  const cartCountElement = document.getElementById('cart-count');
  // 'reduce' calculates the total number of items, not just cart.length
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountElement.textContent = totalItems;
}

/**
 * Renders all items from the cart array onto the cart.html page.
 */
function displayCart() {
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartTotalEl = document.getElementById('cart-total');
  
  // Clear the container first
  cartItemsContainer.innerHTML = '';
  
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is currently empty.</p>';
    cartTotalEl.innerHTML = '<h3>Total: $0.00</h3>';
    return; // Exit the function if the cart is empty
  }

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    // Create the HTML for one cart item
    const cartItemHTML = `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p>Quantity: ${item.quantity}</p>
          <p>$${item.price.toFixed(2)} each</p>
        </div>
        <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
        <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>
      </div>
    `;
    cartItemsContainer.innerHTML += cartItemHTML;
  });

  // Update the final total
  cartTotalEl.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}

/**
 * Removes an item from the cart completely.
 */
function removeFromCart(productId) {
  // 'filter' creates a *new* array, keeping only the items
  // whose ID does NOT match the one we want to remove.
  cart = cart.filter(item => item.id !== productId);
  
  // Re-save the new (smaller) cart
  saveCart();
  
  // Re-update the nav counter
  updateCartCount();
  
  // Re-render the cart UI to show the item is gone
  displayCart();
}