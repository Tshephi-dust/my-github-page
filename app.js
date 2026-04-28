let cart = [];
let total = 0;

function addToCart(name, price) {
  cart.push({name, price});
  total += price;

  document.getElementById("cartCount").innerText = cart.length;
  updateCart();
}

function updateCart() {
  let list = document.getElementById("cartItems");
  list.innerHTML = "";

  cart.forEach(item => {
    let li = document.createElement("li");
    li.textContent = item.name + " - P" + item.price;
    list.appendChild(li);
  });

  document.getElementById("total").innerText = total;
}

function toggleCart() {
  document.getElementById("cartBox").classList.toggle("active");
}

function checkout() {
  alert("Checkout system coming next (Stripe integration)");
}
