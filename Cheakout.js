let listCart = {};

// Get data from cookies
function checkCart() {
  var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
  if (cookieValue) {
    listCart = JSON.parse(decodeURIComponent(cookieValue.split('=')[1]));
  }

  addCartToHTML();
}

// Add cart data to HTML
function addCartToHTML() {
  // Clear the existing cart HTML
  let listCartHTML = document.querySelector('.returnCart .list');
  listCartHTML.innerHTML = '';
  let totalQuantityHTML = document.querySelector('.totalQuantity');
  let totalPriceHTML = document.querySelector('.totalPrice');
  let totalQuantity = 0;
  let totalPrice = 0;

  if (Object.keys(listCart).length) {
    for (let id in listCart) {
      let product = listCart[id];
      let newP = document.createElement('div');
      newP.classList.add('item');
      newP.innerHTML = `
        <img src="${product.image}" alt="">
        <div class="name">${product.name}</div>
        <div class="price">$${product.price}/1 product</div>
        <div class="quantity">${product.quantity}</div>
        <div class="returnPrice">$${product.price * product.quantity}</div>
      `;
      listCartHTML.appendChild(newP);

      totalQuantity += product.quantity;
      totalPrice += product.price * product.quantity;
    }
  }

  totalQuantityHTML.innerText = totalQuantity;
  totalPriceHTML.innerText = `$${totalPrice}`;
}

// Call checkCart on page load
checkCart();