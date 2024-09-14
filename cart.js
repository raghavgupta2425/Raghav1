let iconCart = document.querySelector('.icon-cart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');
let listCart = {};
let products = null;

// Toggle cart visibility
iconCart.addEventListener('click', () => {
  if (cart.style.right === '-100%') {
    cart.style.right = '0';
    container.style.transform = 'translateX(-400px)';
  } else {
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0)';
  }
});

close.addEventListener('click', () => {
  cart.style.right = '-100%';
  container.style.transform = 'translateX(0)';
});

// Fetch product data
fetch('product.json')
  .then(response => response.json())
  .then(data => {
    products = data;
    addDataToHTML();
  });

// Render product list
function addDataToHTML() {
  let listProductHTML = document.querySelector('.listProduct');
  listProductHTML.innerHTML = '';

  products.forEach(product => {
    let newProduct = document.createElement('div');
    newProduct.classList.add('item');
    newProduct.innerHTML = `
      <img src="${product.image}" >
      <h2>${product.name}</h2>
      <div class="price">$${product.price}</div>
      <button onclick="addCart(${product.id})">Add to Cart</button>
    `;
    listProductHTML.appendChild(newProduct);
  });
}

// Add to cart
function addCart(idProduct) {
  let selectedProduct = products.find(product => product.id === idProduct);
  if (!listCart[idProduct]) {
    listCart[idProduct] = { ...selectedProduct, quantity: 1 };
  } else {
    listCart[idProduct].quantity += 1;
  }

  saveCart();
  addCartToHTML();
}

// Save cart to cookies
function saveCart() {
  let timeSave = "expires=Thu, 31 Dec 2025 23:59:59 UTC";
  document.cookie = "listCart=" + JSON.stringify(listCart) + ";" + timeSave + ";path=/;";
}

// Update cart in HTML
function addCartToHTML() {
  let listCartHTML = document.querySelector('.listCart');
  let totalQuantityHTML = document.querySelector('.totalQuantity');
  listCartHTML.innerHTML = '';
  let totalQuantity = 0;

  for (let id in listCart) {
    let product = listCart[id];
    let newCart = document.createElement('div');
    newCart.classList.add('item');
    newCart.innerHTML = `
      <img src="${product.image}" />
      <div class="content">
        <div class="name">${product.name}</div>
        <div class="price">$${product.price}</div>
      </div>
      <div class="quantity">
        <button onclick="changeQuantity(${product.id}, '+')">+</button>
        <span class="value">${product.quantity}</span>
        <button onclick="changeQuantity(${product.id}, '-')">-</button>
      </div>
    `;
    listCartHTML.appendChild(newCart);
    totalQuantity += product.quantity;
  }

  totalQuantityHTML.innerText = totalQuantity;
}

// Change quantity in the cart
function changeQuantity(idProduct, type) {
  if (type === '+') {
    listCart[idProduct].quantity += 1;
  } else if (type === '-' && listCart[idProduct].quantity > 1) {
    listCart[idProduct].quantity -= 1;
  } else {
    delete listCart[idProduct];
  }

  saveCart();
  addCartToHTML();
}

// Initialize cart from cookies
function checkCart() {
  let cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));

  if (cookieValue) {
    listCart = JSON.parse(cookieValue.split('=')[1]);
  }

  addCartToHTML();
}

checkCart();