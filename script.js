const products = document.querySelectorAll('.product');
const cartList = document.getElementById('cart-list');
const totalEl = document.getElementById('total');
const orderBtn = document.getElementById('order-btn');

let cart = {};
let total = 0;

function updateCart() {
  cartList.innerHTML = '';
  total = 0;

  for (let item in cart) {
    const itemTotal = cart[item].price * cart[item].qty;
    const li = document.createElement('li');
    li.textContent = `${item} × ${cart[item].qty} = ${itemTotal} ج.م`;
    cartList.appendChild(li);
    total += itemTotal;
  }

  totalEl.textContent = total;
}

products.forEach(product => {
  const plusBtn = product.querySelector('.plus');
  const minusBtn = product.querySelector('.minus');
  const quantityEl = product.querySelector('.quantity');
  const price = parseInt(product.dataset.price, 10);
  const name = product.dataset.name;

  const setQty = (qty) => {
    qty = Math.max(0, qty); // ماينزلش عن صفر
    quantityEl.textContent = qty;

    if (qty === 0) {
      delete cart[name];
    } else {
      cart[name] = { price, qty };
    }

    updateCart();
  };

  plusBtn.addEventListener('click', () => {
    const current = parseInt(quantityEl.textContent, 10) || 0;
    setQty(current + 1);
  });

  minusBtn.addEventListener('click', () => {
    const current = parseInt(quantityEl.textContent, 10) || 0;
    if (current > 0) setQty(current - 1);
  });
});

orderBtn.addEventListener('click', () => {
  if (Object.keys(cart).length === 0) {
    alert("السلة فارغة! يرجى اختيار منتج أولاً.");
    return;
  }

  let orderSummary = "طلبك:\n";
  for (let item in cart) {
    const itemTotal = cart[item].price * cart[item].qty;
    orderSummary += `- ${item} × ${cart[item].qty} = ${itemTotal} ج.م\n`;
  }

  orderSummary += `\nالإجمالي: ${total} ج.م\n\nشكرًا لطلبك!`;

  alert(orderSummary);

  // تفريغ السلة والكميات
  cart = {};
  document.querySelectorAll('.quantity').forEach(q => q.textContent = '0');
  updateCart();
});
