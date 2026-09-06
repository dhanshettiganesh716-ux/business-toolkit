let billNumber =
  Number(localStorage.getItem("billNumber")) || 1;


// वस्तू जोडणे
function addItem() {

  const items = document.getElementById("items");

  const row = document.createElement("div");

  row.className = "item-row";

  row.innerHTML = `
    <input
      type="text"
      class="item-name"
      placeholder="वस्तूचे नाव">

    <input
      type="number"
      class="item-qty"
      placeholder="Qty"
      value="1"
      min="1">

    <input
      type="number"
      class="item-rate"
      placeholder="Rate"
      min="0">

    <span class="item-amount">₹0</span>
  `;

  items.appendChild(row);

  addCalculationEvents(row);

  calculateTotal();
}


// प्रत्येक वस्तूच्या input वर calculation
function addCalculationEvents(row) {

  const inputs = row.querySelectorAll("input");

  inputs.forEach(input => {

    input.addEventListener("input", calculateTotal);

  });
}


// Total calculate
function calculateTotal() {

  const rows =
    document.querySelectorAll(".item-row");

  let total = 0;

  rows.forEach(row => {

    const qty =
      Number(
        row.querySelector(".item-qty").value
      ) || 0;

    const rate =
      Number(
        row.querySelector(".item-rate").value
      ) || 0;

    const amount = qty * rate;

    row.querySelector(".item-amount").innerText =
      "₹" + amount.toFixed(2);

    total += amount;

  });

  return total;
}


// Bill तयार करणे
function createBill() {

  const shopName =
    document.getElementById("shopName").value.trim();

  const shopAddress =
    document.getElementById("shopAddress").value.trim();

  const shopMobile =
    document.getElementById("shopMobile").value.trim();

  const customerName =
    document.getElementById("customerName").value.trim();

  const customerMobile =
    document.getElementById("customerMobile").value.trim();

  const payment =
    document.getElementById("paymentMethod").value;


  if (!shopName) {

    alert("दुकानाचे नाव टाका.");

    return;
  }


  const rows =
    document.querySelectorAll(".item-row");

  let items = [];

  let subtotal = 0;


  rows.forEach(row => {

    const name =
      row.querySelector(".item-name").value.trim();

    const qty =
      Number(
        row.querySelector(".item-qty").value
      ) || 0;

    const rate =
      Number(
        row.querySelector(".item-rate").value
      ) || 0;


   
